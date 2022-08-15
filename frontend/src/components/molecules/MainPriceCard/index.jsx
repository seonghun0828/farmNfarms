import styled, {css} from 'styled-components';
import Text from '../../atoms/Text';
import theme from '../../../common/theme';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RemoveIcon from '@mui/icons-material/Remove';

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
  border: 1px solid ${theme.colors.gray2};
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

const PriceInfoFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`

const TotalInfoFlex = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-around;
`

const ImageBox = styled.div`
  width: 30%;
  height: 6rem;
  background-image: url('/assets/농산물그림/${({product}) => product}.png');
  background-size: 45%;
  background-position: center;
  background-repeat: no-repeat;
`

const Card = styled.div`
  width: 20rem;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid ${theme.colors.gray3};
  border-radius: 0.5rem;
`

const directionIcon = (direction) => {
  if (direction === '0') {
    return (<><KeyboardArrowDownIcon style={{color: theme.colors.green5}}/></>);
  }
  else if (direction === '1') {
    return (<><KeyboardArrowUpIcon style={{color: theme.colors.red}}/></>);
  }
  else if (direction === '2') {
    return (<><RemoveIcon/></>);
  }
}

// const TextColor = (direction) => {
//   if (direction === '0') {
//     return (css`color: ${theme.colors.green5}`);
//   }
//   else if (direction === '1') {
//     return (css`color: ${theme.colors.red}`);
//   }
//   else if (direction === '2') {
//     return (css`color: ${theme.colors.black}`);
//   }
// }

// const MainPriceCard = ({name, price, unit, direction, value}) => {
//   return (
//     <div style={{flexShrink: 0}}>
//       <CardTop product={name}/>
//       <CardBottom>
//         <NameBox>
//           <Text>{name}</Text>
//         </NameBox>
//         <Text color="white">{price} 원 / {unit}</Text>
//         <RowFlex>
//           {directionIcon(direction)}
//           <Text size="sm">({value}%)</Text>
//         </RowFlex>
//       </CardBottom>
//     </div>
//   );
// }

const MainPriceCard = ({name, price, unit, direction, value}) => {
  return (
    <Card style={{flexShrink: 0}}>
      <ImageBox product={name}/>
      <TotalInfoFlex> 
        <Text size="xxl" weight="bold">{name}</Text>
        <PriceInfoFlex>
          <Text size="xxl">{price} 원 / {unit}</Text>
          <RowFlex>
            {directionIcon(direction)}
            <Text size="lg">({value}%)</Text>
          </RowFlex>
        </PriceInfoFlex>
      </TotalInfoFlex>
    </Card>
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