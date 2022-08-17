import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { useCallback, useEffect, useState } from 'react';
import ChattingForm from '../chat/ChattingForm';
import ChattingList from '../chat/ChattingList';
import UserVideoComponent from './UserVideoComponent';
import AuctionTimer from '../auctiontimer/AuctionTimer';
import send from './send';
import deleteRoom from './delete';
import { Person } from '@mui/icons-material';
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Loading from '../pages/Loading/Loading';
import { useSelector } from 'react-redux';
import UpButton from '../atoms/UpButton';
import DownButton from '../atoms/DownButton';
import OnAirButton from '../atoms/OnAirButton';
import LeaveButton from '../atoms/LeaveButton';
import Swipeable from '../molecules/Swipeable';
import _ from 'lodash';
import nameList from '../../common/randomNickname';
import NotFound from '../pages/NotFound';
import AuctionItemCard from "../molecules/AuctionItemCard/index";
import AuctionSession from '../AuctionSession/AuctionSession';
import SessionStartButton from '../atoms/SessionStartButton';
import ItemShowButton from '../atoms/ItemShowButton';
import { changeStatus } from '../../common/hostSlice';
import { useDispatch } from 'react-redux/es/exports';
import Congratuation from '../AuctionSession/Congratuation';
import getMyInfo from '../pages/Mypage/getMyInfo';
import basicImg from "../../assets/defaultImg.png";

const ContainerDiv = styled.div`
  height: 100vh;
`

const SessionHeaderDiv1 = styled.div`
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  position: absolute;
  top: 0;
`

const SessionHeaderDiv2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
  margin-bottom: 2px;
  padding: 5px;
`

const StyledDiv = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 350px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 2px;
  margin-bottom: 1px;
  left: 50%;
  font-size: 28px;
  text-align: center;
  font-weight: bold;
  padding: 5px;
`

const WhiteDiv = styled.div`
  color: white;
`

const ProfileDiv = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 70%;
  overflow: hidden;
  border: 1px solid rgba(33, 33, 33);
  margin: 5px;
`

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`

const AuctionRoomTitle = styled.div`
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin: 5px;
`

const MessageDiv = styled.div`
  position: fixed;
  left: 0px; 
  bottom: 0px;
  width: 100%;
`

const MainVideoDiv = styled.div`
  height: 100%;
  position: relative;
  top: 0px;
  left: 0px;
`

const AuctionScreenDiv = styled.div`
  left: 50%;
  width: 300px;
  position: fixed;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, 0);
`

const OPENVIDU_SERVER_URL = 'https://i7b203.p.ssafy.io:8443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

