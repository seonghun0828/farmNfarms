import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import _ from 'lodash';
import temp_logo from '../../assets/로고.svg';

const StyledChattingList = styled.div`
  height: 240px;
  background: rgba(0, 0, 0, 0.2);
  text-align: left;
  overflow: scroll;
  padding-left:10px;
`

const ChatDiv = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
`

const ProfileDiv = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 70%;
  overflow: hidden;
  border: 1px solid rgba(33, 33, 33);
`

const ProfileImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`
//   color: rgba(100, 100, 100);
const MessageSenderDiv = styled.div`
  color: rgba(210, 210, 210);
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  font-weight: bold;
  font-size: large;
  margin-left: 5px;
`

const MessageContentDiv = styled.div`
  width: 300px;
  color: white;
  font-weight: bold;
  font-size: large;
  margin-left: 5px;
`

const ChattingList = (props) => {
  const scrollRef = useRef()
  const boxRef = useRef(null)

  const [scrollState, setScrollState] = useState(true);

  const scrollEvent = _.debounce(() => {
    const scrollTop = boxRef.current.scrollTop; // 스크롤 위치
    const clientHeight = boxRef.current.clientHeight; // 요소의 높이(메세지 박스 창의 높이)
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
            <ChatDiv>
              <ProfileDiv>
                <ProfileImg src={temp_logo}></ProfileImg>
              </ProfileDiv>
              <div>
                <MessageSenderDiv>{msg.split(":")[0]}</MessageSenderDiv>
                <MessageContentDiv>{msg.split(":")[1]}</MessageContentDiv>
              </div>
            </ChatDiv>
          </div>
        ))}
      </div>
      <div ref={scrollRef}></div>
    </StyledChattingList>
  )
}

export default ChattingList;