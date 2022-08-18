import React, { useEffect, useState } from "react";
import { Timer, ShutterSpeed } from '@mui/icons-material';
import styled, { keyframes } from "styled-components";
import TimeProgressBar from "./TimeProgressBar";

const StyledDiv = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  font-weight: bold;  
`

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: large;
  font-weight: bold;
`

const StyledButtonDiv = styled.div`
  background: #019267;
  width: 120px;
  height: 40px;
  padding: 4px;
  margin: 4px 4px 4px 0px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 2px 2px 1px black;
`

const waiting = keyframes`
  0% {
    content: "대기중";
  }

  33% {
    content: "대기중.";
  }

  66% {
    content: "대기중..";
  }

  100% {
    content: "대기중...";
  }
`

const WaitingMessageDiv = styled.div`
  font-size: 28px;

  ::after {
    content: "대기중";
    animation: ${waiting} 2s linear infinite;
  }
`

const AuctionTimer = (
  { seconds, setSeconds, currentSession, sessionCount, setSessionCount, 
    setItemIndex, toggleStart, setToggleStart, setChatDisplay, maxIndex, sendAuctionResult, 
    setTempHighestPrice, highestPrice, bestBidder, setTempBestBidder, isHost, 
    setAuctionSessionList, items, setPrice, setFinArr, setShowCelebration, setBestBidder, setHighestPrice
  }) => {

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
      };
  };

  // 20초 후 startTimer 자동 시작(테스트 단계에선 2초로 세팅해서 테스트함)
  useEffect(() => {
    if (seconds === 0 && sessionCount < 2) {
      const autoStart = setTimeout(() => {
        startTimer();
      }, 15000)
      return () => clearTimeout(autoStart)
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
        setTempHighestPrice(highestPrice) // 현재 세션에서만 고정되어 보여줄 경매 최고가
        setTempBestBidder(bestBidder) // 현재 세션에서만 고정되어 보여줄 경매 최고 입찰자
        if (sessionCount < 2) {
          setSessionCount((prevCount) => { // 경매 세션 카운트 + 1
            if (prevCount + 1 === 3) {
              return prevCount;
            }
            return prevCount + 1;
          });
        }

        if (sessionCount === 2) {
          sendAuctionResult(); // 백엔드에 경매 결과 데이터를 보내는 함수를 호출함(호스트가 한번만 보냄)
          if (bestBidder !== undefined) {
            // 최고 입찰자가 있으면 2초 뒤에 축하 메세지 토글링
            const toggleCelebration = setTimeout(() => {
              setShowCelebration(true);
            }, 2000);
          }

          // 경매가 완전히 끝난 이후에도 20초를 대기함
          const endTimeOut = setTimeout(() => {
            setItemIndex((prevIndex) => {
              // 경매 종료를 확인하기 위한 배열 업데이트
              setFinArr((prevArr) => {
                let newArr = [...prevArr]
                newArr[prevIndex] = 1;
                return newArr;
              })
              // props가 가진 items의 길이를 넘었을 때에 대한 예외처리필요
              if (prevIndex + 1 === maxIndex) {
                setPrice(items[prevIndex].startingPrice)
                return prevIndex;
              }
              setPrice(items[prevIndex + 1].startingPrice)
              return prevIndex + 1;
            });
            setToggleStart((prevState) => {
              return !prevState;
            });
            setSessionCount(0);
            setChatDisplay(true);
            setAuctionSessionList([]);
            setShowCelebration(false);
            setHighestPrice(0);
            setBestBidder(undefined);
            setTempHighestPrice(0);
            setTempBestBidder(undefined);
          }, 10000);
          // clearTimeout(endTimeOut); // clearTimeOut을 사용했을 경우 마지막에 제대로 동작하지 않음
        }
      }
    }, 1000)
    return () => clearInterval(countDown)
  }, [seconds])

  return (
    <StyledDiv>
      {seconds > 0 && <div>
          <TimeProgressBar seconds={seconds}></TimeProgressBar>
          <span>{seconds < 10 ? `00:0${seconds}초` : `00:${seconds}초`}</span>
        </div>}
      {seconds === 0 && <WaitingMessageDiv></WaitingMessageDiv>}
      {toggleStart && isHost && sessionCount <= 1 && <StyledButtonDiv onClick={startTimer}>
        {seconds === 0 && <ButtonDiv>
          <Timer></Timer>
          바로 시작
        </ButtonDiv>}
        {seconds !== 0 && <ButtonDiv>
          <ShutterSpeed></ShutterSpeed>
          진행중
        </ButtonDiv>}
      </StyledButtonDiv>}
    </StyledDiv>
  )
}

export default AuctionTimer;