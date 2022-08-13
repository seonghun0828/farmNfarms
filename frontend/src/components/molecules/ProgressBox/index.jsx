import React from 'react';
import styled from 'styled-components';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';

const StyledProgressBox = styled.div`
  width: 22rem;
  height: 13rem;
  border: 2px solid ${({ theme }) => theme.colors.green3};
  border-radius: 5px;
`;
const ProgressNav = styled.div`
  ${({ theme }) => theme.flex.rowCenter}
  justify-content: space-around;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.green3};
  border-radius: 5px 5px 0 0;
`;

const ProgressBox = () => {
  return (
    <StyledProgressBox>
      <ProgressNav>
        <Text color="white" weight="bold" fontSize="lg">
          현재 진행 상황
        </Text>
      </ProgressNav> 
    </StyledProgressBox>
  );
};

ProgressBox.defaultProps = {
  labels: ['품목', '등급', '수량', '낙찰가'],
};

export default ProgressBox;
