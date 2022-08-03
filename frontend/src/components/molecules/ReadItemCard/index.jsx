import styled from 'styled-components';
import theme from '../../../common/theme'
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';

const ItemBox = styled.div`
  width: 24rem;
  height: 8rem;
  border: 2px solid ${theme.colors.black};
  border-radius: 0.5rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

const ImageBox = styled.div`
  width: 7rem;
  height: 6rem;
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

const ReadItemCard = ({imageUrl, product, quantity, grade, startingPrice}) => {
  return (
    <Div mt={1}>
      <ItemBox>
        <ImageBox></ImageBox>
        <Text size="xl" weight="bold">배추</Text>
        <Text size="lg" weight="bold">수량</Text>
        <Text size="lg" weight="bold">1000kg</Text>
        <Text size="lg" weight="bold">등급</Text>
        <Text size="lg" weight="bold">최상</Text>
        <Text size="lg" weight="bold">경매시작가</Text>
        <Text size="lg" weight="bold">100000원</Text>
      </ItemBox>
    </Div>
  );
}

export default ReadItemCard;