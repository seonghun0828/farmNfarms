import React, { useState } from 'react';
import logo from '../../../assets/로고.svg';
import { useNavigate } from "react-router-dom";
import move from '../../../common/move';
import styled from 'styled-components';
import Navbar from '../../molecules/Navbar';
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import getDetailHistory from './getDetailHistory';
import { alertError } from '../../../common/alertError';
import TradeItemCard from '../../molecules/TradeItemCard';
import ProgressBox from '../../molecules/ProgressBox';

const StyledHistory = styled.div`
  ${({ theme }) => theme.flex.columnCenter}
  justify-content: flex-start;
  height: 100vh;
  `;
  const PageBody = styled.div`
  ${({ theme }) => theme.flex.columnCenter}
  justify-content: space-around;
  height: 90vh;
`
const LeftAlign = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 22rem;
`
const PartnerInfo = styled.div`
  ${({theme}) => theme.flex.columnCenter}
  justify-content: space-around;
  width: 22rem;
  height: 13rem;
  border: 1rem solid ${({ theme }) => theme.colors.green3};
  border-radius: 5px;
`;
const PartnerInfoRow = styled.div`
  ${({theme}) => theme.flex.rowCenter}
  justify-content: space-evenly;
`
const InfoLabel = styled.div`
  width: 8rem;
  text-align: center;
  padding-left: 1rem;
`;
const InfoValue = styled.div`
  width: 14rem;
  padding-left: 0.5rem;
`;
const History = () => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));
  const navigate = useNavigate();
  const auctionResultId = useSelector((state) => state.token.value.auctionResultId);
  const isSalesHistory = useSelector((state) => state.token.value.isSalesHistory);
  
  const { data: { data }, isLoading, isError} = useQuery(
    ['detailHistory'],
    () => getDetailHistory(auctionResultId, isSalesHistory),
    {

    }
  )

  const {auctionedPrice, deliveryCompleted, grade, paymentCompleted, productTitle, quantity,
        buyerName, buyerAddress, buyerPhoneNumber, sellerName, sellerPhoneNumber, sellerBank, sellerAccount
  } = data;

  const item = {auctionedPrice, deliveryCompleted, grade, paymentCompleted, productTitle, quantity};
  
  const hyphenedPhoneNumber = buyerPhoneNumber ?
    buyerPhoneNumber.slice(0, 3) + '-' + buyerPhoneNumber.slice(3, 7) + '-' + buyerPhoneNumber.slice(7, buyerPhoneNumber.length) :
    sellerPhoneNumber.slice(0, 3) + '-' + sellerPhoneNumber.slice(3, 7) + '-' + sellerPhoneNumber.slice(7, sellerPhoneNumber.length);
  // isSalesHistory 따라 처리하기

  const partnerInfo = isSalesHistory ?
    [['구매자', buyerName], ['휴대폰번호', hyphenedPhoneNumber], ['주소', buyerAddress]] :
    [['판매자', sellerName], ['휴대폰번호', hyphenedPhoneNumber], ['은행', sellerBank], ['계좌번호', sellerAccount]]

  if (isError) {
    alertError('Failed to fetch detail history');
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <StyledHistory>
      <Navbar url={logo} navigate={navigate} isLogin={isLogin} setIsLogin={setIsLogin} imgSize="xs" fontSize="sm" mode="graytext" />
      <PageBody>
        <LeftAlign>
            <Button fontSize='lg' mode='graytext' onClick={() => move(navigate, -1)}>뒤로 가기</Button>
        </LeftAlign>
        <ProgressBox />
        <TradeItemCard  item={item}  />
        <PartnerInfo>
          {
            partnerInfo.map(([label, value], idx) => {
              return (
                <PartnerInfoRow key={label+value+idx}>
                  <InfoLabel>
                    <Text size="lg" color="gray2" weight="bold">{label}</Text>
                  </InfoLabel>
                  <InfoValue>
                    <Text size='md' weight='bold'>{value}</Text>
                  </InfoValue>
                </PartnerInfoRow>
              )
            })
          }
        </PartnerInfo>
      </PageBody>
    </StyledHistory>
  );
};

export default History;
