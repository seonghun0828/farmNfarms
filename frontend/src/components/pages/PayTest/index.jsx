import {useState, useEffect} from 'react';
import Button from '../../atoms/Button';
import pay from "./pay";
import Image from '../../atoms/Image';
import image from './image'

const PayTest = () => {
  const [url, setUrl] = useState(null);
  const [idx, setIdx] = useState(null);

  const loadImage = async (idx) => {
    setUrl(await image(idx));
  }

  const clickHandler = () => {
    console.log(idx);
    loadImage(idx);
  }
  return (
    <>
      <Button onClick={() => {pay(0)}}>구매하기</Button>
      <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSslZdaQ2s0bkU7rbm3DcZkxsrejleSQAyG-O-JzXJ8Wg&s"/>
      <input onChange={(e) => {setIdx(e.target.value)}}></input>
      <button onClick={clickHandler}>전송</button>
      {url ? 
      <>
        {console.log('url 주소:', `file://${url.filePath}`)}
        <Image src={`file://${url.filePath}`}/> 
      </>
      : <div>url이 없다</div>}
    </>
  );
  }

export default PayTest;