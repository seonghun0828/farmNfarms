import React from 'react';
import styled from 'styled-components';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';

const StyledTradeItemCard = styled.div`
  width: 20rem;
  height: 13rem;
  border: 2px solid ${({ theme }) => theme.colors.green3};
  border-radius: 5px;
`;
const Space = styled.div`
  visibility: hidden;
  width: 3rem;
  height: 3rem;
`;
const ItemNav = styled.div`
  ${({ theme }) => theme.flex.rowCenter}
  justify-content: space-around;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.green3};
  border-radius: 5px 5px 0 0;
`;
const ItemBody = styled.div`
  ${({ theme }) => theme.flex.columnCenter}
  justify-content: space-evenly;
  position: relative;
  height: 11rem;
  padding: 0.5rem 0;
  gap: 1rem;
`;
const FloatButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
const Info = styled.div`
  ${({ theme }) => theme.flex.rowCenter}
`;
const InfoName = styled.div`
  width: 5rem;
  text-align: center;
`;
const InfoContent = styled.div`
  width: 15rem;
  padding-left: 0.5rem;
`;

const TradeItemCard = ({ labels, isTrading }) => {
  const btnMode = isTrading ? 'primary' : '';
  return (
    <StyledTradeItemCard>
      <ItemNav>
        {/* <Space /> */}
        <Text color="white" weight="bold" fontSize="lg">
          물품 정보
        </Text>
      </ItemNav>
      <ItemBody>
        {labels.map((label, idx) => (
          <Info key={label + idx}>
            <InfoName>
              <Text size="lg" color="gray2" weight="bold">
                {label}
              </Text>
            </InfoName>
            <InfoContent>{idx}입니다</InfoContent>
          </Info>
        ))}
        <FloatButton>
          <Button mode={btnMode} width="6.5rem" height="3rem" fontSize="lg">
            {isTrading ? '거래 중' : '거래완료'}
          </Button>
        </FloatButton>
      </ItemBody>
    </StyledTradeItemCard>
  );
};

TradeItemCard.defaultProps = {
  labels: ['품목', '등급', '수량', '낙찰가'],
  isTrading: false,
};

export default TradeItemCard;
