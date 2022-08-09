import React, { useEffect, useState } from 'react';
import logo from '../../../assets/로고.svg';
import styled from 'styled-components';
import Navbar from '../../molecules/Navbar';
import SearchBar from '../../molecules/SearchBar';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import Carousel from '../../molecules/Carousel';
import { useNavigate } from 'react-router-dom';
import move from '../../../common/move'
import MainPriceCard from '../../molecules/MainPriceCard';
import main_price from './main_price'
import RoomCard from '../../molecules/RoomCard';
import AutoCarousel from '../../molecules/AutoCarousel';
import room_infos from './room_infos';
import { AddCircle } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const StyledHome = styled.div``;
const FlexSearchArea = styled.div`
  ${({ theme }) => theme.flex.rowCenter}
  height: 5rem;
`;
const SearchArea = styled.div`
  width: 90%;
`;
const RoomCardArea = styled.div`
`;
const MarketPriceArea = styled.div`
  margin-top: 1rem;
`;

const SectionTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem 0.5rem 0.5rem;
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
  padding-right: 1rem;
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

  useEffect(() => {
    getMainPrice();
    getRoomInfos();
    console.log(roomInfos);
  }, []);

  return (
    <StyledHome>
      <Navbar url={logo} isLogin imgSize="xs" fontSize="sm" mode="graytext" />
      <FlexSearchArea>
        <SearchArea>
          <SearchBar />
        </SearchArea>
      </FlexSearchArea>
      <RoomCardArea>
        <SectionTitle>
          <Text fontSize="xl" weight="bold">
            빨리 들어와유
          </Text>
          <MoreInfo>
            <Button mode="graytext" fontSize="md" fontWeight="" onClick={moveToAuctionRooms}>
              더보기
            </Button>
          </MoreInfo>
        </SectionTitle>
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
      <MarketPriceArea>
        <SectionTitle>
          <Text fontSize="xl" weight="bold">
            농산물 시세
          </Text>
          <MoreInfo>
            <Button mode="graytext" fontSize="md" onClick={moveToPrice}>
              더보기
            </Button>
          </MoreInfo>
        </SectionTitle>
        {priceItems ?         
        <AutoCarousel slideLength={10}>
          {priceItems.map((priceItem, index) => (
            <MainPriceCard {...priceItem} key={index}></MainPriceCard>
          ))}            
        </AutoCarousel> : <div>isLoading</div>}
      </MarketPriceArea>
      <AddRoomArea>
        <Button mode="graytext" fontSize="titleSize" onClick={moveToCreate}>
          <AddCircle style={{height: '50px', width: '50px'}}/>
        </Button>
      </AddRoomArea>
    </StyledHome>
  );
};

export default Home;