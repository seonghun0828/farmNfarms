import React, { useEffect, useState } from 'react';
import logo from '../../../assets/temp_logo.png';
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

const PriceCardArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-item: center;
  align-content: space-evenly;
`

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
    move(navigate, '/create');
  }
  const moveToAuctionRooms = () => {
    move(navigate, 'auctionrooms');
  }

  const [priceItems, setPriceItems] = useState([]);
  const getMainPrice = async () => {
    setPriceItems(await main_price());
  }

  useEffect(() => {
    getMainPrice();
  }, []);

  // 모달 열기 버튼은 임시~~
  return (
    <StyledHome>
      <Button onClick={openModal}>모달열기</Button> 
      {isOnModal && <RoomDetailModal
        closeModal={closeModal}
        title="고랭지 배추 팔아유" 
        description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut pariatur, hic, eveniet ipsam totam dolorum commodi nostrum dolorem sapiente fuga eum? Asperioabsdbsdfs;ldcms,dlfma;lsdmfdsjfmweofmnskldfmlksd아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아 libero, excepturi hic sit nesciunt nisi suscipit cum!"
      />}
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
        <Carousel roominfos={EXAMPLE_ROOM_INFOS}/>
      </RoomCardArea>
      <MarketPriceArea>
        <Text fontSize="xl" weight="bold">
          농산물 시세
        </Text>
        <MoreInfo>
          <Button mode="highlight" fontSize="sm">
            더보기
          </Button>
        </MoreInfo>
        <PriceCardArea>
          {priceItems ?  priceItems.map((priceItem, index) => (
            <Div mt={1} key={index}>
              <MainPriceCard {...priceItem}></MainPriceCard>
            </Div>
          )) : <div>isLoading</div>}
        </PriceCardArea>
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