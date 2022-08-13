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

const StyledHistory = styled.div`
  ${({ theme }) => theme.flex.columnCenter}

`;
const LeftAlign = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 22rem;
`
const CurrentProgress = styled.div`
  width: 22rem;
  height: 13rem;
  border: 2px solid ${({ theme }) => theme.colors.green3};
  border-radius: 5px;
`;
const CurrentProgressNav = styled.div`
  ${({ theme }) => theme.flex.rowCenter}
  justify-content: space-around;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.green3};
  border-radius: 5px 5px 0 0;
`;
const History = () => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));
  const navigate = useNavigate();
  const auctionResultId = useSelector((state) => state.token.value.auctionResultId);
  const isSalesHistory = useSelector((state) => state.token.value.isSalesHistory);
  
  const { data, isLoading, isError} = useQuery(
    ['detailHistory'],
    () => getDetailHistory(auctionResultId, isSalesHistory),
    {

    }
  )
  const {auctionedPrice, deliveryCompleted, grade, paymentCompleted, productTitle, quantity } = data;
  const item = {auctionedPrice, deliveryCompleted, grade, paymentCompleted, productTitle, quantity};
    // isSalesHistory 따라 처리하기
  if (isError) {
    alertError('Failed to fetch detail history');
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <StyledHistory>
      <Navbar url={logo} navigate={navigate} isLogin={isLogin} setIsLogin={setIsLogin} imgSize="xs" fontSize="sm" mode="graytext" />
      <LeftAlign>
          <Button fontSize='lg' mode='graytext' onClick={() => move(navigate, -1)}>뒤로 가기</Button>
      </LeftAlign>
      <CurrentProgress>
        <CurrentProgressNav>
          <Text color="white" weight="bold" fontSize="lg">
            현재 진행 상황
          </Text>
        </CurrentProgressNav>
      </CurrentProgress>
      <TradeItemCard  item={item}  />
    </StyledHistory>
  );
};

export default History;
