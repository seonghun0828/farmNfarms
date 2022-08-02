import React from 'react';
import styled, {css} from 'styled-components';
import Text from '../../atoms/Text'
import Image from '../../atoms/Image'
import ViewerNum from '../ViewerNum';

const CardArea = styled.div`
  width: 8rem;
`
const StyledRoomCard = styled.div`
  ${({theme}) => theme.flex.columnCenter}
  width: 8rem;
  height: 13rem;
  border-radius: 0.6rem;
  background-image: url(${({url}) => url});
  background-size: cover;
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
const Tags = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  gap: 0.5rem;
  overflow-x: hidden;
`
const Tag = styled.div`
  ${({theme}) => theme.flex.rowCenter}
  width: 100%;
  height: 1rem;
  background-color: ${({theme}) => theme.colors.green3};
  border-radius: 0.5rem;
  font-weight: bold;
`
const RoomCard = ({ profileImg, thumnail, headerSize, title, description, tags, num, ...rest}) => {
  if (description.length > 14)
    description = description.substring(0, 14) + '...';
  return (
    <CardArea>
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
      <Text color='black' fontSize={headerSize}>{description}</Text>
      <Tags>
        {tags.map((tag, idx) => {
          if (idx < 3)
            return (
              <Tag>
                <Text color='black' fontSize={headerSize} key={tag + idx}>{tag}</Text>
              </Tag>
            )
        }
        )}
      </Tags>
    </CardArea>
  );
}

export default RoomCard;

// RoomCard.defaultProps = {
//   size: 'xl',
//   color: 'black',
//   weight: 'bold',
// }