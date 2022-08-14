import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import _ from 'lodash';

const StyledAuctionSessionList = styled.div`
  height: 200px;
  background: rgba(0, 0, 0, 0.2);
  text-align: left;
  overflow: scroll;
  padding-left:10px;
`

const AuctionSession = (props) => {
  const scrollRef = useRef()
  const boxRef = useRef(null)

  const [scrollState, setScrollState] = useState(true);

  const scrollEvent = _.debounce(() => {
    const scrollTop = boxRef.current.scrollTop; // 스크롤 위치
    const clientHeight = boxRef.current.clientHeight; // 요소의 높이(메세지 박스 창의 높이)
    const scrollHeight = boxRef.current.scrollHeight; // 스크롤의 높이
    setScrollState(scrollTop + clientHeight >= scrollHeight - 100 ? true : false); // 스크롤이 맨 아래에 있을때
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
    <StyledAuctionSessionList ref={boxRef}>

    </StyledAuctionSessionList>
  )
}

export default AuctionSession;