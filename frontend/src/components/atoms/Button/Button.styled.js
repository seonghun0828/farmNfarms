import styled from "styled-components";
import theme from '../../../common/theme'

const textColor = {
  primary: theme.colors.white,
  secondary: theme.colors.green3,
  readonly: theme.colors.gray2,
  // third: theme.colors.white,
  // highlight: theme.colors.black,
  graytext: theme.colors.gray2,
  greentext: theme.colors.green3,
  whitetext: theme.colors.white,
  blacktext: theme.colors.black,
};

const bgColor = {
  primary: theme.colors.green3,
  secondary: theme.colors.white,
  readonly: theme.colors.gray3,
  // third: theme.colors.green5,
  // highlight: theme.colors.green1,
  graytext: 'transparent',
  greentext: 'transparent',
  whitetext: 'transparent',
  blacktext: 'transparent',
};

const borderColor = {
  primary: theme.colors.green3,
  secondary: theme.colors.green3,
  readonly: theme.colors.gray2,
  // third: theme.colors.green5,
  // highlight: theme.colors.green1,
  graytext: 'transparent',
  greentext: 'transparent',
  whitetext: 'transparent',
  blacktext: 'transparent',
};

export const StyledTextButton = styled.button`
  all: unset;
  display: inline-block;

  color: ${({mode}) => textColor[mode]};

  font-weight: ${({fontWeight}) => theme.fontWeights[fontWeight]};
  font-size: ${({fontSize}) => theme.fontSizes[fontSize]};
  font-family: ${({font}) => font};
  text-align: center;
  text-decoration: none;

  user-select: none;
  cursor: pointer;
`;

export const StyledButton = styled.button`
  width: ${({width}) => width};
  height: ${(height) => height};
  padding: 0 1rem;

  border-radius: ${({radius}) => radius};;
  border: 2px solid ${({mode}) => borderColor[mode]};
  background-color: ${({mode}) => bgColor[mode]};

  color: ${({mode}) => textColor[mode]};

  font-weight: ${theme.fontWeights.bold};
  font-size: ${({fontSize}) => theme.fontSizes[fontSize]};
  font-family: ${({font}) => font};
  text-align: center;
  text-decoration: none;

  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);

  user-select: none;
  cursor: pointer;
`;