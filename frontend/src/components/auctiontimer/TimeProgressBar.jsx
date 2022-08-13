import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ProgressDiv = styled.div`
  background-color: white;
	border-radius: 15px;
	position: relative;
	margin: 5px 0;
	height: 10px;
	width: 300px;
`

const ProgressDoneDiv = styled.div`
  background: linear-gradient(to left, #F2709C, #FF9472);
	box-shadow: 0 3px 3px -5px #F2709C, 0 2px 5px #F2709C;
	border-radius: 15px;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 0;
	opacity: 0;
	transition: 1.5s ease;
`

const TimeProgressBar = ({ seconds }) => {
  const [style, setStyle] = useState();

  useEffect(() => {
    const newStyle = {
      opacity: 1,
      width: `${(20 - seconds) / 20 * 100}%`
    }
    setStyle(newStyle)
  }, [seconds])

  return (
    <ProgressDiv>
      <ProgressDoneDiv style={style}>
      </ProgressDoneDiv>
    </ProgressDiv>
  )
}

export default TimeProgressBar;