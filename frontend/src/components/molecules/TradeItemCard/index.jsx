import React from 'react';
import styled from 'styled-components';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import move from '../../../common/move';
import { save } from '../../../common/tokenSlice';

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

const Card = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  border: 1px solid ${({ theme }) => theme.colors.green3};
  padding: 1rem 1.5rem;
  border-radius: 1.5rem;
`
const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const TotalItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CompleteBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1.5rem;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`

const TradeItemCard = ({labels, clickHandler, ...rest}) => {
  const { auctionResultId, auctionedPrice, dealCompleted,
    grade, productTitle, quantity } = rest.item;

  console.log(rest.item);
  return (
    <Card onClick={() => clickHandler(auctionResultId)}>
      {
        dealCompleted ? 
          <CompleteBox>
            <Text color="white" size="xxxl" weight="bold">거래 완료</Text>
          </CompleteBox>
          : null
      }
      <TotalItemInfo>
        <ItemInfo>
          <Text size="xxl" weight="bold">{productTitle}</Text>
          <Text size="xl" color="gray2">{grade} / {quantity}kg</Text>
        </ItemInfo>
        <Text size="xxl">{auctionedPrice} 원</Text>
      </TotalItemInfo>
    </Card>
  );
};

// const TradeItemCard = ({labels, clickHandler, ...rest}) => {
//   const { auctionResultId, auctionedPrice, dealCompleted,
//     grade, productTitle, quantity } = rest.item;

//   const btnMode = dealCompleted === false ? 'primary' : '';

//   console.log(rest.item);
//   return (
//     <StyledTradeItemCard onClick={() => clickHandler(auctionResultId)}>
//       <ItemNav>
//         <Text color="white" weight="bold" fontSize="lg">
//           물품 정보
//         </Text>
//       </ItemNav>
//       <ItemBody>
//         <Info key={labels[0]}>
//           <InfoName>
//             <Text size="lg" color="gray2" weight="bold">
//               {labels[0]}
//             </Text>
//           </InfoName>
//           <InfoContent>{productTitle}</InfoContent>
//         </Info>
//         <Info key={labels[1]}>
//           <InfoName>
//             <Text size="lg" color="gray2" weight="bold">
//               {labels[1]}
//             </Text>
//           </InfoName>
//           <InfoContent>{grade}</InfoContent>
//         </Info>
//         <Info key={labels[2]}>
//           <InfoName>
//             <Text size="lg" color="gray2" weight="bold">
//               {labels[2]}
//             </Text>
//           </InfoName>
//           <InfoContent>{quantity}kg</InfoContent>
//         </Info>
//         <Info key={labels[3]}>
//           <InfoName>
//             <Text size="lg" color="gray2" weight="bold">
//               {labels[3]}
//             </Text>
//           </InfoName>
//           <InfoContent>{auctionedPrice}원</InfoContent>
//         </Info>
//         <FloatButton>
//           {
//             dealCompleted === undefined ? null : 
//               <Button mode={btnMode} width="6.5rem" height="3rem" fontSize="lg">
//                 {dealCompleted ? '거래완료' : '거래 중'}
//               </Button>
//           }
//         </FloatButton>
//       </ItemBody>
//     </StyledTradeItemCard>
//   );
// };

TradeItemCard.defaultProps = {
  labels: ['품목', '등급', '수량', '낙찰가'],
};

export default TradeItemCard;
