import React from 'react';
import { FlexBox, Label, StyledInput, HelpText } from './Input.styled';

const STATUS = {
  DEFAULT: "default",
  READONLY: "readOnly",
  ERROR: "error",
};

let isReadOnly = false;

const Input = ({children, status, label, helpMsg, type, placeholder, name, setValue, ...rest}) => {
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
      <StyledInput 
        status={status} 
        type={type}
        placeholder={placeholder} 
        onChange={handleChange}
        readOnly={isReadOnly}
        name={name}
        {...rest}
      />
      <HelpText status={status} {...rest}>
        {helpMsg}
      </HelpText>
    </FlexBox>
  );
}

Input.defaultProps = {
  status: STATUS.DEFAULT,
  height: 3
};

export default Input;