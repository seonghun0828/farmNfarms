import React, { useEffect, useState } from 'react';
import logo from '../../../assets/로고.svg';
import styled from 'styled-components';
import Navbar from '../../molecules/Navbar';
import SearchBar from '../../molecules/SearchBar';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import Carousel from '../../molecules/Carousel';
import RoomDetailModal from '../../molecules/RoomDetailModal';
import { useNavigate } from 'react-router-dom';
import move from '../../../common/move'
import MainPriceCard from '../../molecules/MainPriceCard';
import main_price from './main_price'
import RoomCard from '../../molecules/RoomCard';
import AutoCarousel from '../../molecules/AutoCarousel';

const StyledHome = styled.div``;
const FlexSearchArea = styled.div`
  ${({ theme }) => theme.flex.rowCenter}
  height: 5rem;
`;
const SearchArea = styled.div`
  width: 90%;
`;
const RoomCardArea = styled.div`
  height: 25rem;
`;
const MarketPriceArea = styled.div`
  height: 10rem;
`;

const MoreInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 1rem;
`;
const AddRoomArea = styled.div`
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

const EXAMPLE_ROOM_INFOS = [
  {
    profileImg: logo,
    headerSize: 'xxs',
    viewerSize: 'sm',
    title: '1',
    description: '고랭지 배추 팔아유~아주 맛나유',
    tags: ['존맛', '배추', '고랭지', '평창'],
    num: '13',
    thumnail: 'https://img.seoul.co.kr//img/upload/2020/07/22/SSI_20200722215818.jpg' 
  },
  {
    profileImg: logo,
    headerSize: 'xxs',
    viewerSize: 'sm',
    title: '2',
    description: '고랭지 배추 팔아유~아주 맛나유',
    tags: ['존맛', '배추', '고랭지', '평창'],
    num: '13',
    thumnail: 'https://img.seoul.co.kr//img/upload/2020/07/22/SSI_20200722215818.jpg' 
  },
  {
    profileImg: logo,
    headerSize: 'xxs',
    viewerSize: 'sm',
    title: '3',
    description: '고랭지 배추 팔아유~아주 맛나유',
    tags: ['존맛', '배추', '고랭지', '평창'],
    num: '13',
    thumnail: 'https://img.seoul.co.kr//img/upload/2020/07/22/SSI_20200722215818.jpg' 
  },
  {
    profileImg: logo,
    headerSize: 'xxs',
    viewerSize: 'sm',
    title: '배추아저씨',
    description: '고랭지 배추 팔아유~아주 맛나유',
    tags: ['존맛', '배추', '고랭지', '평창'],
    num: '13',
    thumnail: 'https://img.seoul.co.kr//img/upload/2020/07/22/SSI_20200722215818.jpg' 
  },
  {
    profileImg: logo,
    headerSize: 'xxs',
    viewerSize: 'sm',
    title: '배추아저씨',
    description: '고랭지 배추 팔아유~아주 맛나유',
    tags: ['존맛', '배추', '고랭지', '평창'],
    num: '13',
    thumnail: 'https://img.seoul.co.kr//img/upload/2020/07/22/SSI_20200722215818.jpg' 
  },
  {
    profileImg: logo,
    headerSize: 'xxs',
    viewerSize: 'sm',
    title: '배추아저씨',
    description: '고랭지 배추 팔아유~아주 맛나유',
    tags: ['존맛', '배추', '고랭지', '평창'],
    num: '13',
    thumnail: 'https://img.seoul.co.kr//img/upload/2020/07/22/SSI_20200722215818.jpg' 
  },
]

const Home = () => {
  const navigate = useNavigate();
  const [isOnModal, setIsOnModal] = useState(false);
 
  const openModal = () => {
    setIsOnModal(true);
  }
  
  const closeModal = () => {
    setIsOnModal(false);
  }

  const moveToCreate = () => {
    move(navigate, 'create');
  }
  const moveToAuctionRooms = () => {
    move(navigate, 'auctionrooms');
  }

  const moveToPrice = () => {
    move(navigate, 'price');
  }

  const [priceItems, setPriceItems] = useState(null);
  const getMainPrice = async () => {
    setPriceItems(await main_price());
  }

  const Slide = styled.div`
  width: 200px;
  height: 100px;
  border: 1px solid red;
  flex-shrink: 0;
`

  useEffect(() => {
    getMainPrice();
  }, []);

  // 모달 열기 버튼은 임시~~
  return (
    <StyledHome>
      {/* <Button onClick={openModal}>모달열기</Button> 
      {isOnModal && <RoomDetailModal
        closeModal={closeModal}
        title="고랭지 배추 팔아유" 
        description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut pariatur, hic, eveniet ipsam totam dolorum commodi nostrum dolorem sapiente fuga eum? Asperioabsdbsdfs;ldcms,dlfma;lsdmfdsjfmweofmnskldfmlksd아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아 libero, excepturi hic sit nesciunt nisi suscipit cum!"
      />} */}
      <Navbar url={logo} isLogin imgSize="xs" fontSize="sm" mode="graytext" />
      <FlexSearchArea>
        <SearchArea>
          <SearchBar />
        </SearchArea>
      </FlexSearchArea>
      <RoomCardArea>
        <Text fontSize="xl" weight="bold">
          빨리 들어와유
        </Text>
        <MoreInfo>
          <Button mode="highlight" fontSize="sm" onClick={moveToAuctionRooms}>
            더보기
          </Button>
        </MoreInfo>
        <Carousel>
          {EXAMPLE_ROOM_INFOS.map((roominfo, index) => (
            <Div pl={0.5} pr={0.5} key={index}>
              <RoomCard {...roominfo}/>
            </Div>))
          }
        </Carousel>
      </RoomCardArea>
      <MarketPriceArea>
        <Text fontSize="xl" weight="bold">
          농산물 시세
        </Text>
        <MoreInfo>
          <Button mode="highlight" fontSize="sm" onClick={moveToPrice}>
            더보기
          </Button>
        </MoreInfo>
        {priceItems ?         
        <AutoCarousel slideLength={10}>
          {priceItems.map((priceItem, index) => (
            <MainPriceCard {...priceItem} key={index}></MainPriceCard>
          ))}            
        </AutoCarousel> : <div>isLoading</div>}
      </MarketPriceArea>
      <AddRoomArea>
        <Button mode="graytext" fontSize="titleSize" onClick={moveToCreate}>
          ⨁
        </Button>
      </AddRoomArea>
    </StyledHome>
  );
};

export default Home;