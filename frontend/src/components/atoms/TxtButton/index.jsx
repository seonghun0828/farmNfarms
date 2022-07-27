import React from 'react';
import styled, { css } from "styled-components";
import theme from '../../../common/theme'

const colorStyle = css`
  ${({theme, color}) => {
    return css`
      color: #${theme.colors[color]};
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

const StyledTxtButton = styled.div`
  display: inline-block;
  user-select: none;
  cursor: pointer;
  ${colorStyle}
  ${fontSize}
  ${fontWeight}
`

const TxtButton = ({children, color, size, ...rest}) => {
  return (
    <StyledTxtButton
      color={color}
      fontSize={size}
      {...rest}
    >
      {children}
    </StyledTxtButton>
  );
}

Text.defaultProps = {
  color: theme.colors.black,
  size: theme.fontSizes.md,
  weight: theme.fontWeights.normal,
};

export default TxtButton;