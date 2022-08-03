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
`

const Text = ({children, color, size, weight, ...rest}) => {
  return (
    <StyledText
      color={color}
      fontSize={size}
      weight={weight}
      {...rest}
    >
      {children}
    </StyledText>
  );
}

Text.defaultProps = {
  color: theme.colors.black,
  size: theme.fontSizes.md,
  weight: theme.fontWeights.normal,
};

export default Text;