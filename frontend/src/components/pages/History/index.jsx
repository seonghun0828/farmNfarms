import React, { useEffect, useState } from 'react';
import logo from '../../../assets/로고.svg';
import { useNavigate } from "react-router-dom";
import move from '../../../common/move';
import styled from 'styled-components';
import Navbar from '../../molecules/Navbar';
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import getDetailHistory from './getDetailHistory';
import { alertError } from '../../../common/alertError';
import TradeItemCard from '../../molecules/TradeItemCard';
import ProgressBox from '../../molecules/ProgressBox';
import reissue from '../../../common/reissue';

const StyledHistory = styled.div`
 `;

const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  padding: 1rem 1.5rem;
`

const LeftAlign = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`
const PartnerInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.green3};
  border-radius: 0 0 1rem 1rem;
  padding: 1rem 1.5rem;
  gap: 1.5rem;
  background-color: white;
`;

const PartnerHeader = styled.div`
  border-radius: 1rem 1rem 0 0;
  padding: 0.5rem 1.5rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.green3};
`

const PartnerCard = styled.div`
  width: 100%;
`

const NamePhone = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const History = () => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auctionResultId = localStorage.getItem('auctionResultId');
  const isSalesHistory = localStorage.getItem('isSalesHistory') === 'true';
  
  const { data, isLoading, isError} = useQuery(
    ['detailHistory'],
    () => getDetailHistory(auctionResultId, isSalesHistory),
    {}
  )

  useEffect(() => {
    reissue(dispatch);
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>
  }
  
  if (isError) {
    alertError('Failed to fetch detail history');
  }

  const {auctionedPrice, deliveryCompleted, grade, paymentCompleted, productTitle, quantity, createAt,
    buyerName, buyerAddress, buyerDetailAddress, buyerPhoneNumber, sellerName, sellerPhoneNumber, sellerBank, sellerAccount
  } = data.data;
  
  const item = {auctionedPrice, deliveryCompleted, grade, paymentCompleted, productTitle, quantity};
  
  const hyphenedPhoneNumber = buyerPhoneNumber ?
    buyerPhoneNumber.slice(0, 3) + '-' + buyerPhoneNumber.slice(3, 7) + '-' + buyerPhoneNumber.slice(7, buyerPhoneNumber.length) :
    sellerPhoneNumber.slice(0, 3) + '-' + sellerPhoneNumber.slice(3, 7) + '-' + sellerPhoneNumber.slice(7, sellerPhoneNumber.length);
    // isSalesHistory 따라 처리하기

  const partnerInfo = isSalesHistory ?
    [['구매자', buyerName], ['휴대폰번호', hyphenedPhoneNumber], ['주소', buyerAddress], ['상세주소', buyerDetailAddress]] :
    [['판매자', sellerName], ['휴대폰번호', hyphenedPhoneNumber], ['은행', sellerBank], ['계좌번호', sellerAccount]]

  return (
    <StyledHistory>
      <Navbar navigate={navigate} isLogin={isLogin} setIsLogin={setIsLogin} />
      <ContentBody>
        <LeftAlign>
            <Button fontSize='lg' mode='graytext' onClick={() => move(navigate, -1)}>뒤로 가기</Button>
        </LeftAlign>
        <ProgressBox progress={{isSalesHistory, deliveryCompleted, paymentCompleted, createAt, auctionResultId}} />
        <TradeItemCard  clickHandler={()=>{}} item={item} isInHistory={true}/>
        <PartnerCard>          
          <PartnerHeader>
            <Text size="xxl" color="white" weight="bold">{partnerInfo[0][0]}</Text>
          </PartnerHeader>
          <PartnerInfo>
            <NamePhone>
              <Text size="xl" weight="bold">{partnerInfo[0][1]}</Text>
              <Text size="xl">{partnerInfo[1][1]}</Text>
            </NamePhone>
            <ColumnFlex>
              <Text size="xl">{partnerInfo[2][1]}</Text>
              <Text size="xl">{partnerInfo[3][1]}</Text>
            </ColumnFlex>
          </PartnerInfo>
        </PartnerCard>
      </ContentBody>
    </StyledHistory>
  );
};

// const History = () => {
//   const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));
//   const navigate = useNavigate();
//   const auctionResultId = useSelector((state) => state.token.value.auctionResultId);
//   const isSalesHistory = useSelector((state) => state.token.value.isSalesHistory);
  
//   const { data, isLoading, isError} = useQuery(
//     ['detailHistory'],
//     () => getDetailHistory(auctionResultId, isSalesHistory),
//     {

//     }
//   )
//   if (isLoading) {
//     return <div>Loading...</div>
//   }
  
//   if (isError) {
//     alertError('Failed to fetch detail history');
//   }

//   const {auctionedPrice, deliveryCompleted, grade, paymentCompleted, productTitle, quantity, createAt,
//     buyerName, buyerAddress, buyerPhoneNumber, sellerName, sellerPhoneNumber, sellerBank, sellerAccount
//   } = data.data;
  
//   const item = {auctionedPrice, deliveryCompleted, grade, paymentCompleted, productTitle, quantity};
  
//   const hyphenedPhoneNumber = buyerPhoneNumber ?
//     buyerPhoneNumber.slice(0, 3) + '-' + buyerPhoneNumber.slice(3, 7) + '-' + buyerPhoneNumber.slice(7, buyerPhoneNumber.length) :
//     sellerPhoneNumber.slice(0, 3) + '-' + sellerPhoneNumber.slice(3, 7) + '-' + sellerPhoneNumber.slice(7, sellerPhoneNumber.length);
//     // isSalesHistory 따라 처리하기

//   const partnerInfo = isSalesHistory ?
//     [['구매자', buyerName], ['휴대폰번호', hyphenedPhoneNumber], ['주소', buyerAddress]] :
//     [['판매자', sellerName], ['휴대폰번호', hyphenedPhoneNumber], ['은행', sellerBank], ['계좌번호', sellerAccount]]
//   return (
//     <StyledHistory>
//       <Navbar navigate={navigate} isLogin={isLogin} setIsLogin={setIsLogin} />
//       <PageBody>
//         <LeftAlign>
//             <Button fontSize='lg' mode='graytext' onClick={() => move(navigate, -1)}>뒤로 가기</Button>
//         </LeftAlign>
//         <ProgressBox progress={{isSalesHistory, deliveryCompleted, paymentCompleted, createAt, auctionResultId}} />
//         <TradeItemCard  item={item}  />
//         <PartnerInfo>
//           {
//             partnerInfo.map(([label, value], idx) => {
//               return (
//                 <PartnerInfoRow key={label+value+idx}>
//                   <InfoLabel>
//                     <Text size="lg" color="gray2" weight="bold">{label}</Text>
//                   </InfoLabel>
//                   <InfoValue>
//                     <Text size='md' weight='bold'>{value}</Text>
//                   </InfoValue>
//                 </PartnerInfoRow>
//               )
//             })
//           }
//         </PartnerInfo>
//       </PageBody>
//     </StyledHistory>
//   );
// };

export default History;
