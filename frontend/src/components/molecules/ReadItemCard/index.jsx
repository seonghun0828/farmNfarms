import styled from 'styled-components';
import theme from '../../../common/theme'
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';

// width 조절가능하게 만들것 지금 왜 파라미터로 먹이는거 안먹히냘낭릳룸
const ReadItemCard = ({imageUrl, product, quantity, grade, startingPrice, width}) => {
  return (
    <Div mt={1}>
      <ItemBox width={width}>
        <ImageInfoFlexBox>
          <ImageBox imageUrl={imageUrl}/>
          <ItemInfoFlexBox>
            <Text size="xxxl" weight="bold">{product}</Text>
            <InfosFlexBox>
              <InfoFlexBox>
                <Text color="gray2" size="xxl" weight="bold">수량</Text>
                <Text size="xl" weight="bold">{quantity}</Text>
              </InfoFlexBox>
              <InfoFlexBox>
                <Text color="gray2" size="xxl" weight="bold">등급</Text>
                <Text size="xl" weight="bold">{grade}</Text>
              </InfoFlexBox>
              <InfoFlexBox>
                <Text color="gray2" size="xxl" weight="bold">경매시작가</Text>
                <Text size="xl" weight="bold">{startingPrice}</Text>
              </InfoFlexBox>
            </InfosFlexBox>
          </ItemInfoFlexBox>
        </ImageInfoFlexBox>
      </ItemBox>
    </Div>
  );
}

const ItemBox = styled.div`
  width: 28rem;
  height: 8rem;
  border: 2px solid ${theme.colors.black};
  border-radius: 0.5rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageBox = styled.div`
  width: 40%;
  height: 100%;
  border: 2px solid ${theme.colors.black};
  border-radius: 0.5rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
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
  width: '28rem',
}
export default ReadItemCard;