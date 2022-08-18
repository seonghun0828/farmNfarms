import React from 'react';
import styled from 'styled-components';

const StyledTextarea = styled.textarea`
    width: 100%;
    height: ${({height}) => height}rem;
    padding: 0.5rem 0.5rem;
    border: 2px solid ${({theme}) => theme.colors.gray3};
    border-radius: 5px;
    font-size: ${({theme}) => theme.fontSizes.md};
    font-weight: ${({theme}) => theme.fontWeights.normal};
    resize: none;
    ::placeholder {
        color: ${({theme}) => theme.colors.gray2};
    }
`

const Textarea = ({children, name, setValue, ...rest}) => {
  const handleChange = (e) => {
    setValue &&
    setValue(inputs => ({
      ...inputs,
      [name]: e.target.value,
    }));
  }
  return (
    <StyledTextarea {...rest} />
  );
}

Textarea.defaultProps = {
  height: 3
};

export default Textarea;