import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
import ChattingForm from '../chat/ChattingForm';
import ChattingList from '../chat/ChattingList';
import UserVideoComponent from './UserVideoComponent';
import AuctionTimer from '../auctiontimer/AuctionTimer'

const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

class VideoRoomComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mySessionId: 'SessionA',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined, // 페이지의 메인 비디오 화면(퍼블리셔 또는 참가자의 화면 중 하나)
      publisher: undefined, // 자기 자신의 캠
      subscribers: [], // 다른 유저의 스트림 정보를 저장할 배열
      chatDisplay: 'none', // 채팅 display
      messageList: [], // 메세지 정보를 담을 배열
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  // 세션 아이디 변경
  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }
  
  // 유저 이름 변경
  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  // 메인 비디오 스트림
  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream
      });
    }
  }

  // 참가자를 배열에서 제거함 
  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  // 세션에 참여하기
  joinSession() {
    // --- 1) 오픈비두 오브젝트 생성 ---
    this.OV = new OpenVidu();
    // --- 2) 세션을 시작 ---
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;
        // --- 3) 세션에서 발생하는 이벤트에 대한 동작을 구체화
        // 새로운 스트림이 매번 생성될 때마다
        mySession.on('streamCreated', (event) => {
          // 스트림 객체를 참가자에게 넘겨줌. 두번째 인자가 undefined이므로 HTML video를 스스로 생성하지 않음
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, 'undefined');
          var subscribers = this.state.subscribers;
          console.log(subscriber)
          subscribers.push(subscriber); // 배열에 스트림 객체를 추가

          // 참가자 배열을 최신화
          this.setState({
            subscribers: subscribers,
          });
        });

        // 스트림을 종료할 때마다
        mySession.on('streamDestroyed', (event) => {

          // 참가자 배열에서 스트림 객체를 제거함
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on('exception', (exception) => {
          console.warn(exception);
        });

        // 채팅 신호 수신하여 메세지 리스트 업데이트
        mySession.on("signal:chat", (event) => {
          const tmp = this.state.messageList.slice();
          tmp.push(event.data);
          this.setState({messageList: tmp})
        });

        // --- 4) 유효한 토큰으로 세션에 접속하기 ---
        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        this.getToken().then((token) => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(
              token,
              { clientData: this.state.myUserName },
            )
            .then(async () => {
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter(device => device.kind === 'videoinput');

              // --- 5) Get your own camera stream ---(퍼블리셔)
              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = this.OV.initPublisher(undefined, {
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
              this.setState({
                currentVideoDevice: videoDevices[0],
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log('There was an error connecting to the session:', error.code, error.message);
            });
        });
      },
    );
  }

  // 세선 떠나기
  leaveSession() {
    // --- 7) disconnect함수를 호출하여 세션을 떠남
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // 모든 속성을 초기화함
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
      messageList: []
    });
  }

  // 채팅창 열기
  toggleChat(property) {
    let display = property;

    if (display === undefined) {
      display = this.state.chatDisplay === 'none' ? 'block' : 'none';
    }
    if (display === 'block') {
      this.setState({ chatDisplay: display, messageReceived: false });
    } else {
      console.log('chat', display);
      this.setState({ chatDisplay: display });
    }
  }

  // 메세지 보내기
  sendMsg(msg, currentSession) {
    // Sender of the message (after 'session.connect')
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

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <div className="container">
        {this.state.session === undefined ? (
          <div id="join">
            <div id="img-div">
              <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" />
            </div>
            <div id="join-dialog" className="jumbotron vertical-center">
              <h1> Join a video session COPY</h1>
              <form className="form-group" onSubmit={this.joinSession}>
                <p>
                  <label>Participant: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={this.handleChangeUserName}
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
                    onChange={this.handleChangeSessionId}
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

        {this.state.session !== undefined ? (
          <div id="session">
            <div id="session-header">
              <AuctionTimer></AuctionTimer>
              <h1 id="session-title">{mySessionId}</h1>
              <input
                className="btn btn-large btn-danger"
                type="button"
                id="buttonLeaveSession"
                onClick={this.leaveSession}
                value="Leave session"
              />
            </div>

            {/* 퍼블리셔의 화면 */}
            {this.state.mainStreamManager !== undefined ? (
              <div id="main-video" className="col-md-6">
                <UserVideoComponent streamManager={this.state.mainStreamManager} />
              </div>
            ) : null}
            <ChattingList messageList={this.state.messageList}></ChattingList>
            <ChattingForm myUserName={this.state.myUserName} onMessage={this.sendMsg} currentSession={this.state.session}></ChattingForm>
            {/* <div id="video-container" className="col-md-6">
              {this.state.publisher !== undefined ? (
                <div className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                  <UserVideoComponent
                    streamManager={this.state.publisher} />
                </div>
              ) : null}
              {this.state.subscribers.map((sub, i) => (
                <div key={i} className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(sub)}>
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div> */}
          </div>
        ) : null}
      </div>
    );
  }

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

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) => this.createToken(sessionId));
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
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

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = {};
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
}

export default VideoRoomComponent;
