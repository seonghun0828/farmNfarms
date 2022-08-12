import React, { useEffect, useState } from 'react';
import logo from '../../../assets/로고.svg';
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

const StyledHome = styled.div``;
const FlexSearchArea = styled.div`
  ${({ theme }) => theme.flex.rowCenter}
  height: 4.5rem;
`;
const SearchArea = styled.div`
  width: 90%;
`;
const RoomCardArea = styled.div`
  height: 16rem;
`;

const MarketPriceArea = styled.div`
  height: 6rem;
`;

const SectionTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0.6rem 1rem 0.6rem;
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
  background-size: 50%;
  background-position: center;
  background-image: url('/assets/video-camera.svg');
  background-color: ${theme.colors.green3};
  padding: 2rem;
  width: 3rem;
  height: 3rem;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
`

const Home = () => {
  const navigate = useNavigate();

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
  }, []);

  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));

  return (
    <StyledHome>
      <Navbar url={logo} navigate={navigate} isLogin={isLogin} setIsLogin={setIsLogin} imgSize="sm" fontSize="sm" mode="blacktext" />
      <FlexSearchArea>
        <SearchArea>
          <SearchBar value={keyword} setKeyword={setKeyword} SearchKey={SearchKey}/>
        </SearchArea>
      </FlexSearchArea>
      <SectionTitle>
        <Text fontSize="xxl" weight="bold">
          빨리 들어와유
        </Text>
        <MoreInfo>
          <Button mode="graytext" fontSize="md" fontWeight="normal" onClick={moveToAuctionRooms}>
            전체보기
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
        : <div>isLoading</div>} 
      {/* isLoading 말고 좋은거 없나 시청자수 가져올 수 있는지 물어보기*/}
      </RoomCardArea>
      <Div mt={3.5}/>
      <SectionTitle>
        <Text fontSize="xxl" weight="bold">
          농산물 시세
        </Text>
        <MoreInfo>
          <Button mode="graytext" fontSize="md" fontWeight="normal" onClick={moveToPrice}>
            전체보기
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
        </AutoCarousel> : <div>isLoading</div>}
      </MarketPriceArea>
      <AddRoomArea>
        {/* <Button mode="graytext" fontSize="lg" onClick={() => window.alert(localStorage.getItem('isLogin'))}>
          로컬스토리지 테스트 버튼
        </Button>
        <Button mode="graytext" fontSize="titleSize" onClick={moveToCreate}>
          <AddCircle style={{height: '50px', width: '50px'}}/>
        </Button> */}
        <MoreButton onClick={moveToCreate}/>
      </AddRoomArea>
      <Div mt={3}></Div>
    </StyledHome>
  );
};

export default Home;