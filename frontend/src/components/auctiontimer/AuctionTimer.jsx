import { Timer, ShutterSpeed } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: bold;  
`

const AuctionTimer = ({ seconds, setSeconds, currentSession, sessionCount, setSessionCount, setItemIndex, setToggleStart, setChatDisplay, maxIndex }) => {

  const startTimer = () => {
    // 시간이 다 됐을 때만 버튼이 작동 가능
    if (seconds === 0 && sessionCount < 2) {
      currentSession
        .signal({
          data: 20,
          type: "timer",
        })
        .then(() => {
          console.log("timer ON!");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  // 20초 후 startTimer 자동 시작(테스트 단계에선 2초로 세팅해서 테스트함)
  useEffect(() => {
    if (seconds === 0 && sessionCount < 2) {
      const autoStart = setInterval(() => {
        startTimer()
      }, 20000)
      return () => clearInterval(autoStart)
    }
  }, [seconds])

  // 타이머
  useEffect(() => {
    const countDown = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => {
          return (prevSeconds - 1)
        })
      }
      if (seconds === 0) {
        clearInterval(countDown)
        if (sessionCount === 2) {
          // 경매가 완전히 끝난 이후에도 20초를 대기함
          const endTimeOut = setTimeout(() => {
            setSessionCount(0)
            setItemIndex((prevIndex) => {
              // props가 가진 items의 길이를 넘었을 때에 대한 예외처리필요
              if (prevIndex + 1 == maxIndex) {
                return prevIndex
              }
              return prevIndex + 1
            })
            setToggleStart((prevState) => {
              return !prevState
            })
            setChatDisplay(true) 
          }, 20000)
          // clearTimeout(endTimeOut); // clearTimeOut을 사용했을 경우 마지막에 제대로 동작하지 않음
        }
      }
    }, 1000)
    return () => clearInterval(countDown)
  }, [seconds])

  
  return (
    <StyledDiv>
      {seconds < 10 ? `00:0${seconds}초` : `00:${seconds}초`}
      <Button variant="contained" onClick={startTimer}>
        {seconds === 0 && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px', fontWeight: 'bold'}}>
            <Timer></Timer>
            지금 시작
        </div>}
        {seconds !== 0 && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px', fontWeight: 'bold'}}>
          <ShutterSpeed></ShutterSpeed>
          진행중
        </div>}
      </Button>
    </StyledDiv>
  )
}

export default AuctionTimer;