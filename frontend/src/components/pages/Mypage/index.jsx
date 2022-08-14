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
  height: 100vh;
`;
const ProfileArea = styled.div`
  ${({ theme }) => theme.flex.columnCenter};
  width: 100%;
  justify-content: space-evenly;
  gap: 0.8rem;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  height: 35vh;
`;
const ProfileImageArea = styled.div`
  border-radius: 10rem;
  width: 10rem;
  height: 10rem;
  border: 1px solid gray;
`;
const ProfileButtonArea = styled.div`
  margin-top: 1rem;
  align-self: flex-end;
  padding: 0 1rem;
`;
const ToggleButtonArea = styled.div`
  ${({ theme }) => theme.flex.rowCenter};
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  padding: 1rem 0;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  justify-content: space-around;
  align-items: center;
  height: 8vh;
`;
const ItemInfoArea = styled.div`
  ${({ theme }) => theme.flex.columnCenter}
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  height: 46vh;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
`;

const ItemCardArea = styled.div`
  height: 84%;
  width: 86%;
  ${({ theme }) => theme.flex.columnCenter}
  justify-content: flex-start;
  overflow-y: auto;
  gap: 1.2rem;
  padding: 1rem 0;
  ::-webkit-scrollbar {
    display: none;
  }
`

const NameTag = styled.div`
  padding: 0.2rem 2rem;
  background-color: ${({ theme }) => theme.colors.green3};
  border-radius: 1rem;
  margin-bottom: 1rem;
`

const Div = styled.div`
  margin-top: ${(props) => props.mt + 'rem'};
  margin-bottom: ${(props) => props.mb + 'rem'};
  margin-left: ${(props) => props.ml + 'rem'};
  margin-right: ${(props) => props.mr + 'rem'};
  padding-top: ${(props) => props.pt + 'rem'};
  padding-bottom: ${(props) => props.pb + 'rem'};
  padding-left: ${(props) => props.pl + 'rem'};
  padding-right: ${(props) => props.pr + 'rem'};
`

const Mypage = () => {
  const [name, setName] = useState(null);
  const [img, setImg] = useState(null);
  const [isSalesHistory, setIsSalesHistory] = useState(true);
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));
  const navigate = useNavigate();
  const phoneNumber = useSelector((state) => state.token.value.phone);
  const dispatch = useDispatch();
  console.log(phoneNumber); // 테스트 하고 지우기
  const leftBtn = isSalesHistory ? 'greentext' : 'graytext';
  const rightBtn = isSalesHistory ? 'graytext' : 'greentext';

  const toggleBtn = (e) => {
    console.log(e.target, isSalesHistory)
    console.log(e.target.name)
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
      <Navbar url={logo} navigate={navigate} isLogin={isLogin} setIsLogin={setIsLogin} imgSize="xs" fontSize="sm" mode="graytext" />      
      <Div mt={0.5}/>
      <ProfileArea>
        <ProfileButtonArea>
          <Button width="10rem" height="2rem" fontSize='lg' mode="secondary" onClick={moveToUpdate}>
            회원정보 수정
          </Button>
        </ProfileButtonArea>
        <ProfileImageArea>
          <Image src={img} alt="profile" isCircle />
        </ProfileImageArea>
        <NameTag>
          <Text size='xxl' weight="bold" color="white">
            {name} 님
          </Text>
        </NameTag>
      </ProfileArea>
      <Div mt={0.5}/>
      <ToggleButtonArea>
        <Button name="salesHistory" mode={leftBtn} onClick={toggleBtn}>
          판매내역
        </Button>
        <Button name="purchaseHistory" mode={rightBtn} onClick={toggleBtn}>
          구매내역
        </Button>
      </ToggleButtonArea>
      <Div mt={0.5}/>
      <ItemInfoArea>
        <ItemCardArea>
          {
            isLoading ? <div>Loading...</div> :
              data.length > 0 ?
                data.map((item, idx) => <TradeItemCard key={item + idx} item={item} clickHandler={clickHandler} />) :
                <div>현재 진행중인 경매 물품이 없습니다.</div>
          }
        </ItemCardArea>
      </ItemInfoArea>
    </StyledMypage>
  );
  // return (
  //   <StyledMypage>
  //     <Navbar url={logo} navigate={navigate} isLogin={isLogin} setIsLogin={setIsLogin} imgSize="xs" fontSize="sm" mode="graytext" />      
  //     <ProfileArea>
  //       <ProfileImageArea>
  //         <Image src={img} alt="profile" isCircle />
  //       </ProfileImageArea>
  //       <ProfileButtonArea>
  //         <Button width="10rem" height="2rem" fontSize='lg'>
  //           {name} 님
  //         </Button>
  //         <Button width="10rem" height="2rem" fontSize='lg' mode="highlight" onClick={moveToUpdate}>
  //           회원정보 수정
  //         </Button>
  //       </ProfileButtonArea>
  //     </ProfileArea>
  //     <ToggleButtonArea>
  //       <Button name="salesHistory" mode={leftBtn} onClick={toggleBtn}>
  //         판매내역
  //       </Button>
  //       <Button name="purchaseHistory" mode={rightBtn} onClick={toggleBtn}>
  //         구매내역
  //       </Button>
  //     </ToggleButtonArea>
  //     <ItemInfoArea>
  //       {
  //         isLoading ? <div>Loading...</div> :
  //           data.length > 0 ?
  //             data.map((item, idx) => <TradeItemCard key={item + idx} item={item} clickHandler={clickHandler} />) :
  //             <div>현재 진행중인 경매 물품이 없습니다.</div>
  //       }
  //     </ItemInfoArea>
  //   </StyledMypage>
  // );
};

export default Mypage;
