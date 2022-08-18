import React from "react";
import styled, {css} from "styled-components";
import Image from '../../atoms/Image'
import Button from '../../atoms/Button'
import move from "../../../common/move";
import logout from "../../pages/Home/logout";
import Swal from "sweetalert2";
import theme from "../../../common/theme";

const flexRow = css`
    ${({theme}) => css`
            ${theme.flex.rowCenter}
        `
    }
`
const StyledNavbar = styled.div`
    ${flexRow}
    width: 100%;
    background: ${({theme}) => css`${theme.colors['white']}`};
    padding: 0.5rem 1rem 0.5rem 0.3rem;
    justify-content: space-between;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.1);
    height: 3.5rem;
`

const Buttons = styled.div`
    ${flexRow}
    justify-content: space-between;
    gap: 1rem;
`
const Navbar = ({navigate, isLogin, setIsLogin, imgSize, fontSize, mode, fontWeight, ...rest}) => {
    const text = isLogin ? '로그아웃' : '로그인';
    const confirmLogout = () => {
        Swal.fire({
            text: "로그아웃 하시겠습니까?",
            showCancelButton: true,
            confirmButtonColor: theme.colors.green3,
            cancelButtonColor: theme.colors.gray2,
            cancelButtonText: '취소',
            confirmButtonText: '확인',
            width: 300,
          }).then((result) => {
            if (result.isConfirmed) {
              setIsLogin(false);
              logout();
            }
          })
        // if (window.confirm('로그아웃 하시겠습니까?')) {
        //     setIsLogin(false);
        //     logout();
        // }
    }
    const clickHandler = () => {
        isLogin ? confirmLogout() : move(navigate, '/login')
    }
    const moveToMypage = () => {
        move(navigate, '/mypage');
    }

    const moveToHome = () => {
        move(navigate, '/');
    }
    return <StyledNavbar {...rest}>
        <Image src='/assets/로고.svg' alt='logo' size={imgSize} onClick={moveToHome} style={{cursor: 'pointer'}}/>
        <Buttons>
            {
                isLogin ? <Button fontWeight={fontWeight} fontSize={fontSize} mode={mode} onClick={moveToMypage} font="Jua" {...rest}>마이페이지</Button> : null
            }
            <Button fontWeight={fontWeight} fontSize={fontSize} mode={mode} onClick={clickHandler} font="Jua" {...rest}>{text}</Button>
        </Buttons>
    </StyledNavbar>
}

Navbar.defaultProps = {
    imgSize: "xs",
    fontSize: "md",
    mode: "blacktext",
    fontWeight: "regular"
}

export default Navbar;