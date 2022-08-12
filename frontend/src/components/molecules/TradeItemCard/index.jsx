import React from 'react';
import styled from 'styled-components';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import move from '../../../common/move';

const StyledTradeItemCard = styled.div`
  width: 20rem;
  height: 13rem;
  border: 2px solid ${({ theme }) => theme.colors.green3};
  border-radius: 5px;
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

const TradeItemCard = ({labels, navigate, ...rest}) => {
  const { auctionResultId, auctionedPrice, dealCompleted,
    grade, productTitle, quantity } = rest.item;

  const btnMode = dealCompleted ? '' : 'primary';

  const clickHandler = () => {
    console.log('click! auctionResultId: ', auctionResultId);
    // 페이지 이동하면서 넘길 값 넘기기
    // move(navigate, '/history');
  }
  return (
    <StyledTradeItemCard onClick={clickHandler}>
      <ItemNav>
        <Text color="white" weight="bold" fontSize="lg">
          물품 정보
        </Text>
      </ItemNav>
      <ItemBody>
        <Info key={labels[0]}>
          <InfoName>
            <Text size="lg" color="gray2" weight="bold">
              {labels[0]}
            </Text>
          </InfoName>
          <InfoContent>{productTitle}</InfoContent>
        </Info>
        <Info key={labels[1]}>
          <InfoName>
            <Text size="lg" color="gray2" weight="bold">
              {labels[1]}
            </Text>
          </InfoName>
          <InfoContent>{grade}</InfoContent>
        </Info>
        <Info key={labels[2]}>
          <InfoName>
            <Text size="lg" color="gray2" weight="bold">
              {labels[2]}
            </Text>
          </InfoName>
          <InfoContent>{quantity}kg</InfoContent>
        </Info>
        <Info key={labels[3]}>
          <InfoName>
            <Text size="lg" color="gray2" weight="bold">
              {labels[3]}
            </Text>
          </InfoName>
          <InfoContent>{auctionedPrice}원</InfoContent>
        </Info>
        <FloatButton>
          <Button mode={btnMode} width="6.5rem" height="3rem" fontSize="lg">
            {dealCompleted ? '거래완료' : '거래 중'}
          </Button>
        </FloatButton>
      </ItemBody>
    </StyledTradeItemCard>
  );
};

TradeItemCard.defaultProps = {
  labels: ['품목', '등급', '수량', '낙찰가'],
};

export default TradeItemCard;
