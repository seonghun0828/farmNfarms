import React, { useState } from 'react';
import logo from '../../../assets/로고.svg'
import styled from 'styled-components';
import Navbar from '../../molecules/Navbar';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import Textarea from '../../atoms/Textarea';
import CreateItemCard from '../../molecules/CreateItemCard';
import { useNavigate } from 'react-router-dom';
import move from '../../../common/move'
import SearchBar from '../../molecules/SearchBar';

const StyledAuctionRooms = styled.div`
`
const FlexSearchArea = styled.div`
  ${({ theme }) => theme.flex.rowCenter}
  height: 5rem;
`;
const SearchArea = styled.div`
  width: 90%;
`;

const AuctionRooms = () => {
  return (
    <StyledAuctionRooms>
         <Navbar url={logo} isLogin imgSize="xs" fontSize="sm" mode="graytext" />
         <FlexSearchArea>
                <SearchArea>
                <SearchBar />
            </SearchArea>
        </FlexSearchArea>
    </StyledAuctionRooms>
  );
};

export default AuctionRooms;