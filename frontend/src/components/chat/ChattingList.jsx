import React from "react";
import styled from "styled-components";

const StyledChattingList = styled.div`
  height: 150px;
  background: rgba(255, 255, 255, 0.1);
  text-align: left;
  overflow: scroll;
  padding-left:10px;
`

const ChattingList = (props) => {

  return (
    <StyledChattingList>
      <div>
        {props.messageList.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
    </StyledChattingList>
  )
}

export default ChattingList;