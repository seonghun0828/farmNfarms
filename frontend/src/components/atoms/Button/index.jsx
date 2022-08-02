import React from 'react';
import { StyledButton, StyledTextButton } from './Button.styled';

const MODE = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  HIGHLIGHT: "highlight",
  GRAYTEXT: "graytext",
  WHITETEXT: "whitetext",
  BLACKBUTTON: "blackbutton",
  REDBUTTON: "redbutton"
};

const Button = ({children, fontSize, mode, ...rest}) => {
  if (mode !== "graytext" && mode !== "whitetext") {
    return (
    <StyledButton 
      fontSize={fontSize}
      mode={mode}
      {...rest}
    >
      {children}
    </StyledButton>
    );
  }
  return (
    <StyledTextButton
      fontSize={fontSize}
      mode={mode}
      {...rest}
    >
      {children}
    </StyledTextButton>
  );
};

Button.defaultProps = {
  mode: MODE.PRIMARY,
  fontSize: 'xl',
};

export default Button;