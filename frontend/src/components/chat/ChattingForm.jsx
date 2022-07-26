import React, { useState } from "react";
import { Send } from '@mui/icons-material'
import { Button, Input, Tooltip } from "@mui/material";

const ChattingForm = (props) => {
  const [message, setMessage] = useState("")

  // 메세지를 보내는 함수
  const sendMessage = (event) => {
    event.preventDefault()
    props.onMessage(`${props.myUserName}: ` + message.trim(), props.currentSession) // 공백을 제거하여 전달
    setMessage('')
  }

  // 입력 데이터 변경
  const inputChangeHandler = (event) => {
    setMessage(event.target.value)
  }

  return (
      <form onSubmit={sendMessage}>
        <Input 
          placeholder="메세지를 입력하세요"
          id="chatInput"
          value={message}
          onChange={inputChangeHandler}
          ></Input>
        <Tooltip title="메세지 보내기">
          <Button variant="outlined" onClick={sendMessage}>
            <Send></Send>
          </Button>
        </Tooltip>
      </form>
  )
}

export default ChattingForm;