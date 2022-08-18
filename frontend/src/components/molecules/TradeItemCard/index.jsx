import React from 'react';
import styled, {css} from 'styled-components';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import move from '../../../common/move';
import { save } from '../../../common/tokenSlice';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Card = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  border: 1px solid ${({ theme }) => theme.colors.green3};
  ${({isInHistory}) => {
    if(isInHistory) {
      return css`
        padding: 1rem 1.5rem 1rem 1.5rem;
      `
    } else {
      return css`
      padding: 1rem 0.3rem 1rem 1.5rem;
    `
    }
  }}
  border-radius: 1.5rem;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
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
  width: 100%;
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

const RowFlex = styled.div`
  display: flex;
  gap: 0.1rem;
`

const ColorDiv = styled.div`
  all: unset;
  color: ${({ theme }) => theme.colors.green3};
`

const paddingDiv = styled.div`
  padding-right: 1.2rem;
`

const TradeItemCard = ({labels, clickHandler, isInHistory, ...rest}) => {
  const { auctionResultId, auctionedPrice, dealCompleted,
    grade, productTitle, quantity } = rest.item;

  return (
    <Card onClick={() => clickHandler(auctionResultId)} isInHistory={isInHistory}>
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
          <Text size="xl" color="gray2">{grade} / {quantity.toLocaleString('ko-KR')}kg</Text>
        </ItemInfo>
        <RowFlex>
          <Text size="xxl">{auctionedPrice.toLocaleString('ko-KR')}원</Text>
          {isInHistory ?
            null : 
            <ColorDiv>
              <ArrowForwardIosIcon fontSize="large"/>
            </ColorDiv>
          }
        </RowFlex>
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
  isInHistory: false,
};

export default TradeItemCard;
