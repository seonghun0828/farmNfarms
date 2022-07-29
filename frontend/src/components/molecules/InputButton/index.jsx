import React from 'react';
import styled from "styled-components";
import { FlexBox, Label, StyledInput, HelpText } from "../../atoms/Input/Input.styled";
import Button from "../../atoms/Button"

const STATUS = {
  DEFAULT: "default",
  READONLY: "readOnly",
  ERROR: "error",
};

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
`;

let isReadOnly = false;

const InputButton = ({ 
  status, 
  label, 
  helpMsg,
  type,
  placeholder, 
  btnMsg,
  btnFontSize,
  mode,
  name,
  setValue,
  btnWidth,
  btnClick,
  ...rest 
}) => {

  const handleChange = (e) => {
    setValue &&
    setValue(inputs => ({
      ...inputs,
      [name]: e.target.value,
    }));
  }

  if (status === "readOnly") {
    isReadOnly = true;
  } else {
    isReadOnly = false;
  } // 이렇게 하는게 맞나?? ??.??

  return (
    <FlexBox>
      <Label status={status} {...rest}>
        {label}
      </Label>
      <Layout>
        <StyledInput style={{width: '70%'}}
          status={status} 
          type={type} 
          placeholder={placeholder}
          onChange={handleChange}
          readOnly={isReadOnly} 
          {...rest}
        >
        </StyledInput>
        <Button  style={{width: '30%'}}
          fontSize={btnFontSize} 
          mode={mode} 
          width={btnWidth}
          onClick={btnClick}
          {...rest}
        >
          {btnMsg}
        </Button>
      </Layout>
      <HelpText status={status} {...rest}>
        {helpMsg}
      </HelpText>
    </FlexBox>
  );
}

InputButton.defaultProps = {
  status: STATUS.DEFAULT,
};

export default InputButton;