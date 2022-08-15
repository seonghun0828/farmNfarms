import React from 'react';
import { StyledButton, StyledTextButton } from './Button.styled';

const MODE = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  READONLY: "readonly",
  // THIRD: "third",
  // HIGHLIGHT: "highlight",
  BLACKTEXT: "blacktext",
  GREENTEXT: "greentext",
  GRAYTEXT: "graytext",
  WHITETEXT: "whitetext",
  BLACKBUTTON: "blackbutton",
  REDBUTTON: "redbutton"
};

const Button = ({children, fontSize, fontWeight, mode, width, height, onClick, radius, ...rest}) => {

  if (mode === "readonly") {
    return (
      <StyledButton 
        fontSize={fontSize}
        fontWeight={fontWeight}
        mode={mode}
        width={width}
        height={height}
        radius={radius}
        {...rest}
      >
        {children}
      </StyledButton>
      );
  }

  if (mode !== "graytext" && mode !== "whitetext" && mode !== "blacktext" && mode !== 'greentext') {
    return (
    <StyledButton 
      fontSize={fontSize}
      fontWeight={fontWeight}
      mode={mode}
      width={width}
      height={height}
      onClick={onClick}
      radius={radius}
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
  radius: '5px',
};

export default Button;