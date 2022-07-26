import React from "react";
import styled from "styled-components";

// const StyledChattingList = styled.div`
//   height: 400px;
//   width: 300px;
//   background: rgba(255, 255, 255, 0.1);
//   overflow: scroll;
// `

const ChattingList = (props) => {

  return (
    <div>
      {props.messageList.map((msg, i) => (
        <div key={i}>{msg}</div>
      ))}
    </div>
  )
}

export default ChattingList;