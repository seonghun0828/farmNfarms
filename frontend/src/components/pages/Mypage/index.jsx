import React, { useEffect, useState } from 'react';
import logo from '../../../assets/로고.svg';
import { useNavigate } from "react-router-dom";
import move from '../../../common/move';
import styled from 'styled-components';
import Navbar from '../../molecules/Navbar';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';
import TradeItemCard from '../../molecules/TradeItemCard';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import getFullHistory from './getFullHistory';
import { alertError } from '../../../common/alertError';
import Text from '../../atoms/Text';
import getMyInfo from './getMyInfo';
import { save } from '../../../common/tokenSlice';

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
  const [name, setName] = useState(null);
  const [img, setImg] = useState(null);
  const [isSalesHistory, setIsSalesHistory] = useState(true);
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));
  const navigate = useNavigate();
  const phoneNumber = useSelector((state) => state.token.value.phone);
  const dispatch = useDispatch();
  console.log(phoneNumber); // 테스트 하고 지우기
  const leftBtn = isSalesHistory ? 'highlight' : 'blackbutton';
  const rightBtn = isSalesHistory ? 'blackbutton' : 'highlight';

  const toggleBtn = (e) => {
    if (e.target.name === 'salesHistory' && !isSalesHistory) {
      setIsSalesHistory((state) => !state);
    } else if (e.target.name === 'purchaseHistory' && isSalesHistory) {
      setIsSalesHistory((state) => !state);
    }
  };

  const clickHandler = (auctionResultId) => {
    dispatch(save({
      auctionResultId,
      isSalesHistory
    }));
    move(navigate, '/history');
  }

  const moveToUpdate = () => {
    move(navigate, 'update');
  }

  const updateName = async () => {
    const { name, picturePath } = await getMyInfo(phoneNumber);
    setName(name);
    setImg(picturePath);
  }

  const { data, isLoading, isError } = useQuery(
    ['fullHistory'+isSalesHistory],
    () => getFullHistory(phoneNumber, isSalesHistory),
    { 
      // enabled: false,
    }
  )

  useEffect(() => {
    updateName();
  }, []);

  if (isError) {
    alertError('Failed to fetch full history');
  }

  return (
    <StyledMypage>
        <Navbar url={logo} navigate={navigate} isLogin={isLogin} setIsLogin={setIsLogin} imgSize="xs" fontSize="sm" mode="graytext" />      <ProfileArea>
        <ProfileImageArea>
          <Image src={img} alt="profile" isCircle />
        </ProfileImageArea>
        <ProfileButtonArea>
          <Button width="10rem" height="2rem" fontSize='lg'>
            {name} 님
          </Button>
          <Button width="10rem" height="2rem" fontSize='lg' mode="highlight" onClick={moveToUpdate}>
            회원정보 수정
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
        {
          isLoading ? <div>Loading...</div> :
            data.length > 0 ?
              data.map((item, idx) => <TradeItemCard key={item + idx} item={item} clickHandler={clickHandler} />) :
              <div>현재 진행중인 경매 물품이 없습니다.</div>
        }
      </ItemInfoArea>
    </StyledMypage>
  );
};

export default Mypage;
