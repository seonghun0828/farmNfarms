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

const Button = ({children, fontSize, fontWeight, mode, width, height, onClick, radius, font, ...rest}) => {

  if (mode === "readonly") {
    return (
      <StyledButton 
        fontSize={fontSize}
        fontWeight={fontWeight}
        mode={mode}
        width={width}
        height={height}
        radius={radius}
        font={font}
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
      font={font}
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
      font={font}
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