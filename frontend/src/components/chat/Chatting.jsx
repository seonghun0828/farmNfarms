import React, { useState } from "react";
import ChattingForm from "./ChattingForm";
import ChattingList from "./ChattingList";

const Chatting = (props) => {
  // const [receivedMessage, setReceivedMessage] = useState([])

  // const onMessage = (receivedMsg) => {
  //   setReceivedMessage((prevReceivedMessage) => {
  //     return [
  //       ...prevReceivedMessage, receivedMsg
  //     ]
  //   })
  // }

  return (
    <div>
      <ChattingList messageList={props.messageList}></ChattingList>
      <ChattingForm onMessage={props.sendMsg}></ChattingForm>
    </div>
  )
}

export default Chatting;