import React from "react";
import styled, {css} from "styled-components";
import Image from '../../atoms/Image'
import Text from '../../atoms/Text'

const StyledImageText = styled.div`
    ${({theme}) => theme.flex.rowCenter}
    width: 100%;
    background-color: ${({theme, bgColor}) => theme.colors[bgColor]};
    justify-content: flex-start;
`

const ImageText = ({url, imgSize, text, fontSize, color, ...rest}) => {
    return <StyledImageText {...rest}>
        <Image src={url} alt='logo' size={imgSize} />
        <Text fontSize={fontSize} color={color}>{text}</Text>
    </StyledImageText>
}

export default ImageText;