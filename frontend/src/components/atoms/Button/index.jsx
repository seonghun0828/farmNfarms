import React from 'react';
import styled, { css } from "styled-components";

const colorStyle = css`
  ${({theme, textColor, fillColor, borderColor}) => {
    if (!textColor) {
      textColor = 'white'
    }
    if (!fillColor) {
      fillColor = 'green3'
    }
    if (!borderColor) {
      borderColor = 'green3'
    }
    return css`
    color: #${theme.colors[textColor]};
    background-color: #${theme.colors[fillColor]};
    border-color: #${theme.colors[borderColor]};
    `
  }}
`
const ButtonSize = css`
  ${({theme, size}) => {
    if (size === 'big') {
      return css `
        padding-left: 40vw;
        padding-right: 40vw;
        padding-top: 1vh;
        padding-bottom: 1vh;
        font-size: ${theme.fontSizes['titleSize']}
      `
    }
    if (size === 'middle') {
      return css `
        padding-left: 20vw;
        padding-right: 20vw;
        padding-top: 1vh;
        padding-bottom: 1vh;
        font-size: ${theme.fontSizes['xxxl']}
      `
    }
    if (size === 'small') {
      return css `
        padding-left: 5vw;
        padding-right: 5vw;
        padding-top: 0.5vh;
        padding-bottom: 0.5vh;
        font-size: ${theme.fontSizes['xxl']}
      `
    }
  }}
`

const StyledButton = styled.div`
  display: inline-block;
  outline: none;
  border-radius: 4px;
  border: 1px solid;
  cursor: pointer;
  box-shadow: 1px 1px 1px rgba(0,0,0,.2);
  ${colorStyle}
  ${ButtonSize}
`

function Button ({children, ...rest}) {
  return (
    <StyledButton 
        {...rest}
    >
      {children}
    </StyledButton>
  );
}

export default Button;