import React from "react";
import './congratuation.css';
import styled from "styled-components";

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
  position: relative;
  flex-direction: column;
  height: 120px;
  margin: 10px;
  padding: 5px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.3);  
`

const Congratuation = () => {
  return (
    <StyledAuctionSessionList>
      <BiddingDiv>
        <div className="confetti">
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
        </div>
        <span>OOO님 축하합니다</span>
      </BiddingDiv>
       

      

    </StyledAuctionSessionList>


  )
}

export default Congratuation;