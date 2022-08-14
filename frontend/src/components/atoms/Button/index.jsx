import React from 'react';
import { StyledButton, StyledTextButton } from './Button.styled';

const MODE = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  READONLY: "readonly",
  // THIRD: "third",
  // HIGHLIGHT: "highlight",
  BLACKTEXT: "blacktext",
  GRAYTEXT: "graytext",
  WHITETEXT: "whitetext",
  BLACKBUTTON: "blackbutton",
  REDBUTTON: "redbutton"
};

const Button = ({children, fontSize, fontWeight, mode, width, height, onClick, ...rest}) => {

  if (mode === "readonly") {
    return (
      <StyledButton 
        fontSize={fontSize}
        fontWeight={fontWeight}
        mode={mode}
        width={width}
        height={height}
        {...rest}
      >
        {children}
      </StyledButton>
      );
  }

  if (mode !== "graytext" && mode !== "whitetext" && mode !== "blacktext") {
    return (
    <StyledButton 
      fontSize={fontSize}
      fontWeight={fontWeight}
      mode={mode}
      width={width}
      height={height}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
    );
  }
  return (
    <StyledTextButton
      fontSize={fontSize}
      fontWeight={fontWeight}
      mode={mode}
      onClick={onClick}
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
  fontWeight: 'bold',
};

export default Button;