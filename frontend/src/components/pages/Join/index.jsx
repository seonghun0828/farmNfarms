import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import move from '../../../common/move'
import Button from "../../atoms/Button"
import Text from "../../atoms/Text"
import Input from "../../atoms/Input";
import Image from '../../atoms/Image';
import PhoneVerification from "../../molecules/PhoneVerification";
import PostCode from "../../molecules/PostCode";
import Select from "../../atoms/Select";
import join from "./join";
import logo from '../../../assets/로고.svg'
import { StyledJoin, LeftAlign, CenterAlign, FormGapLayout, TextLayout, ButtonLayout, BankAccount, BankDiv, HeadGap } from "./Join.styled"
const Join = () => {

	const [phone, setPhone] = useState(null);
	const [isVerificated, setIsVerificated] = useState(false);

	const [passwords, setPasswords] = useState({
		password: '',
		password2: ''
	})
	const { password, password2 } = passwords;

	const [status, setStatus] = useState({
		passwordStatus: 'default',
		password2Status: 'default'
	});
	const [alert, setAlert] = useState({
		passwordAlert: '',
		password2Alert: ''
	})
	const {passwordStatus, password2Status} = status;
	const {passwordAlert, password2Alert} = alert;

	const [postCode, setPostCode] = useState({
		zonecode: '',
    address: '',
    extraAddress: '',
		fullAddress: '',
		detailAddress: '',
	});
	// address 랑 extraAddress 합친게 fullAddress 
	const { zonecode, fullAddress, detailAddress } = postCode; // 주소를 가입할때 어케 보낼까

	const getPostCode = (data) => {
    setPostCode(data)
  }

	const [inputs, setInputs] = useState({
		name: '',
		bank: '',
		account: '',
	})
	const { name, bank, account } = inputs;

	const BANK_OPTIONS = [
		{ value: "우리은행", name: "우리은행" },
		{ value: "국민은행", name: "국민은행" },
		{ value: "신한은행", name: "신한은행" },
		{ value: "하나은행", name: "하나은행" },
		{ value: "카카오뱅크", name: "카카오뱅크" },
	]

	const navigate = useNavigate();

	const passwordValidate = () => {

		const trimmedPassword = password.replaceAll(' ', '');
		// 비밀번호 4자 이상인지 체크
		const trimmedPassword2 = password2.replaceAll(' ', '');

		if (trimmedPassword.length < 4)
			return 1;
		
		if (trimmedPassword2 !== trimmedPassword)
			return 2;

			setPasswords(inputs => ({
				...inputs,
				password: trimmedPassword,
				password2: trimmedPassword2
		}));

		return 3;
	}

	const onClick = async () => {
		const result = passwordValidate();

		switch (result) {
			case 1:
				setStatus(status => ({
					...status,
					passwordStatus: 'error',
					password2Status: 'default',
				}));
				setAlert(alert => ({
					...alert,
					passwordAlert: '비밀번호를 4자 이상 입력해주세요',
					password2Alert: '',
				}));

				break;
			case 2:
				setStatus(status => ({
					...status,
					passwordStatus: 'default',
					password2Status: 'error',
				}));
				setAlert(alert => ({
					...alert,
					passwordAlert: '',
					password2Alert: '비밀번호를 다시 확인해주세요',
				}));

				break;
			case 3:
				setStatus(status => ({
					...status,
					passwordStatus: 'default',
					password2Status: 'default',
				}));
				setAlert(alert => ({
					...alert,
					passwordAlert: '',
					password2Alert: '',
				}))

				console.log(isVerificated, name, bank, account, zonecode, fullAddress, detailAddress)

				if (isVerificated && name && bank && account && zonecode && fullAddress && detailAddress) {
					const payload = {
						phone,
						password,
						name,
						address: fullAddress,
						detailAddress,
						account,
						bank,
						zipCode: zonecode,
					}
					const isJoin = await join(payload);
					if (isJoin) {
						console.log('성공했당');
						move(navigate, '/login');
					}
					else {
						console.log('회원가입실패')
					}
				}
				else if (!isVerificated) {
					console.log('휴대폰 인증을 완료해주세요.')
				}
				else {
					console.log('값이 비어있음')
				}
				break;
			default:
		}
	}

	useEffect(() => {
		setIsVerificated(false)
	}, [phone])
	
	return (
		<StyledJoin>
			<HeadGap>
				<LeftAlign>
					<Button mode="graytext" onClick={() => move(navigate, -1)}>
						뒤로 가기
					</Button>
				</LeftAlign>
				<CenterAlign>
					<Image src={logo} alt="logo" size="xxl"></Image>
				</CenterAlign>
				<TextLayout>
					<Text font="Jua" color="green3" weight="" size="titleSize">회원가입</Text>
				</TextLayout>
			</HeadGap>
			<FormGapLayout>
				<PhoneVerification setIsVerificated={setIsVerificated} setPhone={setPhone}/>
				<Input
					label="이름"
					placeholder="이름"
					name="name" 
					setValue={setInputs}
				/>
				<Input 
					label="비밀번호" 
					placeholder="비밀번호"
					type="password"
					status={passwordStatus}
					helpMsg={passwordAlert} 
					name="password" 
					setValue={setPasswords}
				/>
				<Input 
					label="비밀번호" 
					placeholder="비밀번호 확인" 
					type="password"
					status={password2Status}
					helpMsg={password2Alert}  
					name="password2" 
					setValue={setPasswords}
				/>
				<BankAccount>
					<Input label="계좌번호" placeholder="계좌번호" name="account" setValue={setInputs}/>
					<BankDiv>
						<Select options={BANK_OPTIONS} name="bank" setValue={setInputs} defaultValue="은행 선택"></Select>
					</BankDiv>
				</BankAccount>
				<PostCode setPostCode={getPostCode}/>
			</FormGapLayout>

			<ButtonLayout>
				<Button width="100%" onClick={onClick}>가입하기</Button>
			</ButtonLayout>
		</StyledJoin>
	);
}

export default Join;