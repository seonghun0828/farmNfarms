import styled, { css } from "styled-components";
import theme from '../../../common/theme'

const textColor = {
  primary: theme.colors.white,
  secondary: theme.colors.green3,
  highlight: theme.colors.black,
};

const bgColor = {
  primary: theme.colors.green3,
  secondary: theme.colors.gray1,
  highlight: theme.colors.green1
};

const borderColor = {
  primary: theme.colors.green3,
  secondary: theme.colors.green3,
  highlight: theme.colors.green1
};

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({width}) => width};
  height: 3rem;
  padding: 0 1rem;

  border-radius: 5px;
  border: 2px solid #${({mode}) => borderColor[mode]};
  background-color: #${({mode}) => bgColor[mode]};

  color: #${({mode}) => textColor[mode]};

  font-weight: ${theme.fontWeights.bold};
  font-size: ${({fontSize}) => theme.fontSizes[fontSize]};
  text-align: center;
  text-decoration: none;

  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);

  user-select: none;
  cursor: pointer;
`;