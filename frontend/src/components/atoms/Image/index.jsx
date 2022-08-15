import React from "react";
import styled, {css} from "styled-components";

// width 길이만 설정해서 원본 비율은 유지
const size = css`
    ${({theme, size}) => 
        css`
            width: ${theme.contentSizes[size]};
        `
    }
`
const isCircle = css`
    ${({isCircle}) => isCircle &&
        css`
            border-radius: 50%;
        `
    }
`
const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${size}
    ${isCircle}
`

const Image = ({isCircle, ...rest}) => {
    return(
        <StyledImage isCircle={isCircle} {...rest} />
    )
}

export default Image;