const VideoRoomComponent = () => {
  const navigate = useNavigate(); // 네비게이터(방 나갈 때 사용)
  const dispatch = useDispatch();
  const location = useLocation(); // 로케이션(이전 페이지에서 데이터를 받아옴)
  const roomId = (location.state !== null) ? location.state.id : null;
  const items = (location.state !== null) ? location.state.items : [{ startingPrice: 0 }];
  const auctionRoomTitle = (location.state !== null) ? location.state.title : null;
  const sellerPhoneNumber = (location.state !== null) ? location.state.phone: null;
  const myPhoneNumber = useSelector((state) => state.token.value.phone); // RTK에서 핸드폰 번호를 불러옴
  const isHost = useSelector((state) => state.hostStatus.value.host); // console.log(useSelector((state) => state.hostStatus.value.host));
  
  const [mySessionId, setMySessionId] = useState('SessionA');
  const [myUserName, setMyUserName] = useState('Participant' + Math.floor(Math.random() * 100));
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined); // 페이지의 메인 비디오 화면(퍼블리셔 또는 참가자의 화면 중 하나)
  const [publisher, setPublisher] = useState(undefined); // 자기 자신의 캠
  const [subscribers, setSubscribers] = useState([]); // 다른 유저의 스트림 정보를 저장할 배열
  const [messageList, setMessageList] = useState([]); // 메세지 정보를 담을 배열
  const [auctionsessionList, setAuctionSessionList] = useState([]); // 입찰 메세지를 담을 배열
  const [totalUsers, setTotalUsers] = useState(0); // 총 유저수
  const [toggleStart, setToggleStart] = useState(false); // 스타트 버튼 토글
  const [seconds, setSeconds] = useState(0); // 타이머 시작 시간
  const [displayBidding, setDisplayBidding] = useState(false); // 비딩칸 display on/off
  const [price, setPrice] = useState(items[0].startingPrice); // 나의 입찰(bidding) 가격
  const [highestPrice, setHighestPrice] = useState(0); // 최고 입찰 가격
  const [tempHighestPrice, setTempHighestPrice] = useState(0); // 현재 세션에만 보여줄 최고 입찰 가격
  const [bestBidder, setBestBidder] = useState(undefined); // 최고 입찰자
  const [bestBidderPhone, setBestBidderPhone] = useState(undefined); // 최고 입찰자의 핸드폰 번호
  const [tempBestBidder, setTempBestBidder] = useState(undefined); // 현재 세션에만 보여줄 최고 입찰자
  const [finArr, setFinArr] = useState(new Array(items.length).fill(0)); // 경매 회수(props의 길이와 같아지면 경매방 종료)
  const [sessionCount, setSessionCount] = useState(0); // 현재 경매의 세션 횟수(초깃값은 0, max는 2까지)
  const [itemIndex, setItemIndex] = useState(0); // 물품 목록 인덱스
  const [chatDisplay, setChatDisplay] = useState(true); // 채팅창 보이기(초깃값: true) 
  // const [isHost, setIsHost] = useState(false);
  const [itemDisplay, setItemDisplay] = useState(false); // 물품 목록을 확인할 수 있는 변수
  const [showCelebration, setShowCelebration] = useState(false); // 축하 메세지 토글링 변수
  const [profileImg, setProfileImg] = useState(basicImg);
  const [hostName, setHostName] = useState(undefined);

  let OV = undefined;

  // 토큰 받아오기(KMS로 직접 쏨)
  const getToken = useCallback(() => {
    return createSession(mySessionId).then((sessionId) => createToken(sessionId));
  }, [mySessionId]);

  // 세션 생성(KMS로 직접 쏨)
  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
              OPENVIDU_SERVER_URL,
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                OPENVIDU_SERVER_URL +
                '"\n\nClick OK to navigate and accept it. ' +
                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                OPENVIDU_SERVER_URL +
                '"',
              )
            ) {
              window.location.assign(OPENVIDU_SERVER_URL + '/openvidu/accept-certificate'); // window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
            }
          }
        });
    });
  }

  // 토큰 생성(KMS로 직접 쏨)
  const createToken = (sessionId) => {
    let myRole = isHost ? "PUBLISHER" : "SUBSCRIBER";
    console.log(myRole)
    return new Promise((resolve, reject) => {
      const data = { role: myRole }; // 여기에 인자를 뭐를 넣냐에 따라 오픈비두 서버에 요청하는 데이터가 달라짐
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }

  // 세션 아이디 설정
  useEffect(() => {
    setMySessionId(`Session${roomId}`);
  }, []);

  // 세션에 참여하기
  const joinSession = () => {
    OV = new OpenVidu(); // --- 1) 오픈비두 오브젝트 생성 ---

    let mySession = OV.initSession() // --- 2) 세션을 시작 --

    setSession(mySession)

    mySession.on('streamCreated', (event) => { // 스트림이 생길 때마다
      const subscriber = mySession.subscribe(event.stream, 'publisher'); // 퍼블리셔를 구독자로 넣어줌
      setSubscribers(subscriber)
    });

    mySession.on('streamDestroyed', (event) => { // 스트림을 종료할 때마다
      deleteSubscriber(event.stream.streamManager); // 참가자 배열에서 스트림 객체를 제거함
    });

    mySession.on('exception', (exception) => { // 예외 처리
      console.warn(exception);
    });

    mySession.on('connectionCreated', (({ stream }) => { // 유저가 접속할 때마다 인원수를 += 1
      setTotalUsers((prevTotalUsers) => {
        return prevTotalUsers + 1
      })
    }));

    mySession.on('connectionDestroyed', (({ stream }) => { // 유저가 접속을 끊을 때마다 -= 1
      setTotalUsers((prevTotalUsers) => {
        return prevTotalUsers - 1
      })
    }));

    mySession.on("signal:chat", (event) => { // 채팅 신호 수신하여 메세지 리스트 업데이트
      setMessageList((prevMessageList) => { 
        return [...prevMessageList, event.data]
      })
    });

    mySession.on("signal:auction", (event) => { // "auction"이라는 시그널을 받음(경매 시작)
      setToggleStart(event.data)
      setDisplayBidding(!displayBidding)
      setChatDisplay(false)
    });

    mySession.on("signal:timer", (event) => { // "timer"라는 시그널을 받아서 시간을 초기 셋팅함
      setSeconds(event.data) // 시간 세팅
    });

    mySession.on("signal:bidding", (event) => { // "bidding"이라는 시그널을 받아서 최고 입찰가를 갱신함
      const tmp = event.data.split(" : ");
      const username = tmp[0];
      const newPrice = parseInt(tmp[1]);
      const currentHigh = parseInt(tmp[2]); // 세션 안에서 highPrice가 계속 0이어서 이렇게 처리했음
      setAuctionSessionList((prevAuctionSessionList) => {
        return [...prevAuctionSessionList, username]
      });
      if (newPrice > currentHigh) { // 판매자는 비딩을 하지 못하도록 !isHost를 조건에 추가
        setHighestPrice(newPrice);
        setBestBidder(username);
        setBestBidderPhone(tmp[3]);
      }
    });

    // --- 4) 유효한 토큰으로 세션에 접속하기 ---
    getToken().then((token) => {
      mySession.connect(token, { clientData: myUserName },)
        .then(async () => {
          let devices = await OV.getDevices();
          let videoDevices = devices.filter(device => device.kind === 'videoinput');
          // --- 5) Get your own camera stream ---(퍼블리셔)
          let publisher = OV.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: '1280x720', // The resolution of your video '450x720'
            frameRate: 30, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            mirror: true, // Whether to mirror your local video or not
          });

          mySession.publish(publisher); // --- 6) 자신의 화면을 송출 ---
          setPublisher(publisher) // 퍼블리셔(스트림 객체)를 담음
          setMainStreamManager(publisher) // 퍼블리셔(스트림 객체)를 담음
        })
        .catch((error) => {
          console.log('There was an error connecting to the session:', error.code, error.message);
        });
    });
  }

  // 방 삭제 요청 api
  const deleteRoomRequest = async() => {
    if (isHost) {
      dispatch(changeStatus(false));
      // setIsHost(false) // isHost를 false로 설정함
      const reqeustResponse = await deleteRoom(roomId);
      if (reqeustResponse) {
        console.log('Room Deleted Successfully!');
      } else {
        console.log('Room Deleted Failed!')
      }
    }
  }

  // 세선 떠나기 --- 7) disconnect함수를 호출하여 세션을 떠남
  const leaveSession = () => {
    const mySession = session;
    if (mySession) {
      mySession.disconnect();
      navigate('/') // 메인페이지로 이동
    }
    // 속성을 초기화함(필요한 속성은 초기화하면 안 됨)
    OV = null;
    setSession(undefined)
    setSubscribers([])
    setMySessionId('SessionA')
    setMyUserName('Participant' + Math.floor(Math.random() * 100))
    setMainStreamManager(undefined)
    setPublisher(undefined)
    setMessageList([])
    setToggleStart(false)
    setChatDisplay(true)
    setTotalUsers((prevTotalUsers) => { return 0 })
    setItemIndex(0) // 0으로 바꿔줘야 방을 파고 다시 들어왔을 때 목록을 0부터 시작할 수 있음
    setSeconds(0) // 시간 초를 0초로 초기화
    deleteRoomRequest(); // 방 삭제를 요청함
  }

  // 호스트(방 생성자) 여부에 따른 isHost를 토글링함(created()) + 호스트가 아닐 경우 유저의 이름을 바꿈
  useEffect(() => {
    // setIsHost(localStorage.getItem("host") ? true : false)
    setMyUserName(_.sample(nameList));
  }, []);

  useEffect(() => {
    const onbeforeunload = (event) => {
      leaveSession();
    }
    window.addEventListener('beforeunload', onbeforeunload); // componentDidMount
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    }
  }, [leaveSession]);

  // 참가자를 배열에서 제거함 
  const deleteSubscriber = useCallback((streamManager) => {
    let tmp_subscribers = subscribers;
    let index = tmp_subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      tmp_subscribers.splice(index, 1);
      setSubscribers(tmp_subscribers) // 이거 안 되면 구조분해할당으로 업데이트 할 것
    }
  }, [subscribers]);

  // 메세지 보내기(Sender of the message (after 'session.connect'))
  const sendMsg = (msg, currentSession) => {
    // this.state.session으로는 자식이 인식할 수 없으므로 currentSession을 자식에게 props로 넘겨주고 다시 받음
    currentSession
      .signal({
        data: msg, // .signal의 data는 문자열만 넘겨야한다
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "chat", // The type of message (optional)
      })
      .then(() => {
        console.log("Message successfully sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // 경매 시작(스타트 버튼을 누르면 경매 타이머가 나오게함)
  const startAuction = () => {
    const mySession = session
    // 현재 경매 세션의 출발 가격을 초기화함
    setPrice(items[itemIndex].startingPrice)
    // setSessionCount(0) // 현재 경매 세션의 카운트를 0으로 초기화함
    setHighestPrice(0) // 경매 최고 낙찰가를 0으로 초기화함
    setBestBidder(undefined) // 경매 최고 낙찰자를 undefined로 초기화함
    setTempHighestPrice(0) // 현재 세션에서 보여줄 임시 경매 최고 낙찰가를 0으로 함
    setTempBestBidder(undefined) // 현재 세션에서 보여줄 임시 경매 최고 낙찰자를 undefined로 초기화함
    setChatDisplay(false) // 경매 시작하면 채팅창 off
    setBestBidderPhone(undefined) // 최고 입찰자의 핸드폰 번호 초기화
    mySession.signal({
      data: true,
      type: "auction",
    }).then(() => {
      console.log("Auction Start!")
    }).catch((error) => {
      console.error(error)
    })
  }

  // 경매 가격 입찰
  const biddingHandler = () => {
    // 가격을 전달받아야함
    if (seconds > 0) {
      const mySession = session
      mySession.signal({
        data: `${myUserName} : ${price} : ${highestPrice} : ${myPhoneNumber}`,
        type: "bidding",
      }).then(() => {
        console.log("bid successfully")
      }).catch((error) => {
        console.error(error)
      })
    }
  };

  // 입찰가 증가 핸들러
  const priceUpHandler = () => {
    if (seconds > 0) {
      setPrice((prevPrice) => {
        return parseInt(prevPrice) + parseInt(items[itemIndex].bidIncrement)
      })
    }
  };

  // 입찰가 하락 핸들러
  const priceDownHandler = () => {
    if (seconds > 0) {
      setPrice((prevPrice) => {
        if (prevPrice === 0) {
          return 0
        }
        return parseInt(prevPrice) - parseInt(items[itemIndex].bidIncrement)
      })
    }
  };

  // 경매 결과 백엔드 api 호출
  const sendAuctionResult = async() => {
    const payload = {
      auctionDetailId: items[itemIndex].id,
      sellerPhoneNumber: sellerPhoneNumber,
      buyerPhoneNumber: bestBidderPhone,
      auctionedPrice: highestPrice,
      grade: items[itemIndex].grade,
      productTitle: items[itemIndex].productTitle,
      quantity: items[itemIndex].quantity
    }
    if (bestBidderPhone !== "" && bestBidderPhone !== undefined) {
      if (myPhoneNumber === bestBidderPhone) { // 내 번호와 최고 입찰자 번호가 같을 때만 api호출함
        const sendResponse = await send({...payload});
        if (sendResponse) {
          console.log('Send Data Successfully!');
        } else {
        console.log('Send Data Failed!')
        }
      }
    }
  };

  const getUserInfo = async () => {
    const res1 = await getMyInfo(sellerPhoneNumber);
    const ownerPicturePath = res1.picturePath;
    const ownerName = res1.name;
    setProfileImg(ownerPicturePath);
    setHostName(ownerName);
  };

  useEffect(() => {
    getUserInfo();
  }, [])

  // 로딩 페이지를 통한 방 입장
  const enterAuctionRoom = () => {
    joinSession();
  };

  return (
    <ContainerDiv>
      {session === undefined && roomId !== null && <Loading enterAuctionRoom={enterAuctionRoom}></Loading>}
      {roomId == null && <NotFound></NotFound>}
      {session !== undefined ? (
        <ContainerDiv>
          {mainStreamManager !== undefined ? (
            <MainVideoDiv>
              {isHost && <UserVideoComponent streamManager={publisher}></UserVideoComponent>}
              {!isHost && <UserVideoComponent streamManager={subscribers}></UserVideoComponent>}
            </MainVideoDiv>
          ) : null}
          <SessionHeaderDiv1>
            <SessionHeaderDiv2>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <ProfileDiv>
                  <Img src={profileImg} alt="/"/>
                </ProfileDiv>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'left'}}>
                  <AuctionRoomTitle>{auctionRoomTitle}</AuctionRoomTitle>
                  <WhiteDiv style={{margin: '5px'}}>{hostName}</WhiteDiv>
                </div>
              </div>
              <div>
                <div style={{display: 'flex', justifyContent: 'space-between', margin: '5px'}}>
                  <div style={{ display: 'flex', justifyContent: 'base', alignItems: 'center', marginRight: '5px' }}>
                    <Person style={{ color: 'red' }} /><span style={{ color: 'white' }}>{totalUsers}</span>
                  </div>
                  <OnAirButton></OnAirButton>
                </div>
              </div>
            </SessionHeaderDiv2>
            {finArr[items.length - 1] !== 1 && <SessionHeaderDiv2>
              {!toggleStart && isHost && <SessionStartButton startAuction={startAuction}></SessionStartButton>}
              {!toggleStart && <LeaveButton leaveSession={leaveSession}></LeaveButton>}
              {toggleStart && <ItemShowButton setItemDisplay={setItemDisplay}>물품 보기</ItemShowButton>}
            </SessionHeaderDiv2>}
            {finArr[items.length - 1] === 1 && <SessionHeaderDiv2>
              <WhiteDiv style={{fontSize: '18px', fontWeight: 'bold', marginLeft: '5px'}}>경매가 종료되었습니다</WhiteDiv>
              <LeaveButton leaveSession={leaveSession}></LeaveButton>
            </SessionHeaderDiv2>}
          </SessionHeaderDiv1>
          {toggleStart && <AuctionScreenDiv>
            {itemDisplay && <AuctionItemCard
              productTitle={items[itemIndex].productTitle}
              grade={items[itemIndex].grade}
              quantity={items[itemIndex].quantity}
              startingPrice={items[itemIndex].startingPrice}
              bidIncrement={items[itemIndex].bidIncrement}
              tempHighestPrice={tempHighestPrice}
            ></AuctionItemCard>}
            <StyledDiv>
              {seconds > 0 && <WhiteDiv>{sessionCount}회차 경매</WhiteDiv>}
              <AuctionTimer
                seconds={seconds}
                setSeconds={setSeconds}
                currentSession={session}
                sessionCount={sessionCount}
                setSessionCount={setSessionCount}
                setItemIndex={setItemIndex}
                toggleStart={toggleStart}
                setToggleStart={setToggleStart}
                setChatDisplay={setChatDisplay}
                maxIndex={items.length}
                sendAuctionResult={sendAuctionResult}
                setTempHighestPrice={setTempHighestPrice}
                highestPrice={highestPrice}
                bestBidder={bestBidder}
                setTempBestBidder={setTempBestBidder}
                isHost={isHost}
                setAuctionSessionList={setAuctionSessionList}
                items={items}
                setPrice={setPrice}
                setFinArr={setFinArr}
                setShowCelebration={setShowCelebration}
                setBestBidder={setBestBidder}
                setHighestPrice={setHighestPrice}
              />
            </StyledDiv>
            {showCelebration && <Congratuation bestBidder={bestBidder}></Congratuation>}
            {!showCelebration && <AuctionSession auctionsessionList={auctionsessionList}></AuctionSession>}
            <StyledDiv style={{ width: '350px', display: 'flex', justifyContent: 'space-between'}}>
              <div style={{ width: '250px', display: 'flex', justifyContent: 'start', alignItems: 'center', marginLeft: '5px'}} >
                <Swipeable biddingHandler={biddingHandler} price={price}></Swipeable>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <UpButton priceUpHandler={priceUpHandler}/>
                <DownButton priceDownHandler={priceDownHandler}/>
              </div>
            </StyledDiv>
          </AuctionScreenDiv>}
          {chatDisplay && <MessageDiv>
            <ChattingList messageList={messageList}></ChattingList>
            <ChattingForm myUserName={myUserName} onMessage={sendMsg} currentSession={session}></ChattingForm>
          </MessageDiv>}
        </ContainerDiv>
      ) : null}
    </ContainerDiv>
  );
}

export default VideoRoomComponent;
