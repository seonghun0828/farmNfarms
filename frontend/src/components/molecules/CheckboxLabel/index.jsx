import React from "react";
import styled, {css} from "styled-components";
import Checkbox from "../../atoms/Checkbox";
import Label from "../../atoms/Label";

const flex = css`
    ${({theme}) => css`
            ${theme.flex.rowCenter}
        `
    }
`
const StyledCheckboxLabel = styled.div`
    ${flex}
`
const CheckboxLabel = ({text, size, id, ...rest}) => {
    return <StyledCheckboxLabel {...rest}>
        <Checkbox size={size} id={id} {...rest} />
        <Label size={size} htmlFor={id}>{text}</Label>
    </StyledCheckboxLabel>
}

export default CheckboxLabel;