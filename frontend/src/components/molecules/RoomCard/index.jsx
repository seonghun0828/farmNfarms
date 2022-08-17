import { useState } from 'react';
import styled from 'styled-components';
import roomDetail from './roomDetail';
import RoomDetailModal from '../../molecules/RoomDetailModal';
import TextEllipsis from '../../atoms/TextEllipsis';
import LiveTag from '../../atoms/LiveTag';

const Card = styled.div`
  position: relative;
  width: 10rem;
  height: 16rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1.2rem;
  background-image: url('${({thumbnail}) => thumbnail}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`

const CardBottom = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 0 0 1.2rem 1.2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const OwnerPicture = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.3);
  background-image: url('${({thumbnail}) => thumbnail}');
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  flex-shrink: 0;
  margin: 0 0.3rem 0 0.2rem;
`

const ColoumFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 3rem;
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
`;

const RoomCard = ({ id, auctionRoomThumbnail, auctionRoomTitle, auctionRoomDescription, ownerName, ownerPicture, ownerPhoneNumber }) => {
  const [isOnModal, setIsOnModal] = useState(false);
  const [roomDetailInfo, setRoomDetailInfo] = useState(null);
  const openModal = () => {
    setIsOnModal(true);
  }
  
  const closeModal = () => {
    setIsOnModal(false);
  }

  const getRoomDetail = async () => {
    setRoomDetailInfo(await roomDetail(id));
  }

  const clickHandler = () => {
    getRoomDetail();
    // console.log(roomDetailInfo);
    openModal();
  }

  return (
    <Card onClick={clickHandler} thumbnail={auctionRoomThumbnail}>
      {isOnModal && <RoomDetailModal
        closeModal={closeModal}
        title={auctionRoomTitle}
        description={auctionRoomDescription}
        items={roomDetailInfo}
        roomId={id}
        ownerPhone={ownerPhoneNumber}
      />}
      <Div pt={0.5} pl={0.5}>
        <LiveTag/>
      </Div>
      <CardBottom>
        <OwnerPicture thumbnail={ownerPicture}/>
        <ColoumFlex>
          <TextEllipsis color="white" width="100px" weight="bold" fontSize="lg">
            {auctionRoomTitle}
          </TextEllipsis>
          <TextEllipsis color="white" width="100px" fontSize="sm">{ownerName}</TextEllipsis>
        </ColoumFlex>
      </CardBottom> 
    </Card>
  );
}

// const EXAMPLE_ROOM_INFOS = [
//   {
//     auctionRoomThumbnail: 'https://img.seoul.co.kr//img/upload/2020/07/22/SSI_20200722215818.jpg',
//     auctionRoomTitle: '배추팔아유',
//     id: '1',
//     ownerName: '이왕득',
//     ownerPicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCF_Yq1ebm0rHdPc7_StrJUCVui19rv8a-Q&usqp=CAU',
//   },
//   {
//     auctionRoomThumbnail: 'https://img.seoul.co.kr//img/upload/2020/07/22/SSI_20200722215818.jpg',
//     auctionRoomTitle: '배추팔아유',
//     id: '1',
//     ownerName: '이왕득',
//     ownerPicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCF_Yq1ebm0rHdPc7_StrJUCVui19rv8a-Q&usqp=CAU',
//   },
//   {
//     auctionRoomThumbnail: 'https://img.seoul.co.kr//img/upload/2020/07/22/SSI_20200722215818.jpg',
//     auctionRoomTitle: '배추팔아유',
//     id: '1',
//     ownerName: '이왕득',
//     ownerPicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCF_Yq1ebm0rHdPc7_StrJUCVui19rv8a-Q&usqp=CAU',
//   },
//   {
//     auctionRoomThumbnail: 'https://img.seoul.co.kr//img/upload/2020/07/22/SSI_20200722215818.jpg',
//     auctionRoomTitle: '배추팔아유',
//     id: '1',
//     ownerName: '이왕득',
//     ownerPicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCF_Yq1ebm0rHdPc7_StrJUCVui19rv8a-Q&usqp=CAU',
//   },
//   {
//     auctionRoomThumbnail: 'https://img.seoul.co.kr//img/upload/2020/07/22/SSI_20200722215818.jpg',
//     auctionRoomTitle: '배추팔아유',
//     id: '1',
//     ownerName: '이왕득',
//     ownerPicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCF_Yq1ebm0rHdPc7_StrJUCVui19rv8a-Q&usqp=CAU',
//   },
//   {
//     auctionRoomThumbnail: 'https://img.seoul.co.kr//img/upload/2020/07/22/SSI_20200722215818.jpg',
//     auctionRoomTitle: '배추팔아유',
//     id: '1',
//     ownerName: '이왕득',
//     ownerPicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCF_Yq1ebm0rHdPc7_StrJUCVui19rv8a-Q&usqp=CAU',
//   },
// ]

// RoomCard.defaultProps = {
//   ...EXAMPLE_ROOM_INFOS,
// }

export default RoomCard;