import React, { useState } from 'react';
import logo from '../../../assets/로고.svg';
import { useNavigate } from "react-router-dom";
import move from '../../../common/move';
import styled from 'styled-components';
import Navbar from '../../molecules/Navbar';
import Image from '../../atoms/Image';
// import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import TradeItemCard from '../../molecules/TradeItemCard';
// import Input from '../../atoms/Input';
// import Textarea from '../../atoms/Textarea';
// import CreateItemCard from '../../molecules/CreateItemCard';
// import { useNavigate } from 'react-router-dom';
// import move from '../../../common/move';
// import SearchBar from '../../molecules/SearchBar';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import getAuctionRooms from './getAuctionRooms';
// import { useInView } from 'react-intersection-observer';
// import RoomCard from '../../molecules/RoomCard';

const StyledMypage = styled.div`
  ${({ theme }) => theme.flex.columnCenter}
  justify-content: space-between;
  height: 47rem;
`;
const ProfileArea = styled.div`
  ${({ theme }) => theme.flex.rowCenter}
  width: 24rem;
  justify-content: space-evenly;
`;
const ProfileImageArea = styled.div`
  border-radius: 10rem;
  width: 10rem;
  height: 10rem;
  border: 1px solid gray;
`;
const ProfileButtonArea = styled.div`
  ${({ theme }) => theme.flex.columnCenter}
  justify-content: space-between;
  height: 5rem;
`;
const ToggleButtonArea = styled.div`
  ${({ theme }) => theme.flex.rowCenter}
`;
const ItemInfoArea = styled.div`
  ${({ theme }) => theme.flex.columnCenter}
  justify-content: flex-start;
  width: 24rem;
  height: 24rem;
  padding: 1rem 0;
  border: 1px solid gray;
  overflow-y: auto;
  gap: 1rem;
`;
const Mypage = () => {
  const [isSalesHistory, setIsSalesHistory] = useState(true);
  const leftBtn = isSalesHistory ? 'highlight' : 'blackbutton';
  const rightBtn = isSalesHistory ? 'blackbutton' : 'highlight';

  const toggleBtn = (e) => {
    if (e.target.name === 'salesHistory' && !isSalesHistory) {
      setIsSalesHistory((state) => !state);
    } else if (e.target.name === 'purchaseHistory' && isSalesHistory) {
      setIsSalesHistory((state) => !state);
    }
  };

  const navigate = useNavigate();

  const moveToUpdate = () => {
    move(navigate, 'update');
  }

  return (
    <StyledMypage>
      <Navbar url={logo} imgSize="xs" fontSize="sm" mode="graytext" />
      <ProfileArea>
        <ProfileImageArea>
          <Image src={logo} alt="profile" />
        </ProfileImageArea>
        <ProfileButtonArea>
          <Button width="10rem" height="2rem">
            김농부 님
          </Button>
          <Button width="10rem" height="2rem" mode="highlight" onClick={moveToUpdate}>
            회원 정보 수정
          </Button>
        </ProfileButtonArea>
      </ProfileArea>
      <ToggleButtonArea>
        <Button name="salesHistory" mode={leftBtn} onClick={toggleBtn}>
          판매내역
        </Button>
        <Button name="purchaseHistory" mode={rightBtn} onClick={toggleBtn}>
          구매내역
        </Button>
      </ToggleButtonArea>
      <ItemInfoArea>
        <TradeItemCard />
        <TradeItemCard />
        <TradeItemCard />
      </ItemInfoArea>
    </StyledMypage>
  );
};

export default Mypage;
