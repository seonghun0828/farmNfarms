import React, { useEffect, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(30) 

  useEffect(() => {
    const countDown = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSecond) => {
          prevSecond = prevSecond -1
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
      {seconds < 10 ? `0${seconds}` : seconds}
    </div>
  )
}

export default Timer;