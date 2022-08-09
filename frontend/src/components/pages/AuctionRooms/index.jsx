import React, { useEffect, useState } from 'react';
import logo from '../../../assets/로고.svg';
import styled from 'styled-components';
import Navbar from '../../molecules/Navbar';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import Textarea from '../../atoms/Textarea';
import CreateItemCard from '../../molecules/CreateItemCard';
import { useNavigate } from 'react-router-dom';
import move from '../../../common/move';
import SearchBar from '../../molecules/SearchBar';
import { useInfiniteQuery } from '@tanstack/react-query';
import getAuctionRooms from './getAuctionRooms';
import { useInView } from 'react-intersection-observer';
import RoomCard from '../../molecules/RoomCard';

const StyledAuctionRooms = styled.div`
  // overflow-y: auto;
`;
const FlexSearchArea = styled.div`
  ${({ theme }) => theme.flex.rowCenter}
  height: 5rem;
`;
const SearchArea = styled.div`
  width: 90%;
`;
const CardArea = styled.div`
  ${({ theme }) => theme.flex.rowCenter}
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 1rem 2rem;
`;
const EachCard = styled.div`
  width: 40%;
`;

const AuctionRooms = () => {
  const [ref, inView] = useInView();
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['auctionRooms'],
    ({ pageParam = 0 }) => getAuctionRooms(pageParam),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.nextPage : undefined,
    }
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (status === 'loading') return <div>대기중이에용</div>;
  if (status === 'error') return <div>에러에용</div>;
  const { pages } = data;
  return (
    <StyledAuctionRooms>
      <Navbar url={logo} isLogin imgSize="xs" fontSize="sm" mode="graytext" />
      <FlexSearchArea>
        <SearchArea>
          <SearchBar />
        </SearchArea>
      </FlexSearchArea>
      <CardArea>
        {pages.map(({ content }, idx1) =>
          content.map((data, idx2) => {
            const {
              id,
              ownerName,
              ownerPicture,
              auctionRoomTitle,
              auctionRoomThumbnail,
              auctionRoomDescription
            } = data;
            const props = {
              id,
              ownerName,
              ownerPicture,
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
        )}d
      </CardArea>
      {isFetchingNextPage ? <div>Loading...</div> : <div ref={ref}></div>}
    </StyledAuctionRooms>
  );
};

export default AuctionRooms;
