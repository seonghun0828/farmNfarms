import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../molecules/Navbar';
import SearchBar from '../../molecules/SearchBar';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import Carousel from '../../molecules/Carousel';
import { useNavigate, createSearchParams } from 'react-router-dom';
import move from '../../../common/move'
import MainPriceCard from '../../molecules/MainPriceCard';
import main_price from './main_price'
import RoomCard from '../../molecules/RoomCard';
import AutoCarousel from '../../molecules/AutoCarousel';
import room_infos from './room_infos';
import theme from '../../../common/theme';
import reissue from '../../../common/reissue';
import { useDispatch } from 'react-redux';
import Image from '../../atoms/Image';

const StyledHome = styled.div``;
const FlexSearchArea = styled.div`
  ${({ theme }) => theme.flex.rowCenter}
  padding: 2rem 1rem;
`;
const SearchArea = styled.div`
  width: 100%;
`;
const RoomCardArea = styled.div`
  height: 19rem;
  padding-top: 1rem;
  background-color: white;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const MarketPriceArea = styled.div`
  height: 6rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.6rem 1rem 0.6rem;
`

const MoreInfo = styled.div`
  display: flex;
  justify-content: flex-end;
`

const AddRoomArea = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const Div = styled.div`
  margin-top: ${(props) => props.mt + 'rem'};
  margin-bottom: ${(props) => props.mb + 'rem'};
  margin-left: ${(props) => props.ml + 'rem'};
  margin-right: ${(props) => props.mr + 'rem'};
  padding-top: ${(props) => props.pt + 'rem'};
  padding-bottom: ${(props) => props.pb + 'rem'};
  padding-left: ${(props) => props.pl + 'rem'};
  padding-right: ${(props) => props.pr + 'rem'};
`;

const MoreButton = styled.div`
  border-radius: 50%;
  background-size: cover;
  background: no-repeat;
  background-size: 60%;
  background-position: center;
  background-image: url('/assets/transCamera.png');
  background-color: ${theme.colors.green3};
  padding: 2rem;
  width: 3rem;
  height: 3rem;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
`

const TitleDiv = styled.div`
  display: inline;
`

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const moveToCreate = () => {
    move(navigate, 'create');
  }
  const moveToAuctionRooms = () => {
    move(navigate, 'auctionrooms');
  }

  const moveToPrice = () => {
    move(navigate, 'price');
  }

  const [roomInfos, setRoomInfos] = useState(null);
  const getRoomInfos = async () => {
    setRoomInfos(await room_infos());
  }
  const [priceItems, setPriceItems] = useState(null);
  const getMainPrice = async () => {
    setPriceItems(await main_price());
  }


// --검색------------------------------------
  const [keyword, setKeyword] = useState('');
  const [params, setParams] = useState(null);

  const SearchKey = () => {
    if(keyword) {
      setParams({key: keyword,});
    } else {
      setParams({});
    }
  }

  useEffect(() => {
    if (params) {
      navigate({
        pathname: '/auctionrooms',
        search: `${createSearchParams(params)}`,
      },  
      {// auctionrooms로 keyword랑 query 보내주기
        state: {
          keyword,
          params
        }
      })
    }
  }, [params]);
// ---------------------------------------

  useEffect(() => {
    getMainPrice();
    getRoomInfos();
    console.log(roomInfos);
    
    if (localStorage.getItem('isLogin')) {
      reissue(dispatch);
    }
  }, [dispatch]);

  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));

  return (
    <StyledHome>
      <Navbar navigate={navigate} isLogin={isLogin} setIsLogin={setIsLogin} />
      <FlexSearchArea>
        <SearchArea>
          <SearchBar value={keyword} setKeyword={setKeyword} SearchKey={SearchKey}/>
        </SearchArea>
      </FlexSearchArea>
      <SectionTitle>
        <TitleDiv>
          <Text font="Jua" fontSize="xxxl" weight="">
            바로 지금! 경매 진행 중
          </Text>
        </TitleDiv>
        <MoreInfo>
          <Button mode="graytext" fontSize="md" fontWeight="normal" onClick={moveToAuctionRooms}>
            더보기
          </Button>
        </MoreInfo>
      </SectionTitle>
      <RoomCardArea>
      {roomInfos ?         
      <Carousel>
        {roomInfos.map((roominfo, index) => (
          <Div pl={0.5} pr={0.5} key={index}>
            <RoomCard {...roominfo}/>
          </Div>))
        }
      </Carousel>
        : <Text font="Jua" fontSize="xxxl">isLoading</Text>} 
      {/* isLoading 말고 좋은거 없나 시청자수 가져올 수 있는지 물어보기*/}
      </RoomCardArea>
      <Div mt={2.5}/>
      <SectionTitle>
        <Text font="Jua" fontSize="xxxl" weight="">
          오늘의 시세
        </Text>
        <MoreInfo>
          <Button mode="graytext" fontSize="md" fontWeight="normal" onClick={moveToPrice}>
            더보기
          </Button>
        </MoreInfo>
      </SectionTitle>
      <MarketPriceArea>
        {priceItems ?         
        <AutoCarousel slideLength={20}>
          {priceItems.map((priceItem, index) => (
            <Div pl={1} key={index}>
              <MainPriceCard {...priceItem} key={index}></MainPriceCard>
            </Div>
          ))}            
        </AutoCarousel> : <Text font="Jua" fontSize="xxxl">isLoading</Text>}
      </MarketPriceArea>
      <AddRoomArea>
        {/* <Button mode="graytext" fontSize="lg" onClick={() => window.alert(localStorage.getItem('isLogin'))}>
          로컬스토리지 테스트 버튼
        </Button>
        <Button mode="graytext" fontSize="titleSize" onClick={moveToCreate}>
          <AddCircle style={{height: '50px', width: '50px'}}/>
        </Button> */}
        {
          isLogin ? <MoreButton onClick={moveToCreate}/> : null
        }
        {/* <MoreButton onClick={moveToCreate}/> */}
      </AddRoomArea>
      <Div mt={3}></Div>
    </StyledHome>
  );
};

export default Home;