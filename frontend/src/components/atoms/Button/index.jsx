import React from 'react';
import { StyledButton, StyledTextButton } from './Button.styled';

const MODE = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  THIRD: "third",
  HIGHLIGHT: "highlight",
  GRAYTEXT: "graytext",
  WHITETEXT: "whitetext",
  BLACKBUTTON: "blackbutton",
  REDBUTTON: "redbutton"
};

const Button = ({children, fontSize, mode, width, height, ...rest}) => {
  if (mode !== "graytext" && mode !== "whitetext") {
    return (
    <StyledButton 
      fontSize={fontSize}
      mode={mode}
      width={width}
      height={height}
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
  height: '3rem',
};

export default Button;