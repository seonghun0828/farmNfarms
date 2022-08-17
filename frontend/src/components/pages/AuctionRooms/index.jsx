import React, { useEffect, useState, useRef } from 'react';
import logo from '../../../assets/로고.svg';
import styled from 'styled-components';
import Navbar from '../../molecules/Navbar';
import { useNavigate, createSearchParams, useLocation, useSearchParams } from 'react-router-dom';
import SearchBar from '../../molecules/SearchBar';
import { useInfiniteQuery } from '@tanstack/react-query';
import getAuctionRooms from './getAuctionRooms';
import { useInView } from 'react-intersection-observer';
import RoomCard from '../../molecules/RoomCard';
import { LocalRecorder } from 'openvidu-browser';
import searchAuctionRooms from './searchAuctionRooms';
import Text from '../../atoms/Text';
import { useDispatch } from 'react-redux';
import reissue from '../../../common/reissue';

const StyledAuctionRooms = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  margin: 1rem 0;
  gap: 1.5rem;
`;

const SearchArea = styled.div`
  width: 95%;
  padding-left: 5%;
`;
const CardArea = styled.div`
  ${({ theme }) => theme.flex.rowCenter}
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
const EachCard = styled.div`
  margin-bottom: 1rem;
`;

const AuctionRooms = () => {

// 검색하면 quert 바꾸는 애들-----------------------
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {pathname, state} = useLocation();
  const [searchParams] = useSearchParams();
  
  const [keyword, setKeyword] = useState(state && state.keyword ? state.keyword : '');
  const [params, setParams] = useState(state && state.params ? state.params : {});

  const SearchKey = () => {
    if(keyword) {
      setParams({key: keyword,});
    } else {
      setParams({});
    }
  }
  useEffect(() => {
    navigate({
      pathname: pathname,
      search: `${decodeURI(createSearchParams(params))}`,  // decodeURI : 한글 깨짐 방지
    })
  }, [params]);

// ------------------------------------------------

  const [query, setQuery] = useState(null);

  useEffect(() => {
    setQuery(searchParams.get('key'));
  }, [searchParams.get('key')])
//--------------------------------------------------

  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));

  const [ref, inView] = useInView();

  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [query],
    ({ pageParam = 0 }) => searchAuctionRooms(query, pageParam),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.nextPage : undefined,
    }
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  useEffect(() => {
    if (localStorage.getItem('isLogin')) {
      reissue(dispatch);
    }
  }, [dispatch]);

  if (status === 'loading') return <div>대기중이에용</div>;
  if (status === 'error') return <div>에러에용</div>;
  const { pages } = data;

  return (
    <>
    <Navbar navigate={navigate} isLogin={isLogin} setIsLogin={setIsLogin} />
    <StyledAuctionRooms>
      <SearchArea>
        <SearchBar value={keyword} setKeyword={setKeyword} SearchKey={SearchKey}/>
      </SearchArea>
      <CardArea>
        {pages.map(({ content }, idx1) =>
          content.map((data, idx2) => {
            const {
              id,
              ownerName,
              ownerPicture,
              ownerPhoneNumber,
              auctionRoomTitle,
              auctionRoomThumbnail,
              auctionRoomDescription
            } = data;
            const props = {
              id,
              ownerName,
              ownerPicture,
              ownerPhoneNumber,
              auctionRoomTitle,
              auctionRoomThumbnail,
              auctionRoomDescription

            };
            return (
              <EachCard key={auctionRoomTitle + idx1 + idx2}>
                <RoomCard {...props} key={auctionRoomTitle + idx1 + idx2} />
              </EachCard>
            );
          })
        )}
      </CardArea>
      {isFetchingNextPage ? <div>Loading...</div> : <div ref={ref}></div>}
    </StyledAuctionRooms>
    </>
  );
};

export default AuctionRooms;
