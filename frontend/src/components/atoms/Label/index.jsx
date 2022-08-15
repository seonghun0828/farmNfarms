import React from "react";
import styled, {css} from "styled-components";

const colorStyle = css`
    ${({theme, color}) => {
        return css`
            color: #${theme.colors[color]};
        `
    }}
`
const fontSize = css`
    ${({theme, size}) =>
        css`
            font-size: ${theme.fontSizes[size]}
        `
    }
`
const StyledLabel = styled.label`
    ${colorStyle}
    ${fontSize}
    font-family: 'Noto Sans KR';
`
const Label = ({children, htmlFor, ...rest}) => {
    return <StyledLabel htmlFor={htmlFor} {...rest}>{children}</StyledLabel>
}

export default Label;