import { useEffect, useState } from 'react';
import styled, {css} from 'styled-components';
import CheckIcon from '@mui/icons-material/Check';
import theme from '../../../common/theme';

const Circle = styled.div`
  padding: ${({ padding }) => padding};
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({isCheck}) => {
    if (isCheck) {
      return css`
        background-color: ${theme.colors.green3};
        color: ${theme.colors.white};
      `
    } else {
      return css`
        background-color: ${theme.colors.gray3};
        color: ${theme.colors.gray3};
      `
    }
  }}
`

const Line = styled.div`
  height: 1px;
  width: 100%;
  ${({isCheck}) => {
    if (isCheck) {
      return css`
      border: 1px solid ${({ theme }) => theme.colors.green3};
      `
    } else {
      return css`
        border: 1px solid ${({ theme }) => theme.colors.gray3};
      `
    }
  }}
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProgressBar = ({padding, phase}) => {

  const [phaseNum, setPhaseNum] 
  = useState({
    first: false, 
    second: false,
    third: false,
  });

  useEffect(() => {
    switch (phase) {
      case 0:
        setPhaseNum({
          first: false, 
          second: false,
          third: false,
        });
        break;
      case 1:
        setPhaseNum({
          first: true, 
          second: false,
          third: false,
        })
        break;
      case 2:
        setPhaseNum({
          first: true, 
          second: true,
          third: false,
        })
        break;      
      case 3:
        setPhaseNum({
          first: true, 
          second: true,
          third: true,
        })
        break;      
    }
  }, [phase])
 
  
  const { first, second, third } = phaseNum;
  

  return (
    <Container>
      <Circle padding={padding} isCheck={first}>
        <CheckIcon fontSize="large"></CheckIcon>
      </Circle>
      <Line isCheck={second}/>
      <Circle padding={padding} isCheck={second}>
        <CheckIcon fontSize="large"></CheckIcon>
      </Circle>
      <Line isCheck={third}/>
      <Circle padding={padding} isCheck={third}>
        <CheckIcon fontSize="large"></CheckIcon>
      </Circle>
    </Container>
  );
}

ProgressBar.defaultProps = {
  padding: '0.3rem',
  phase: 0,
}

export default ProgressBar;

