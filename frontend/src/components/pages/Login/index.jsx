import React from "react";
import Image from "../../atoms/Image";
import CheckboxLabel from "../../molecules/CheckboxLabel";
import Button from '../../atoms/Button'
import logo from '../../../assets/temp_logo.png'
import styled, { css } from "styled-components";
import Text from "../../atoms/Text";
import Input from '../../atoms/Input'

const flexColumn = css`
    ${({theme}) => 
        css`
            ${theme.flex.columnCenter}
        `
    }
`
const flexRow = css`
    ${({theme}) => 
        css`
            ${theme.flex.rowCenter}
        `
    }
`
const StyledLogin = styled.div`
    ${flexColumn}
    justify-content: space-around;
    height:80vh;
`

const LoginInput = styled.div`
    width: 20rem;
`

const AskJoin = styled.div`
    ${flexRow}
`

const LeftAlign = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 20rem;
`

const Login = () => {
    return <StyledLogin>
        <LeftAlign>
            <Button fontSize='lg' mode='graytext'>뒤로 가기</Button>
        </LeftAlign>
        <Image src={logo} alt='logo' size='xxxl' />
        <LeftAlign>
            <Text color='green5' weight='bold' fontSize='xxxl'>로그인</Text>
        </LeftAlign>
        <LoginInput>
            <Input label="휴대전화 번호" />
            <Input label="비밀번호" />
        </LoginInput>
        <LeftAlign>
            <CheckboxLabel text="휴대전화 번호 저장" size='lg' id="phone-save" />
        </LeftAlign>
        <Button width='20rem' mode='primary'>로그인</Button>
        <AskJoin>
            <Text fontSize='sm'>계정이 아직 없으신가요? &nbsp;</Text>
            <Button fontSize='md' mode='graytext'>회원가입하기</Button>
        </AskJoin>
    </StyledLogin>
}

export default Login;