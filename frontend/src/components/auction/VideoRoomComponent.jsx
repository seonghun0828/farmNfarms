import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { useCallback, useEffect, useState } from 'react';
import ChattingForm from '../chat/ChattingForm';
import ChattingList from '../chat/ChattingList';
import UserVideoComponent from './UserVideoComponent';
import AuctionTimer from '../auctiontimer/AuctionTimer'
import { event } from 'jquery';

const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

const VideoRoomComponent = (props) => {
  const [mySessionId, setMySessionId] = useState('SessionA')
  const [myUserName, setMyUserName] = useState('Participant' + Math.floor(Math.random() * 100))
  const [session, setSession] = useState(undefined)
  const [mainStreamManager, setMainStreamManager] = useState(undefined) // 페이지의 메인 비디오 화면(퍼블리셔 또는 참가자의 화면 중 하나)
  const [publisher, setPublisher] = useState(undefined) // 자기 자신의 캠
  const [subscribers, setSubscribers] = useState([]) // 다른 유저의 스트림 정보를 저장할 배열
  const [messageList, setMessageList] = useState([]) // 메세지 정보를 담을 배열
  const [totalUsers, setTotalUsers] = useState(0) // 총 유저
  const [toggleStart, setToggleStart] = useState(false) // 스타트 버튼 토글
  const [seconds, setSeconds] = useState(0) // 타이머 시작 시간
  const [displayBidding, setDisplayBidding] = useState(false) // 비딩칸 display on/off
  const [price, setPrice] = useState(props.data.starting_price)
  
  let OV = undefined;
  /**
 * --------------------------
 * SERVER-SIDE RESPONSIBILITY
 * --------------------------
 * These methods retrieve the mandatory user token from OpenVidu Server.
 * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
 * the API REST, openvidu-java-client or openvidu-node-client):
 *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
 *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
 *   3) The Connection.token must be consumed in Session.connect() method
 */
  // 토큰 받아오기(KMS로 직접 쏨)
  const getToken = useCallback(() => {
    return createSession(mySessionId).then((sessionId) => createToken(sessionId));
  }, [mySessionId])

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
              window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
            }
          }
        });
    });
  }

  // 토큰 생성(KMS로 직접 쏨)
  const createToken = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = {}; // 여기에 인자를 뭐를 넣냐에 따라 오픈비두 서버에 요청하는 데이터가 달라짐
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
      const subscriber = mySession.subscribe(event.stream, 'undefined');
      // 참가자 배열을 최신화
      setSubscribers((preSubscribers) => { return [...preSubscribers, subscriber] })
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
    mySession.on('connectionCreated', (({stream}) => {
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

    // "auction"이라는 쏜 시그널을 받음(경매 시작)
    mySession.on("signal:auction", (event) => {
      setToggleStart(event.data)
      setDisplayBidding(!displayBidding)
    });

    mySession.on("signal:timer", (event) => {
      setSeconds(event.data)
    });
    
    // --- 4) 유효한 토큰으로 세션에 접속하기 ---
    // 'getToken' method is simulating what your server-side should do.
    // 'token' parameter should be retrieved and returned by your own backend
    getToken().then((token) => {
      // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      mySession.connect(token, { clientData: myUserName },)
        .then(async () => {
          let devices = await OV.getDevices();
          let videoDevices = devices.filter(device => device.kind === 'videoinput');
          // --- 5) Get your own camera stream ---(퍼블리셔)
          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          let publisher = OV.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: '640x480', // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            mirror: true, // Whether to mirror your local video or not
          });

          // --- 6) 자신의 화면을 송출 ---
          mySession.publish(publisher);
          // Set the main video in the page to display our webcam and store our Publisher
          setPublisher(publisher) // 퍼블리셔(스트림 객체)를 담음
          setMainStreamManager(publisher) // 퍼블리셔(스트림 객체)를 담음
        })
        .catch((error) => {
          console.log('There was an error connecting to the session:', error.code, error.message);
        });
    });
  }

  // 세선 떠나기(이거 나중에 useCallback을 없앤 다음 테스트 해봐야할 듯)
  const leaveSession = useCallback(() => {
    // --- 7) disconnect함수를 호출하여 세션을 떠남
    const mySession = session;
    if (mySession) {
      mySession.disconnect();
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
    setTotalUsers((prevTotalUsers) => {
      return prevTotalUsers - 1
    })
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

  // 세션 아이디 변경
  const handleChangeSessionId = (event) => {
    setMySessionId(event.target.value)
  }
  
  // 유저 이름 변경
  const handleChangeUserName = (event) => {
    setMyUserName(event.target.value)
  }

  // 메인 비디오 스트림(일단은 안 씀)
  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream)
    }
  }

  // 참가자를 배열에서 제거함 
  const deleteSubscriber = useCallback((streamManager) => {
    let tmp_subscribers = subscribers;
    let index = tmp_subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      tmp_subscribers.splice(index, 1);
      setSubscribers(tmp_subscribers) // 이거 안 되면 구조분해할당으로 업데이트 할 것
    }
  }, [subscribers])

  // // 채팅창 열기
  // toggleChat(property) {
  //   let display = property;
  //   if (display === undefined) {
  //     display = this.state.chatDisplay === 'none' ? 'block' : 'none';
  //   }
  //   if (display === 'block') {
  //     this.setState({ chatDisplay: display, messageReceived: false });
  //   } else {
  //     console.log('chat', display);
  //     this.setState({ chatDisplay: display });
  //   }
  // }

  // 메세지 보내기(Sender of the message (after 'session.connect'))
  const sendMsg = (msg, currentSession) => {
    // this.state.session으로는 자식이 인식할 수 없으므로 currentSession을 자식에게 props로 넘겨주고 다시 받음
    currentSession
      .signal({
        data: msg, // Any string (optional)
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
    mySession.signal({
      data: true,
      type:"auction",
    }).then(() => {
      console.log("Auction Start!")
    }).catch((error) => {
      console.error(error)
    })
  }

  // 경매 가격 입찰
  const biddingHandler = (event) => {
    // 가격을 전달받아야함
    event.preventDefault()
    console.log(price)
  }

  // 가격 변동 핸들러
  const priceChangeHandler = (event) => {
    setPrice((prevPrice) => {
      return event.target.value
    })
  }

  return (
    <div className="container">
      {session === undefined ? (
        <div id="join">
          <div id="img-div">
            <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" />
          </div>
          <div id="join-dialog" className="jumbotron vertical-center">
            <h1> Join a video session </h1>
            <form className="form-group" onSubmit={joinSession}>
              <p>
                <label>Participant: </label>
                <input
                  className="form-control"
                  type="text"
                  id="userName"
                  value={myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label> Session: </label>
                <input
                  className="form-control"
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p className="text-center">
                <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
              </p>
            </form>
          </div>
        </div>
      ) : null}

      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            {totalUsers}
            {!toggleStart && <button onClick={startAuction}>경매 시작</button>}
            {toggleStart && <AuctionTimer seconds={seconds} setSeconds={setSeconds} currentSession={session}></AuctionTimer>}
            <h1 id="session-title">{mySessionId}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
          </div>

          {/* 퍼블리셔의 화면 */}
          {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null}
          {displayBidding && <form onSubmit={biddingHandler}>
              <input type="number" value={price} onChange={priceChangeHandler} step={props.data.bid_increment} min={props.data.starting_price} />
              <button>입찰</button>
            </form>}
          <ChattingList messageList={messageList}></ChattingList>
          <ChattingForm myUserName={myUserName} onMessage={sendMsg} currentSession={session}></ChattingForm>
        </div>
      ) : null}
    </div>
  );
}

export default VideoRoomComponent;
