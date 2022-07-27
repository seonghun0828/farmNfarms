import React from "react";
import Image from "../../atoms/Image";
import CheckboxLabel from "../../molecules/CheckboxLabel";
import Button from '../../atoms/Button'
import logo from '../../../static/temp_logo.png'
import styled, { css } from "styled-components";
import Text from "../../atoms/Text";
import Input from '../../atoms/Input'

const flex = css`
    ${({theme}) => 
        css`
            ${theme.flex.columnCenter}
        `
    }
`
const StyledLogin = styled.div`
    ${flex}
    justify-content: space-around;
    height:70vh;
`
const AskJoin = styled.div`

`

const Login = () => {
    return <StyledLogin>
        <Button>뒤로 가기</Button>
        <Image src={logo} alt='logo' size='xxxl' />
        <Text fontSize='xxxl'>로그인</Text>
        <Input label="휴대전화 번호" />
        <Input label="비밀번호" />
        <CheckboxLabel text="휴대전화 번호 저장" size='lg' id="phone-save" />
        <Button size='sm'>로그인</Button>
        <AskJoin>
            <Text fontSize='sm'>계정이 아직 없으신가요?</Text>
            <Button>회원가입</Button>
        </AskJoin>
    </StyledLogin>
}

export default Login;