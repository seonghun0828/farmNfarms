import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import _ from 'lodash';
import './ChattingList.css';

const StyledChattingList = styled.div`
  height: 150px;
  background: rgba(255, 255, 255, 0.2);
  text-align: left;
  overflow: scroll;
  padding-left:10px;
`

const ChattingList = (props) => {
  const scrollRef = useRef()
  const boxRef = useRef(null)

  const [scrollState, setScrollState] = useState(true);

  const scrollEvent = _.debounce(() => {
    const scrollTop = boxRef.current.scrollTop; // 스크롤 위치
    const clientHeight = boxRef.current.clientHeight; // 요소의 높이
    const scrollHeight = boxRef.current.scrollHeight; // 스크롤의 높이

    // 스크롤이 맨 아래에 있을때
    setScrollState(scrollTop + clientHeight >= scrollHeight - 100 ? true : false);
  }, 100);

  const scroll = useCallback(() => {
    scrollEvent()
  }, [])

  useEffect(() => {
    if (scrollState) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [props.messageList])

  useEffect(() => {
    boxRef.current.addEventListener("scroll", scroll)
  })

  return (
    <StyledChattingList ref={boxRef}>
      <div>
        {props.messageList.map((msg, i) => (
          <div key={i}>
            <span id="msg-sender">{msg.split(":")[0]}</span>
            <span id="sender-msg">{msg.split(":")[1]}</span>
          </div>
        ))}
      </div>
      <div ref={scrollRef}></div>
    </StyledChattingList>
  )
}

export default ChattingList;