import { Timer } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect } from "react";

const AuctionTimer = ({ seconds, setSeconds, currentSession, sessionCount, setItemIndex, setToggleStart, maxIndex }) => {

  const startTimer = () => {
    // 시간이 다 됐을 때만 버튼이 작동 가능
    if (seconds === 0) {
      currentSession
        .signal({
          data: 30,
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
        }
      }
    }, 1000)
    return () => clearInterval(countDown)
  }, [seconds])
  
  return (
    <div>
      {seconds < 10 ? `00:0${seconds}` : `00:${seconds}`}
      <Button variant="outlined" onClick={startTimer}>
        <Timer></Timer>
        경매 시작
      </Button>
    </div>
  )
}

export default AuctionTimer;