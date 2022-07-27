import React from 'react';
import { FlexBox, Label, StyledInput, HelpText } from './Input.styled';

const STATUS = {
  DEFAULT: "default",
  READONLY: "readOnly",
  ERROR: "error",
};

const Input = ({children, status, label, helpMsg, type, placeholder, ...rest}) => {
  return (
    <FlexBox>
      <Label status={status} {...rest}>
        {label}
      </Label>
      <StyledInput 
        status={status} 
        type={type}
        placeholder={placeholder} 
        {...rest}
      />
      <HelpText status={status} {...rest}>
        {helpMsg}
      </HelpText>
    </FlexBox>
  );
}

Input.defaultProps = {
  status: STATUS.DEFAULT
};

export default Input;