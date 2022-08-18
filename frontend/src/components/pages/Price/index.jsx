import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import DatePicker from "../../molecules/DatePicker";
import Button from "../../atoms/Button";
import get_price from './get_price';
import Navbar from '../../molecules/Navbar';
import Table from './Table';
import styled from 'styled-components';
import Text from '../../atoms/Text';
import logo from '../../../assets/로고.svg';
import Chart from './Chart';
import SelectBox from '../../atoms/SelectBox';
import moment from 'moment';
import theme from '../../../common/theme';
import { useDispatch } from 'react-redux';
import reissue from '../../../common/reissue';

const SELECT_OPTIONS = [
  '배추', '무', '감자', '고구마', '당근', '오이', '토마토',
]

const PRODUCT_OPTIONS = {
  "배추" : "211",
  "무" : "231",
  "감자" : "152",
  "고구마" :"151",
  "당근" : "232",
  "오이" : "223",
  "토마토" : "225",
}

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

const SearchBtn = styled.button`
  all: unset;
  cursor: pointer;
  background-color: ${theme.colors.green3};
  color: white;
  width: 40%;
  height: 2.5rem;
  text-align: center;
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  border-radius: 1rem;
`

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SelectArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem 1.5rem;
  gap: 1rem;
`

const ChartArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2rem 0.2rem;
  background-color: white;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  gap: 2rem;
`

const TitleDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0;
`

const Price = () => {
  
  const [priceData, setPriceData] = useState(null);
  
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [pickedProduct, setPickedProduct] = useState('-- 농산물 선택 --');

  const [productName, setProductName] = useState('')

  const searchPrice = async () => {
    console.log(date, pickedProduct);
    setPriceData(await get_price(date, PRODUCT_OPTIONS[pickedProduct]));
    setProductName(pickedProduct);
  }

  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('isLogin')) {
      reissue(dispatch);
    }
  }, [dispatch]);
  
  return (
    <>    
    <Navbar navigate={navigate} isLogin={isLogin} setIsLogin={setIsLogin} />
    <Layout>
      <DatePicker setValue={setDate}></DatePicker>
      <SelectArea>
        <SelectBox options={SELECT_OPTIONS} labelText={pickedProduct} setValue={setPickedProduct}/>
        <SearchBtn onClick={searchPrice}>조회</SearchBtn>
      </SelectArea>
      
      {priceData ? 
        <ChartArea>
          <Text size="lg" weight="bold">[{productName}] 일주일 간 평균가 변화</Text>
          {/* <Table price={priceData.price}/> */}
          <Chart priceData={priceData} product={productName}></Chart>
        </ChartArea> 
        : <ChartArea>선택된 정보가 없습니다</ChartArea>}   
    </Layout>
    </>
  );
}

export default Price;