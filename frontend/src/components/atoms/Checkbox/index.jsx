import React from "react";
import styled, {css} from "styled-components";

const boxSize = css`
    ${({theme, size}) => {
        // size에 맞는 1.xx rem에서 rem 제거
        const num = theme.fontSizes[size].substring(0, theme.fontSizes[size].length - 3);
        return css`
            zoom: ${num};
        `
        }
    }
`

const StyledCheckbox = styled.input`
    ${boxSize}
    accent-color: green
`

const Checkbox = ({...rest}) => {
    return <StyledCheckbox type='checkbox' {...rest}/>
}

export default Checkbox;