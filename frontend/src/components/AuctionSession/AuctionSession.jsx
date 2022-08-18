import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import _ from 'lodash';
import temp_logo from '../../assets/로고.svg';
import { Gavel } from '@mui/icons-material';

const StyledAuctionSessionList = styled.div`
  width: 350px;
  height: 150px;
  background: rgba(0, 0, 0, 0.2);
  text-align: left;
  overflow: scroll;
  border-radius: 5px;
  margin-top: 2px;
  margin-bottom: 1px;
  padding-left: 5px;
  padding-right: 5px;
`

const BiddingDiv = styled.div`
  display: flex;
  margin: 10px;
  padding: 5px;
  align-items: center;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.3);  
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

const BidderDiv = styled.div`
  color: rgba(210, 210, 210);
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  font-weight: bold;
  font-size: 16px;
  margin-left: 5px;
`

const BiddingMsgDiv = styled.div`
  color: white;
  font-weight: bold;
  font-size: 16px;
  margin-right:10px;
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
  }, [props.auctionsessionList])

  useEffect(() => {
    boxRef.current.addEventListener("scroll", scroll)
  })

  return (
    <StyledAuctionSessionList ref={boxRef}>
      <div>
        {props.auctionsessionList.map((msg, i) => (
          <div key={i}>
            <BiddingDiv>
              <ProfileDiv>
                {/* props.logo나 랜덤 이미지로 변경 */}
                <ProfileImg src={temp_logo}></ProfileImg>
              </ProfileDiv>
              <div style={{display: 'flex'}}>
                <BidderDiv>
                  {msg}
                </BidderDiv>
                <BiddingMsgDiv>
                  님 입찰 완료! 
                </BiddingMsgDiv>
                <Gavel style={{ color: '#e89a4d' }}/>
              </div>
            </BiddingDiv>
          </div>
        ))}
      </div>
      <div ref={scrollRef}></div>
    </StyledAuctionSessionList>
  )
}

export default AuctionSession;