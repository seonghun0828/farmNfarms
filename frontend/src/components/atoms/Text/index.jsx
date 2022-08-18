import React from 'react';
import styled, { css } from "styled-components";
import theme from '../../../common/theme'

const colorStyle = css`
  ${({theme, color}) => {
    return css`
      color: ${theme.colors[color]};
    `
  }}
`

const fontSize = css`
  ${({theme, fontSize}) => {
    return css`
      font-size: ${theme.fontSizes[fontSize]};
    `
  }}
`

const fontWeight = css`
  ${({theme, weight}) => {
    return css`
      font-weight: ${theme.fontWeights[weight]};
    `
  }}
`

const StyledText = styled.div`
  display: inline-block;
  ${colorStyle}
  ${fontSize}
  ${fontWeight}
  font-family: ${({font}) => font}
`

const Text = ({children, color, size, weight, font, ...rest}) => {
  return (
    <StyledText
      color={color}
      fontSize={size}
      weight={weight}
      font={font}
      {...rest}
    >
      {children}
    </StyledText>
  );
}

Text.defaultProps = {
  color: "black",
  size: "md",
  weight: "normal",
  font: ""
};

export default Text;