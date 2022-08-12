import styled from 'styled-components';
import theme from '../../../common/theme';
import Text from '../../atoms/Text';

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
      <Text color="white">LIVE</Text>
    </StyledTag>
  );
}

export default LiveTag;