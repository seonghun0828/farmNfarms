import React from 'react';
import { StyledButton } from './Button.styled';

const MODE = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  HIGHLIGHT: "highlight",
};

const Button = ({children, fontSize, mode, ...rest}) => {
  return (
    <StyledButton 
      fontSize={fontSize}
      mode={mode}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

Button.defaultProps = {
  mode: MODE.PRIMARY,
  fontSize: 'xl',
};

export default Button;