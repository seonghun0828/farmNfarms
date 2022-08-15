import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import DatePicker from "../../molecules/DatePicker";
import Button from "../../atoms/Button";
import dayjs from "dayjs";
import Select from '../../atoms/Select';
import get_price from './get_price';
import Navbar from '../../molecules/Navbar';
import Table from './Table';
import styled from 'styled-components';
import Text from '../../atoms/Text';
import logo from '../../../assets/로고.svg';
import Chart from './Chart';
import SelectBox from '../../atoms/SelectBox';
// import Graph from './Graph';

// const SELECT_OPTIONS = [
//   { value: "211", name: "배추" },
//   { value: "231", name: "무" },
//   { value: "152", name: "감자" },
//   { value: "151", name: "고구마" },
//   { value: "232", name: "당근" },
//   { value: "223", name: "오이" },
//   { value: "225", name: "토마토" },
// ];

const SELECT_OPTIONS = [
  '배추', '무', '감자', '고구마', '당근', '오이', '토마토'
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

const SelectDiv = styled.div`
  width: 70%;
`

const Price = () => {
  
  const [priceData, setPriceData] = useState(null);
  
  const [date, setDate] = useState(Date);
  const [pickedProduct, setPickedProduct] = useState('-- 농산물 선택 --');

  const [productName, setProductName] = useState('')

  const searchPrice = async () => {
    const dateFormat = dayjs(date).format("YYYY-MM-DD");
    console.log(dateFormat, pickedProduct);
    setPriceData(await get_price(dateFormat, PRODUCT_OPTIONS[pickedProduct]));
    setProductName(pickedProduct);
  }

  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));
  const navigate = useNavigate();
  
  return (
    <div>
      <Navbar url={logo} navigate={navigate} isLogin={isLogin} setIsLogin={setIsLogin} imgSize="xs" fontSize="sm" mode="graytext" />
      <DatePicker date={date} setDate={setDate} />
      <SelectBox options={SELECT_OPTIONS} labelText={pickedProduct} setValue={setPickedProduct}/>
      <Button onClick={searchPrice}>검색</Button>
      
      {priceData ? 
      <div>
        <Text size="lg" weight="bold">{productName}의 최근 가격 추이</Text>
        {/* <Table price={priceData.price}/> */}
        <Div pl={0.5} pr={0.5}>
          <Chart priceData={priceData} product={productName}></Chart>
        </Div>
      </div> : <div>선택된 정보가 없습니다</div>}
      
    </div>
  );
}

export default Price;