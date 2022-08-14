import React from "react";
import { ShoppingCart } from '@mui/icons-material'
import styled from "styled-components";

const StyledDiv = styled.div`
  background: #019267;
  width: 120px;
  height: 40px;
  padding: 4px;
  margin: 4px 4px 4px 0px;
  border-radius: 10px;
  font-size: large;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 2px 2px 1px black;
`

const ItemShowButton = ({ setItemDisplay }) => {

  const toggleDisplay = () => {
    setItemDisplay((prevState) => {
      return !prevState;
    })
  }

  return (
    <StyledDiv onClick={toggleDisplay}>
      <ShoppingCart />
      물품 정보
    </StyledDiv>
  )
}

export default ItemShowButton;