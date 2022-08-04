import styled from 'styled-components';
import Text from '../../atoms/Text';
import theme from '../../../common/theme';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CardTop = styled.div`
  width: 10rem;
  height: 8rem;
  border: 1px solid ${theme.colors.gray2};
  border-radius: 0.5rem 0.5rem 0 0;
  background-image: url('/assets/농산물그림/${({product}) => product}.png');
  background-size: 50%;
  background-position: center;
  padding:1rem;
  background-repeat: no-repeat;
`

const CardBottom = styled.div`
  width: 10rem;
  height: auto;
  border: 1px solid ${theme.colors.gray2};;
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const NameBox = styled.div`
  display: inline-flex;
  padding: 0.2rem 0.5rem 0.2rem 0.5rem;
  background-color: ${theme.colors.yellow};
  border-radius: 0.8rem;
  justify-content: center;
  align-items: center;
`

const RowFlex = styled.div`
  display: flex;
`

const directionIcon = (direction) => {
  if (direction === '0') {
    return (<><KeyboardArrowDownIcon style={{color: theme.colors.green5}}/></>);
  }
  else if (direction === '1') {
    return (<><KeyboardArrowUpIcon style={{color: theme.colors.red}}/></>);
  }
  else if (direction === '2') {
    return (<></>);
  }
}

const MainPriceCard = ({name, price, unit, direction, value}) => {
  return (
    <>
      <CardTop product={name}/>
      <CardBottom>
        <NameBox>
          <Text>{name}</Text>
        </NameBox>
        <Text color="white">{price} 원 / {unit}</Text>
        <RowFlex>
          {directionIcon(direction)}
          <Text size="sm">({value}%)</Text>
        </RowFlex>
      </CardBottom>
    </>
  );
}

MainPriceCard.defaultProps = {
  name: '배추',
  price: '10226',
  unit: '1포기',
  direction: '1',
  value: '3.1',
}

export default MainPriceCard;