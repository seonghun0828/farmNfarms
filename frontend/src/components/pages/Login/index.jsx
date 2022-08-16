import React, { useEffect, useState } from "react";
import Image from "../../atoms/Image";
import CheckboxLabel from "../../molecules/CheckboxLabel";
import Button from '../../atoms/Button'
import logo from '../../../assets/로고.svg'
import styled from "styled-components";
import Text from "../../atoms/Text";
import Input from '../../atoms/Input'
import { useNavigate } from "react-router-dom";
import move from '../../../common/move'
import login from "./login";
import { useDispatch } from 'react-redux/es/exports';
import reissue from "../../../common/reissue";

const StyledLogin = styled.div`
    ${({theme}) => theme.flex.columnCenter};
    justify-content: space-around;
    height:90vh;
`
const StyledLogo = styled.div`
    display: flex;
    justify-content: center;
    width: 18rem;
    hieght: 18rem;
    padding: 1rem;
`

const LoginInput = styled.div`
    width: 20rem;
`

const AskJoin = styled.div`
    ${({theme}) => theme.flex.rowCenter};
`

const LeftAlign = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 20rem;
`
const LoginButtonArea = styled.div`
    ${({theme}) => theme.flex.columnCenter};
    gap: 1rem;
`;

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
    const [loginFail, setLoginFail] = useState(false);

    const {phone, password, isSaved} = inputs;
    const {phoneStatus, passwordStatus} = status;
    const {phoneAlert, passwordAlert} = alert;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChange = (e) => {
        const { checked } = e.target;
        setInputs(inputs => ({
            ...inputs,
            isSaved: checked
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

        setInputs(inputs => ({
            ...inputs,
            phone: trimmedPhone,
            password: trimmedPassword
        }));

        return 3;
    }

    const onClick = async () => {
        const result = validate();

        switch (result) {
        case 1:
            setStatus(status => ({
                ...status,
                phoneStatus: 'error',
                passwordStatus: 'default'
            }));
            setAlert(alert => ({
                ...alert,
                phoneAlert: '휴대전화 번호를 올바르게 입력해주세요',
                passwordAlert: ''
            }));
            break;
        case 2:
            setStatus(status => ({
                ...status,
                phoneStatus: 'default',
                passwordStatus: 'error'
            }));
            setAlert(alert => ({
                ...alert,
                phoneAlert: '',
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

            // 여기에서 로그인 api 호출
            const isLogin = await login(phone, password, setLoginFail, dispatch);
            if (isLogin) {
                if (isSaved)
                    localStorage.setItem('phone', phone);
                // 5분 후 reissue 요청
                setTimeout(() => reissue(dispatch), 1000 * 60 * 5);
                navigate('/');
            }
            break;
        default:
        }
    }
    useEffect(() => {
        if (localStorage.getItem('phone') !== null) {
            setInputs(inputs => ({
                ...inputs,
                phone: localStorage.getItem('phone'),
                isSaved: true
            }));
        }
    }, []);

    return <StyledLogin>
        <LeftAlign>
            <Button mode='graytext' onClick={() => move(navigate, -1)}>뒤로 가기</Button>
        </LeftAlign>
        <StyledLogo>
            <Image src={logo} alt='logo'/>
        </StyledLogo>
        <LeftAlign>
            <Text font="Jua" color='green5' weight='' fontSize='titleSize'>로그인</Text>
        </LeftAlign>
        <LoginInput>
            <Input status={phoneStatus} helpMsg={phoneAlert} label="휴대전화 번호" name='phone' value={phone} setValue={setInputs} />
            <Input status={passwordStatus} helpMsg={passwordAlert} type='password' label="비밀번호" name='password' value={password} setValue={setInputs} />
            <LeftAlign>
                <CheckboxLabel text="휴대전화 번호 저장" size='lg' id="phone-save" name='isSaved' checked={isSaved} onChange={onChange} />
            </LeftAlign>
        </LoginInput>
        <LoginButtonArea>
            {
                loginFail ? <Text color='red' fontSize='md'>아이디, 비밀번호를 다시 입력해주세요.</Text> : null
            }
            <Button width='20rem' mode='primary' onClick={onClick}>로그인</Button>
        </LoginButtonArea>
        <AskJoin>
            <Text fontSize='sm'>계정이 아직 없으신가요? &nbsp;</Text>
            <Button fontSize='md' mode='graytext' onClick={() => move(navigate, '/join')}>회원가입하기</Button>
        </AskJoin>
    </StyledLogin>
}

export default Login;