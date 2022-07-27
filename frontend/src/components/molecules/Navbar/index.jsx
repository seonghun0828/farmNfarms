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
    padding: 0 1rem;
    justify-content: space-between;
`

const Buttons = styled.div`
    ${flexRow}
    width: 10rem;
    justify-content: space-between;
`
const Navbar = ({text, size, id, ...rest}) => {
    return <StyledNavbar {...rest}>
        <Image src={logo} alt='logo' size='sm' />
        <Buttons>
            <Button fontSize='md' mode='whitetext'>로그아웃</Button>
            <Button fontSize='md' mode='whitetext'>마이페이지</Button>
        </Buttons>
    </StyledNavbar>
}

export default Navbar;