import styled from 'styled-components';
import theme from '../../../common/theme'
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';

// width로 가로 길이 조절 / 디폴트는 92%
const ReadItemCard = ({imageUrl, product, quantity, grade, startingPrice, width}) => {
  return (
    <ItemBox width={width}>
      <ImageInfoFlexBox>
        <ImageBox>
          <Image src={imageUrl} alt="사진"/>
        </ImageBox>
        <ItemInfoFlexBox>
          <Text size="xl" weight="bold">{product}</Text>
          <InfosFlexBox>
            <InfoFlexBox>
              <Text color="gray2" size="lg" weight="bold">수량</Text>
              <Text size="md" weight="bold">{quantity}</Text>
            </InfoFlexBox>
            <InfoFlexBox>
              <Text color="gray2" size="lg" weight="bold">등급</Text>
              <Text size="md" weight="bold">{grade}</Text>
            </InfoFlexBox>
            <InfoFlexBox>
              <Text color="gray2" size="lg" weight="bold">경매시작가</Text>
              <Text size="md" weight="bold">{startingPrice}</Text>
            </InfoFlexBox>
          </InfosFlexBox>
        </ItemInfoFlexBox>
      </ImageInfoFlexBox>
    </ItemBox>
  );
}

const ItemBox = styled.div`
  width: ${({width}) => width};
  height: 8rem;
  border: 2px solid ${theme.colors.black};
  border-radius: 0.5rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
   margin-top: 1rem;
`;

const ImageBox = styled.div`
  width: 40%;
  height: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
  overflow: hidden;
`

const InfoFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const InfosFlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemInfoFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width:100%;
  height:100%;
  padding-left: 0.5rem;
  padding-right: 1rem;
`
const ImageInfoFlexBox = styled.div`
  display: flex;
  width:100%;
  height:90%;
  padding-left: 0.2rem;
`

ReadItemCard.defaultProps = {
  width: '92%',
}
export default ReadItemCard;