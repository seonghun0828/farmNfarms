import React from 'react';
import styled, { css } from "styled-components";

const colorStyle = css`
  ${({theme, textColor, fillColor}) => {
    console.log(theme.colors[textColor]);
    return css`
    color: #${theme.colors[textColor]};
    background-color: #${theme.colors[fillColor]};
    `
  }}
`

const StyledButton = styled.div`
  display: inline-block;
  ${colorStyle}
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