import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import DatePicker from "../../molecules/DatePicker";
import Button from "../../atoms/Button";
import dayjs from "dayjs";
import Select from '../../atoms/Select';
import get_price from './get_price';
import Navbar from '../../molecules/Navbar';
import Table from './Table'
import Text from '../../atoms/Text';
import logo from '../../../assets/로고.svg';
// import Graph from './Graph';

const EXAMPLE_OPTIONS = [
  { value: "211", name: "배추" },
  { value: "231", name: "무" },
  { value: "152", name: "감자" },
  { value: "151", name: "고구마" },
  { value: "232", name: "당근" },
  { value: "223", name: "오이" },
  { value: "225", name: "토마토" },
];

const Price = () => {
  const [date, setDate] = useState(Date);
  const [pickedProduct, setPickedProduct] = useState({'product':''});
  // Select가 앞에서 여러 input의 상태관리로 쓰여서 object로 만들어줘야함 흠...

  const [priceData, setPriceData] = useState(null);

  const searchPrice = async () => {
    const dateFormat = dayjs(date).format("YYYY-MM-DD");
    console.log(dateFormat, pickedProduct.product);
    setPriceData(await get_price(dateFormat, pickedProduct.product));
    // console.log(priceData)
  }

  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));
  const navigate = useNavigate();
  
  return (
    <div>
      <Navbar url={logo} navigate={navigate} isLogin={isLogin} setIsLogin={setIsLogin} imgSize="xs" fontSize="sm" mode="graytext" />
      <DatePicker date={date} setDate={setDate} />
      <Select defaultValue={pickedProduct.product ? pickedProduct.product : '농산물 선택'} options={EXAMPLE_OPTIONS} setValue={setPickedProduct} name="product"/>
      <Button onClick={searchPrice}>검색</Button>
      
      {priceData ? 
      <div>
        <Text size="lg" weight="bold">{priceData.product}의 최근 가격 추이</Text>
        <Table price={priceData.price}/>
        <div style={{width: '100%', height: '50vh'}}>
          {/* <Graph priceData={priceData}/> */}
        </div>
      </div> : <div>선택된 정보가 없습니다</div>}
    </div>
  );
}

export default Price;