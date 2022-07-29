import { Timer } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect } from "react";

const AuctionTimer = ({ seconds, setSeconds, currentSession }) => {

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