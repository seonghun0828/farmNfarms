import React from 'react';
import { FlexBox, Label, StyledInput, HelpText } from './Input.styled';

const STATUS = {
  DEFAULT: "default",
  READONLY: "readOnly",
  ERROR: "error",
};

const Input = ({children, status, label, helpMsg, type, placeholder, name, setValue, ...rest}) => {
  const handleChange = (e) => {
    setValue &&
    setValue(inputs => ({
      ...inputs,
      [name]: e.target.value,
    }));
  }
  return (
    <FlexBox>
      <Label status={status} {...rest}>
        {label}
      </Label>
      <StyledInput 
        status={status} 
        type={type}
        placeholder={placeholder} 
        onChange={handleChange}
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