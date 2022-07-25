import React from "react";
import { OpenVidu } from "openvidu-browser";

const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443'
const OPENVIDU_SERVER_SECRET = 'MY_SECRET'
let OV = undefined
let localUser = new UserModel();

const AuctionRoom = (props) => {

        localUser: undefined,
  const [session, setSession] = useState(undefined)
  const [mySessionId, setMySessionId] = useState('SessionA')
  const [myUserName, setMyUserName] = useState('OpenVidu_User' + Math.floor(Math.random() * 100))
  const [subscribers, setSubscribers] = useState([])
  const [localUser, setLocalUser] = useState(undefined)
}

export default AuctionRoom;