import React from 'react';
import styled, { css } from "styled-components";

const colorStyle = css`
    ${({theme, color}) => {
        if (!color) {
            color = 'black'
        }
        return css`
            color: #${theme.colors[color]};
        `
    }}
`

const fontSize = css`
    ${({theme, fontSize}) => {
        if (!fontSize) {
          fontSize = 'base'
        }
        return css`
            font-size: ${theme.fontSizes[fontSize]};
        `
    }}
`

const StyledText = styled.div`
  display: inline-block;
  ${colorStyle}
  ${fontSize}
`

const Text = ({children, ...rest}) => {
  return (
    <StyledText 
        {...rest}
    >
      {children}
    </StyledText>
  );
}

export default Text;