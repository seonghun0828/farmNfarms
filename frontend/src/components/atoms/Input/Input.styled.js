import styled, {css} from "styled-components";
import theme from '../../../common/theme';

const bgColor = {
  default: theme.colors.white,
  readOnly: theme.colors.gray3,
};

const borderColor = {
  default: theme.colors.gray3,
  readOnly: theme.colors.gray3,
  error: theme.colors.red,
};

const textColor = {
  default: theme.colors.black,
}

const labelColor = {
  default: theme.colors.black
};

const helpTextColor = {
  default: theme.colors.gray2,
  error: theme.colors.red
};

const focus = css`
  :focus-within {
    outline: none;
    border: 2px solid ${theme.colors.green3};
    background-color: ${theme.colors.white};
  }
`

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;
`;

export const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: ${(props) => props.height}rem;
  padding: 0 0.5rem;
  border: 2px solid ${({status}) => borderColor[status]};
  border-radius: 5px;
  background-color: ${({status}) => bgColor[status]};

  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeights.normal};
  color: ${({status}) => textColor[status]};

  ${({status}) => {
    if (status !== 'readOnly') {
      return focus
    }
  }}

  ::placeholder {
    color: ${theme.colors.gray2};
    font-size: ${theme.fontSizes.md};
  }
`;

export const Label = styled.label`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.bold};
  color: ${({status}) => labelColor[status]};
  padding-left: 0.3rem;
`

export const HelpText = styled.div`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.normal};
  color: ${({status}) => helpTextColor[status]};
  padding-left: 0.3rem;
`