import React, { useState } from "react";
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
    const [inputs, setInputs] = useState({
        phone: '',
        password: '',
        isSaved: false
    });
    const [status, setStatus] = useState({
        phoneStatus: 'default',
        passwordStatus: 'default'
    });
    const [alert, setAlert] = useState({
        phoneAlert: '',
        passwordAlert: ''
    })
    const {phone, password, isSaved} = inputs;
    const {phoneStatus, passwordStatus} = status;
    const {phoneAlert, passwordAlert} = alert;

    const onChange = (e) => {
        const {name, checked} = e.target;
        // 체크박스면 value에 boolean값, 아니면 String값
        const value = name === 'isSaved' ? checked : e.target.value;
        setInputs(inputs => ({
            ...inputs,
            [name]: value
        }));
    }
    const validate = () => {
        const regex = /^[0-9]+$/g;
        // 전화번호 공백, - 제거 / 비밀번호 공백 제거
        const trimmedPhone = phone.replaceAll(' ', '').replaceAll('-', '');
        const trimmedPassword = password.replaceAll(' ', '').replaceAll('-', '');
        // 전화번호 숫자로만 이뤄져있는지 / 11글자인지 / 010으로 시작하는지 점검
        if (!regex.test(trimmedPhone) || trimmedPhone.length !== 11 || trimmedPhone.substring(0, 3) !== '010') 
            return 1;
        
        // 비밀번호 4자 이상인지 체크
        if (trimmedPassword.length < 4)
            return 2;

        return 3;
    }
    const onClick = () => {
        const result = validate();

        switch (result) {
        case 1:
            setStatus(status => ({
                ...status,
                phoneStatus: 'error'
            }));
            setAlert(alert => ({
                ...alert,
                phoneAlert: '휴대전화 번호를 올바르게 입력해주세요'
            }));
            break;
        case 2:
            setStatus(status => ({
                ...status,
                passwordStatus: 'error'
            }));
            setAlert(alert => ({
                ...alert,
                passwordAlert: '비밀번호를 4자 이상 입력해주세요'
            }));
            break;
        case 3:
            setStatus(status => ({
                ...status,
                phoneStatus: 'default',
                passwordStatus: 'default'
            }));
            setAlert(alert => ({
                ...alert,
                phoneAlert: '',
                passwordAlert: ''
            }));
            console.log('문제 없음!');
            // 여기에서 로그인 api 호출
            break;
        }
    }
    return <StyledLogin>
        <LeftAlign>
            <Button fontSize='lg' mode='graytext'>뒤로 가기</Button>
        </LeftAlign>
        <Image src={logo} alt='logo' size='xxxl' />
        <LeftAlign>
            <Text color='green5' weight='bold' fontSize='xxxl'>로그인</Text>
        </LeftAlign>
        <LoginInput>
            <Input status={phoneStatus} helpMsg={phoneAlert} label="휴대전화 번호" name='phone' onChange={onChange} />
            <Input status={passwordStatus} helpMsg={passwordAlert} type='password' label="비밀번호" name='password' onChange={onChange} />
        </LoginInput>
        <LeftAlign>
            <CheckboxLabel text="휴대전화 번호 저장" size='lg' id="phone-save" name='isSaved' onChange={onChange} />
        </LeftAlign>
        <Button width='20rem' mode='primary' onClick={onClick}>로그인</Button>
        <AskJoin>
            <Text fontSize='sm'>계정이 아직 없으신가요? &nbsp;</Text>
            <Button fontSize='md' mode='graytext'>회원가입하기</Button>
        </AskJoin>
    </StyledLogin>
}

export default Login;