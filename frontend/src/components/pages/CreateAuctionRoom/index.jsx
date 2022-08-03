import React from 'react';
import RoomCard from '../../molecules/RoomCard';
import logo from '../../../assets/로고.svg';
import styled from 'styled-components';
import Navbar from '../../molecules/Navbar';
import SearchBar from '../../molecules/SearchBar';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import RoomDetailModal from '../../molecules/RoomDetailModal';
import Carousel from '../../molecules/Carousel';
import Input from '../../atoms/Input';
import Textarea from '../../atoms/Textarea';

const StyledCreateAuctionRoom = styled.div``;

const PageBody = styled.div`
    padding: 1.2rem;
`;
const TextInputs = styled.div`
    ${({theme}) => theme.flex.columnCenter}
    justify-content: space-around;
    height: 10rem;
`
const StyledInput = styled.div`
    width: 22rem;
`
const StyledTextarea = styled.div`
    width: 22rem;
`;

const CreateAuctionRoom = () => {
  return (
    <StyledCreateAuctionRoom>
      <Navbar url={logo} isLogin imgSize="xs" fontSize="sm" mode="graytext" />
      <PageBody>
        <Text weight='bold' fontSize='xxxl'>경매방 생성 페이지</Text>
        <TextInputs>
            <StyledInput>
                <Input height='2' placeholder='제목을 입력하세요' />
            </StyledInput>
            <StyledTextarea>
                <Textarea height='5' placeholder='내용을 입력하세요' />
            </StyledTextarea>
        </TextInputs>
      </PageBody>
    </StyledCreateAuctionRoom>
  );
};

export default CreateAuctionRoom;