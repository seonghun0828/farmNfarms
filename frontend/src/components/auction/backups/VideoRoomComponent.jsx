import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { useCallback, useEffect, useState } from 'react';
import ChattingForm from '../chat/ChattingForm';
import ChattingList from '../chat/ChattingList';
import UserVideoComponent from './UserVideoComponent';
import AuctionTimer from '../auctiontimer/AuctionTimer';
import send from './send';
import { Person, PlayCircleFilled, ExitToApp, Paid, Upload, Download, RequestQuote, Sell } from '@mui/icons-material'
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import logo from "../../assets/로고.svg";
import './VideoRoomComponent.css';
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import Loading from './Loading'
import { useSelector } from 'react-redux';

const StyledDiv = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  width: 350px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 1px;
  margin-bottom: 1px;
  left: 50%;
  font-size: 28px;
  text-align: center;
  font-weight: bold;
`
const WhiteDiv = styled.div`
  color: white;
`

// const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_URL = 'https://i7b203.p.ssafy.io:8443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

const VideoRoomComponent = () => {
  const navigate = useNavigate(); // 네비게이터(방 나갈 때 사용)
  const location = useLocation(); // 로케이션(이전 페이지에서 데이터를 받아옴)
  const roomId = location.state.id;
  const items = location.state.items;
  const sellerPhoneNumber = location.state.phone;
  const myPhoneNumber = useSelector((state) => state.token.value.phone);
  
  const [mySessionId, setMySessionId] = useState('SessionA');
  const [myUserName, setMyUserName] = useState('Participant' + Math.floor(Math.random() * 100));
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined); // 페이지의 메인 비디오 화면(퍼블리셔 또는 참가자의 화면 중 하나)
  const [publisher, setPublisher] = useState(undefined); // 자기 자신의 캠
  const [subscribers, setSubscribers] = useState([]); // 다른 유저의 스트림 정보를 저장할 배열
  const [messageList, setMessageList] = useState([]); // 메세지 정보를 담을 배열
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
  // const [auctionCount, setAuctionCount] = useState(0) // 경매 회수(props의 길이와 같아지면 경매방 종료)
  const [sessionCount, setSessionCount] = useState(0); // 현재 경매의 세션 횟수(초깃값은 0, max는 2까지)
  const [itemIndex, setItemIndex] = useState(0); // 물품 목록 인덱스
  const [chatDisplay, setChatDisplay] = useState(true); // 채팅창 보이기(초깃값: true) 
  const [isHost, setIsHost] = useState(false);

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
              // window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
              window.location.assign(OPENVIDU_SERVER_URL + '/openvidu/accept-certificate');
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

  useEffect(() => {
    setMySessionId(`Session${roomId}`)
  }, [])

  // 세션에 참여하기
  const joinSession = () => {
    // --- 1) 오픈비두 오브젝트 생성 ---
    OV = new OpenVidu();

    // --- 2) 세션을 시작 ---
    let mySession = OV.initSession()
    setSession(mySession)
    // 스트림이 생길 때마다
    mySession.on('streamCreated', (event) => {
      // 스트림 객체를 참가자에게 넘겨줌. 두번째 인자가 undefined이므로 HTML video를 스스로 생성하지 않음
      // 퍼블리셔를 구독자로 넣어줌
      const subscriber = mySession.subscribe(event.stream, 'publisher'); // undefined
      // 참가자 배열을 최신화
      // setSubscribers((preSubscribers) => { return [...preSubscribers, subscriber] })
      setSubscribers(subscriber)
      // setPublisher(subscriber)
    });

    // 스트림을 종료할 때마다
    mySession.on('streamDestroyed', (event) => {
      // 참가자 배열에서 스트림 객체를 제거함
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    // 유저가 접속할 때마다 인원수를 += 1
    mySession.on('connectionCreated', (({ stream }) => {
      setTotalUsers((prevTotalUsers) => {
        return prevTotalUsers + 1
      })
    }))

    // 유저가 접속을 끊을 때마다 -= 1 (왜 안 돼 ~~)
    mySession.on('connectionDestroyed', (({ stream }) => {
      setTotalUsers((prevTotalUsers) => {
        return prevTotalUsers - 1
      })
    }))

    // 채팅 신호 수신하여 메세지 리스트 업데이트
    mySession.on("signal:chat", (event) => {
      setMessageList((prevMessageList) => {
        return [...prevMessageList, event.data]
      })
    });

    // "auction"이라는 시그널을 받음(경매 시작)
    mySession.on("signal:auction", (event) => {
      setToggleStart(event.data)
      setDisplayBidding(!displayBidding)
      setChatDisplay(false)
    });

    // "timer"라는 시그널을 받아서 시간을 30초로 셋팅함
    mySession.on("signal:timer", (event) => {
      setSeconds(event.data) // 시간 세팅
      setSessionCount((prevCount) => { // 경매 세션 카운트 + 1
        return prevCount + 1
      })
    });

    // "bidding"이라는 시그널을 받아서 최고 입찰가를 갱신함
    mySession.on("signal:bidding", (event) => {
      const tmp = event.data.split(" : ")
      const username = tmp[0]
      const newPrice = parseInt(tmp[1])
      const currentHigh = parseInt(tmp[2]) // 세션 안에서 highPrice가 계속 0이어서 이렇게 처리했음
      if (newPrice > currentHigh) {
        setHighestPrice(newPrice);
        setBestBidder(username);
        setBestBidderPhone(tmp[3]);
      }
    })

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
            resolution: '450x720', // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            mirror: true, // Whether to mirror your local video or not
          });
          // --- 6) 자신의 화면을 송출 ---Set the main video in the page to display our webcam and store our Publisher
          mySession.publish(publisher);
          setPublisher(publisher) // 퍼블리셔(스트림 객체)를 담음
          setMainStreamManager(publisher) // 퍼블리셔(스트림 객체)를 담음
        })
        .catch((error) => {
          console.log('There was an error connecting to the session:', error.code, error.message);
        });
    });
  }

  // 세선 떠나기
  const leaveSession = () => {
    // --- 7) disconnect함수를 호출하여 세션을 떠남
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
    setTotalUsers((prevTotalUsers) => {
      return 0
    })
    setItemIndex(0) // 0으로 바꿔줘야 방을 파고 다시 들어왔을 때 목록을 0부터 시작할 수 있음
    setSeconds(0)
    setIsHost(false) // isHost를 false로 설정함
  }

  // 호스트(방 생성자) 여부에 따른 isHost를 토글링함(created())
  useEffect(() => {
    setIsHost(localStorage.getItem("host") ? true : false)
  }, [])

  useEffect(() => {
    const onbeforeunload = (event) => {
      leaveSession();
    }
    window.addEventListener('beforeunload', onbeforeunload); // componentDidMount
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    }
  }, [leaveSession])

  // 참가자를 배열에서 제거함 
  const deleteSubscriber = useCallback((streamManager) => {
    let tmp_subscribers = subscribers;
    let index = tmp_subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      tmp_subscribers.splice(index, 1);
      setSubscribers(tmp_subscribers) // 이거 안 되면 구조분해할당으로 업데이트 할 것
    }
  }, [subscribers])

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
    setSessionCount(0) // 현재 경매 세션의 카운트를 0으로 초기화함
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
  }

  // 입찰가 증가 핸들러
  const priceUpHandler = () => {
    if (seconds > 0) {
      setPrice((prevPrice) => {
        return parseInt(prevPrice) + parseInt(items[itemIndex].bidIncrement)
      })
    }
  }

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
  }

  const sendAuctionResult = async() => {
    // send함수를 호출해서 백엔드로 데이터를 보냄
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
      const sendResponse = await send({...payload});
      if (sendResponse) {
        console.log('Send Data Successfully!');
      } else {
      console.log('Send Data Failed!')
      }
    }
  }

  const enterAuctionRoom = () => {
    joinSession()
  }

  return (
    <div className="container">
      {session === undefined && <Loading enterAuctionRoom={enterAuctionRoom}></Loading>}
      {session !== undefined ? (
        <div id="session">
          {/* 화면 */}
          {mainStreamManager !== undefined ? (
            <div id="main-video">
              {/* <UserVideoComponent streamManager={mainStreamManager} /> */}
              {isHost && <UserVideoComponent streamManager={publisher}></UserVideoComponent>}
              {!isHost && <UserVideoComponent streamManager={subscribers}></UserVideoComponent>}
            </div>
          ) : null}
          <div id="session-header">
            <div className="session-header2">
              <div className="img-tag">
                <img className="profile-img" src={logo} />
                <div style={{ color: 'white' }}>배추 아저씨</div>
              </div>
              <div>
                <div style={{display: 'flex', justifyContent: 'space-between', margin: '5px'}}>
                  <div style={{ display: 'flex', justifyContent: 'base', alignItems: 'center' }}>
                    <Person style={{ color: 'red' }} /><span style={{ color: 'white' }}>{totalUsers}</span>
                  </div>
                  <Button variant="contained" style={{ backgroundColor: 'red', color: 'white', padding: '0px'}}>
                    <span style={{ fontSize: 'x-small'}} >
                      ●
                    </span>
                    <span style={{fontSize: 'medium', padding: '3px', fontWeight: 'bold', padding: '0px'}}>
                      Live
                    </span>
                  </Button>
                </div>
                <Button className='mui-btn' onClick={leaveSession} variant="contained">
                  나가기
                  <ExitToApp />
                </Button>
              </div>
            </div>
            <div className="session-header2">
              <Button className='mui-btn' variant="contained">
                <Sell></Sell>
                물품 목록
              </Button>
              {!toggleStart && <Button className='mui-btn' variant="contained" onClick={startAuction}>
                <PlayCircleFilled />
                세션 시작
              </Button>}
            </div>
          </div>
          {toggleStart && <div id="auction-screen">
            <StyledDiv>
              {sessionCount}회차 경매
              <AuctionTimer
                seconds={seconds}
                setSeconds={setSeconds}
                currentSession={session}
                sessionCount={sessionCount}
                setItemIndex={setItemIndex}
                setToggleStart={setToggleStart}
                setChatDisplay={setChatDisplay}
                setSessionCount={setSessionCount}
                sendAuctionResult={sendAuctionResult}
                highestPrice={highestPrice}
                setTempHighestPrice={setTempHighestPrice}
                bestBidder={bestBidder}
                setTempBestBidder={setTempBestBidder}
                maxIndex={items.length}
                isHost={isHost}
              /></StyledDiv>
            <StyledDiv>
              <span>
                {items[itemIndex].productTitle}
                {items[itemIndex].grade}
                {items[itemIndex].quantity}Kg
              </span>
            </StyledDiv>
            <StyledDiv>
              경매 시작가
              <WhiteDiv>
                ￦{items[itemIndex].startingPrice.toLocaleString('ko-KR')}원
              </WhiteDiv>
            </StyledDiv>
            <StyledDiv>
              경매 호가
              <WhiteDiv>
                ￦{items[itemIndex].bidIncrement.toLocaleString('ko-KR')}원
              </WhiteDiv>
            </StyledDiv>
            <StyledDiv>
              최고 입찰가
              <WhiteDiv>
                {tempHighestPrice === 0 && <span>가격 공개 전</span>}
                {tempHighestPrice !== 0 && <span>￦{tempHighestPrice}원</span>}
                {tempBestBidder && <p>{tempBestBidder}</p>}
              </WhiteDiv>
            </StyledDiv>
            <Button
              variant="contained"
              style={{ background: '#0F9749', width: '350px', fontSize: '16px', fontWeight: 'bold' }}
              onClick={biddingHandler}
            >
              <RequestQuote></RequestQuote>
              응찰하기
            </Button>
            <StyledDiv>
              <span>
                내 응찰 가격
              </span>
              <WhiteDiv>
                ￦{price.toLocaleString('ko-KR')}원
              </WhiteDiv>
            </StyledDiv>
            <div style={{ width: '350px' }}>
              <Button
                variant='contained'
                style={{ fontSize: '16px', fontWeight: 'bold', width: '175px' }}
                onClick={priceDownHandler}
              >
                <Paid></Paid>
                <Download></Download>
                내리기
              </Button>
              <Button
                variant='contained'
                style={{ fontSize: '16px', fontWeight: 'bold', width: '175px' }}
                onClick={priceUpHandler}
              >
                <Paid></Paid>
                <Upload></Upload>
                올리기
              </Button>
            </div>
          </div>}
          {chatDisplay && <div id="message-footer">
            <ChattingList messageList={messageList}></ChattingList>
            <ChattingForm myUserName={myUserName} onMessage={sendMsg} currentSession={session}></ChattingForm>
          </div>}
        </div>
      ) : null}
    </div>
  );
}

export default VideoRoomComponent;
