import styled, { css } from 'styled-components'
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

const StyledTextEllipsis = styled.div`
  width: ${(width) => width};
  ${colorStyle}
  ${fontSize}
  ${fontWeight}
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
`
// width를 px로 넣어줘야 동작한다.
const TextEllipsis = ({children, color, size, weight, width, ...rest}) => {
  return (
    <StyledTextEllipsis
      color={color}
      fontSize={size}
      weight={weight}
      width={width}
      {...rest}  
    >
      {children}
    </StyledTextEllipsis>
  );
}

TextEllipsis.defaultProps = {
  color: theme.colors.black,
  size: theme.fontSizes.md,
  weight: theme.fontWeights.normal,
  width: '50px',
};

export default TextEllipsis;