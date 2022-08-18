import React, { useState } from "react";
import { Send } from '@mui/icons-material'
import { Button, Input, Tooltip } from "@mui/material";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
`

const ChattingForm = (props) => {
  const [message, setMessage] = useState("")

  // 메세지를 보내는 함수
  const sendMessage = (event) => {
    event.preventDefault()
    if (message.trim() !== "") {
      props.onMessage(`${props.myUserName}: ` + message.trim(), props.currentSession) // 공백을 제거하여 전달
    }
    setMessage('')
  }

  // 입력 데이터 변경
  const inputChangeHandler = (event) => {
    setMessage(event.target.value)
  }

  return (
    <StyledForm onSubmit={sendMessage}>
      <Input 
        placeholder="메세지를 입력하세요"
        id="chat-input"
        value={message}
        onChange={inputChangeHandler}
        style={{ width: '100%', background: 'rgba(255, 255, 255)', border: '1px solid rgba(177, 177, 177)', borderRadius: '5px', padding: '5px'}}
        ></Input>
      <Tooltip title="메세지 보내기">
        <Button variant="contained" style={{ color: "white", background: '#019267'}} onClick={sendMessage}>
          <Send></Send>
        </Button>
      </Tooltip>
    </StyledForm>
  )
}

export default ChattingForm;