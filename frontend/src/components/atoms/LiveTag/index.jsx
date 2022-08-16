import styled, {keyframes} from 'styled-components';
import theme from '../../../common/theme';
import Text from '../../atoms/Text';

const blink = keyframes`
  0% {
    opacity: .5;
  }

  33% {
    opacity: .6;
  }

  66% {
    opacity: .8;
  }

  100% {
    opacity: 1;
  }
`

const BlinkDiv = styled.div`
  animation: ${blink} 1.5s linear infinite alternate;
`

const StyledTag = styled.div`
  display: inline-block;
  padding: 0.2rem 0.8rem;
  border-radius: 1rem;
  background-color: ${theme.colors.red};
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
`

const LiveTag = () => {
  return (
    <StyledTag>
      <BlinkDiv>
        <Text color="white">LIVE</Text>
      </BlinkDiv>
    </StyledTag>
  );
}

export default LiveTag;