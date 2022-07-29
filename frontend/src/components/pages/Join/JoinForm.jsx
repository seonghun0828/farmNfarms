import React, { useState } from 'react';
import styled, {css} from "styled-components";
import InputButton from '../../molecules/InputButton';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import PostCode from '../../molecules/PostCode';

const colCenterFlex = css`
  ${({theme}) => css`
      ${theme.flex.columnCenter}
  `}
`
const rowCentorFlex = css`
  ${({theme}) => css`
      ${theme.flex.rowCenter}
  `}
`
const ColFlexBox = styled.div`
  display: inline-block;
  ${colCenterFlex}
  gap: 1rem;
`;

const RowFlexBox = styled.div`
  display: inline-block;
  ${rowCentorFlex}
  gap: 1rem;
  width: 100%;
`;

const JoinForm = () => {
  
  const [inputs, setInputs] = useState({
    phone: '',
    validationNum: '',
    password: '',
    password2: '',
    bank: '',
    accountNum: '',    
  });

  const [postCode, setPostCode] = useState({
		zonecode: '',
    address: '',
    extraAddress: '',
		detailAddress: '',
    fullAddress: '',
	});

  const getPostCode = (data) => {
    setPostCode(data)
  }

  console.log(inputs)
  return (
    <ColFlexBox>
      <InputButton 
        label="아이디" 
        placeholder="휴대전화 번호" 
        btnMsg="인증번호받기" 
        btnFontSize="md" 
        mode="highlight"
        name="phone"
        setValue={setInputs}
      />
      <InputButton 
        label="인증번호" 
        placeholder="인증 번호" 
        btnMsg="확인" 
        btnFontSize="md" 
        mode="highlight"
        name="validationNum"
        setValue={setInputs}
      />
      <Input 
        label="비밀번호" 
        placeholder="비밀번호"
        type="password" 
        name="password" 
        setValue={setInputs}
      />
      <Input 
        label="비밀번호" 
        placeholder="비밀번호 확인" 
        type="password" 
        name="password2" 
        setValue={setInputs}
      />
      <Input label="계좌번호" placeholder="계좌번호" name="accountNum" setValue={setInputs}/>

      <PostCode setPostCode={getPostCode}/>
      <Button width="100%">가입하기</Button>
    </ColFlexBox>
  );
}

export default JoinForm;