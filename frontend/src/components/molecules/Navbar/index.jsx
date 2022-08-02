import React from "react";
import styled, {css} from "styled-components";
import Image from '../../atoms/Image'
import Button from '../../atoms/Button'
import logo from '../../../assets/temp_logo.png'


const flexRow = css`
    ${({theme}) => css`
            ${theme.flex.rowCenter}
        `
    }
`
const StyledNavbar = styled.div`
    ${flexRow}
    width: 100%;
    background: ${({theme}) => css`${theme.colors['background']}`};
    padding: 0.5rem 1rem;
    justify-content: space-between;
`

const Buttons = styled.div`
    ${flexRow}
    width: 10rem;
    justify-content: space-between;
`
const Navbar = ({url, isLogin, imgSize, fontSize, mode, ...rest}) => {
    const text = isLogin ? '로그아웃' : '로그인';
    return <StyledNavbar {...rest}>
        <Image src={url} alt='logo' size={imgSize} />
        <Buttons>
            <Button fontSize={fontSize} mode={mode} {...rest}>{text}</Button>
            <Button fontSize={fontSize} mode={mode} {...rest}>마이페이지</Button>
        </Buttons>
    </StyledNavbar>
}

export default Navbar;