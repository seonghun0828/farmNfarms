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
    ${({size}) =>
        size === 'S' && 
        css`
            font-size: 1rem;
        `
    }
    ${({ size }) =>
        size === 'M' &&
        css`
        font-size: 1.5rem;
    `}
    ${({ size }) =>
        size === 'L' &&
        css`
        font-size: 2rem;
    `}
`
const StyledLabel = styled.label`
    font-size: 30px;
    ${colorStyle}
    ${fontSize}
`
const Label = ({children, htmlFor, ...rest}) => {
    return <StyledLabel htmlFor={htmlFor} {...rest}>{children}</StyledLabel>
}

export default Label;