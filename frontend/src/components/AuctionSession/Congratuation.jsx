import React from "react";
import './congratuation.css';
import styled from "styled-components";

const StyledCelebrationDiv = styled.div`
  width: 350px;
  height: 150px;
  background: rgba(0, 0, 0, 0.2);
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
  width: 320px;
  height: 120px;
  margin: 10px;
  padding: 5px;
  border-radius: 15px;
  background-color: #9fa8da;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  color: white;
`

const Congratuation = ({ bestBidder }) => {
  return (
    <StyledCelebrationDiv>
      <BiddingDiv>
        <div className="confetti">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>{bestBidder}님</span>
            <span>낙찰 축하합니다!!!</span>
          </div>
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
      </BiddingDiv>
    </StyledCelebrationDiv>

  )
}

export default Congratuation;