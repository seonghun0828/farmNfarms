import React from 'react';
import styled, {css} from "styled-components";
import InputButton from '../InputButton';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';

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
  return (
    <ColFlexBox>
      <InputButton 
        label="아이디" 
        placeholder="휴대전화 번호" 
        btnMsg="인증번호받기" 
        btnFontSize="md" 
        mode="highlight"
      />
      <InputButton 
        label="인증번호" 
        placeholder="인증 번호" 
        btnMsg="확인" 
        btnFontSize="md" 
        mode="highlight"
      />
      <Input label="비밀번호" placeholder="비밀번호"/>
      <Input label="비밀번호" placeholder="비밀번호 확인"/>
      <Input label="계좌번호" placeholder="계좌번호"/>
      <RowFlexBox>
        <Input label="우편번호"/>
        <Input label="상세 주소"/>
      </RowFlexBox>
      <Button width="100%">가입하기</Button>
    </ColFlexBox>
  );
}

export default JoinForm;