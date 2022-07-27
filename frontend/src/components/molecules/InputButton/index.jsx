import React from 'react';
import styled, { css } from "styled-components";
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

const InputButton = ({ 
  status, 
  label, 
  helpMsg,
  type,
  placeholder, 
  btnMsg,
  btnFontSize,
  mode,
  btnWidth,
  ...rest 
}) => {
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
          {...rest}
        >
        </StyledInput>
        <Button  style={{width: '30%'}}
          fontSize={btnFontSize} 
          mode={mode} 
          width={btnWidth} 
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