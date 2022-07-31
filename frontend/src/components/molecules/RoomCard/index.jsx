import React from 'react';
import styled, {css} from 'styled-components';
import Text from '../../atoms/Text'
import Image from '../../atoms/Image'
import ViewerNum from '../ViewerNum';

const StyledRoomCard = styled.div`
  ${({theme}) => theme.flex.columnCenter}
  width: 8rem;
  height: 13rem;
  border-radius: 0.6rem;
  background-image: url(${({url}) => url});
  background-size: cover;
  flex-shrink: 0;
`
const CardHeader = styled.div`
  ${({theme}) => theme.flex.rowCenter}
  justify-content: flex-start;
  width: 100%;
  height: 2rem;
  padding-left: 0.2rem;
  gap: 0.2rem;
  background: rgb(0, 0, 0, 0.4);
  border-radius: 0.6rem 0.6rem 0 0;
`
const CardBody = styled.div`
  height: 9rem;
`
const CardFooter = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;
  height: 2rem;
`
const RoomCard = ({ profileImg, thumnail, headerSize, title, num, ...rest}) => {
  return (
    <StyledRoomCard url={thumnail}>
      <CardHeader>
        <Image src={profileImg} alt='profileImage' size={headerSize} />
        <Text color='white' fontSize={headerSize}>{title}</Text>
      </CardHeader>
      <CardBody />
      <CardFooter>
        <ViewerNum color='white' {...rest}>{num}</ViewerNum>
      </CardFooter>
    </StyledRoomCard>
  );
}

export default RoomCard;

// RoomCard.defaultProps = {
//   size: 'xl',
//   color: 'black',
//   weight: 'bold',
// }