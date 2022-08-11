import React, { useState } from 'react';
import logo from '../../../assets/로고.svg';
import styled from 'styled-components';
import Navbar from '../../molecules/Navbar';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import Image from "../../atoms/Image"
import Textarea from '../../atoms/Textarea';
import CreateItemCard from '../../molecules/CreateItemCard';
import { useNavigate } from 'react-router-dom';
import move from '../../../common/move'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import uploadFile from '../../../common/uploadFile';
import createAuctionRoom from './createAuctionRoom';
import { useSelector } from 'react-redux';

const StyledCreateAuctionRoom = styled.div``;

const PageBody = styled.div`
  ${({theme}) => theme.flex.columnCenter}
    padding: 1.2rem;
    height: 46rem;
`;
const FixedInputArea = styled.div`
  ${({theme}) => theme.flex.rowCenter}
  justify-content: space-between;
  gap: 0.8rem;
`
const ImageArea = styled.div`
    width: 7.5rem;
    height: 10.5rem;
    `
const StyledImage = styled.div`
  width: 7.5rem;
  height: 10.5rem;
  border-radius: 0.5rem;
`
const ImageButton = styled.div`
  ${({theme}) => theme.flex.rowCenter}
  width: 7.5rem;
  height: 10.5rem;
  background-color: ${({theme}) => theme.colors.gray2};
  border-radius: 0.5rem;
`
const TextInputs = styled.div`
    ${({theme}) => theme.flex.columnCenter}
    justify-content: space-around;
    height: 12rem;
`
const StyledInput = styled.div`
    width: 14rem;
`
const StyledTextarea = styled.div`
    width: 14rem;
    `;
const ItemAddingArea = styled.div`
    width: 22rem;
    height: 25rem;
    border: 2px solid ${({theme}) => theme.colors.gray2};
    border-radius: 5px;
`
const Space = styled.div`
  visibility: hidden;
  width: 1rem;
  height: 1rem;
`
const ItemAddingAreaNav = styled.div`
  ${({theme}) => theme.flex.rowCenter}
  justify-content: space-around;
  height: 2rem;
  background-color: ${({theme}) => theme.colors.green3};
  border-radius: 5px 5px 0 0;
`
const ItemAddingAreaBody = styled.div`
  ${({theme}) => theme.flex.columnCenter}
  justify-content: flex-start;
  height: 22.5rem;
  padding: 0.8rem 0;
  overflow-y: auto;
  gap: 1rem;
`
const Footer = styled.div`
  ${({theme}) => theme.flex.columnCenter}
  padding-top: 2rem;
  gap: 1rem;
`
const FooterButtons = styled.div`
  ${({theme}) => theme.flex.rowCenter}
  width: 100%;
  gap: 2rem;
  justify-content: space-around;
`
const cardInputs=[{text: '품목명', name: 'productTitle', type: 'text'}, {text: '수량', name: 'quantity', type: 'number'}, {text: '등급', name: 'gradeTitle', type: 'text'}, {text: '금액증가폭', name: 'bidIncrement', type: 'number'}, {text: '경매시작가', name: 'startingPrice', type: 'number'}];

const CreateAuctionRoom = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([
    cardInputs.reduce((total, {name}) => {
      return {
        ...total,
        [name]: ''
      }
    }, {})
  ]);
  const [url, setUrl] = useState(null);
  const [emptyInput, setEmptyInput] = useState(true);
  const phone = useSelector((state) => state.token.value.phone);
  const clickHandler = () => {
      const fileUploader = document.querySelector('#file-uploader');
      fileUploader.click();
  }
  const changeImage = () => {
      const fileUploader = document.querySelector('#file-uploader');
      setUrl(URL.createObjectURL(fileUploader.files[0]));
  }

  const navigate = useNavigate();

  const addItem = () => {
    setItems(items => [...items, 
      cardInputs.reduce((total, {name}) => {
        return {
          ...total,
          [name]: ''
        }
      }, {})
    ]);
  }

  const onChange = (e, setValue) => {
    setValue(e.target.value);
  }
  const goBack = () => {
    move(navigate, -1);
  }
  const createRoom = async () => {
    if (title.trim() === '' || description.trim() === '') {
      setEmptyInput(false);
      return;
    }
    for (let item of items) {
      for (let input of Object.keys(item)) {
        if (item[input].trim() === '') {
          setEmptyInput(false);
          return;
        }
      }
    }
    setEmptyInput(true);
    const file = document.querySelector('#file-uploader').files[0];
    // db 디폴트 썸네일 인덱스
    let thumbnailIdx = 1;
    if (file) {
      const formData = new FormData();
      formData.append('img', file);
      thumbnailIdx = await uploadFile(formData);
    }

    const roomId = await createAuctionRoom(title, description, thumbnailIdx, items, phone)
    if (roomId !== false) {
      console.log('경매방 생성 성공');
      navigate('/room', { state: { id: roomId, items: items, phone: phone, title: title} })
    }
  }
  return (
    <StyledCreateAuctionRoom>
      <Navbar url={logo} isLogin imgSize="xs" fontSize="sm" mode="graytext" />
      <PageBody>
        <Text weight='bold' fontSize='xxxl'>경매방 생성 페이지</Text>
        <FixedInputArea>
          <ImageArea>
            <input type='file' hidden id='file-uploader' onChange={changeImage} />
            {
                !url ?
                    <ImageButton>
                        <PhotoCameraIcon fontSize='large' onClick={clickHandler} />
                    </ImageButton>
                    :
                    <StyledImage>
                        <Image src={url} onClick={clickHandler} />
                    </StyledImage>
            }
          </ImageArea>
          <TextInputs>
              <StyledInput>
                  <Input height='2' placeholder='제목을 입력하세요' onChange={(e) => onChange(e, setTitle)} />
              </StyledInput>
              <StyledTextarea>
                  <Textarea height='7' placeholder='내용을 입력하세요' onChange={(e) => onChange(e, setDescription)} />
              </StyledTextarea>
          </TextInputs>
        </FixedInputArea>
        <ItemAddingArea>
          <ItemAddingAreaNav>
            <Space />
            <Text color='white' weight='bold' fontSize='lg' >농산물 항목</Text>
            <Button mode='whitetext' width='1rem' height='1rem' fontSize='xxxl' color='white' onClick={addItem}>+</Button>
          </ItemAddingAreaNav>
          <ItemAddingAreaBody>
            {
              items.map((item, idx) => <CreateItemCard items={items} setItems={setItems} inputs={cardInputs} idx={idx} key={item + idx} />)
            }
          </ItemAddingAreaBody>
        </ItemAddingArea>
        <Footer>
          {
              !emptyInput ? <Text color='red' fontSize='lg' weight='bold'>필수 입력값을 작성해주세요.</Text> : null
          }
          <FooterButtons>
            <Button onClick={goBack}>돌아가기</Button>
            <Button onClick={createRoom}>생성하기</Button>
          </FooterButtons>
        </Footer>
      </PageBody>
    </StyledCreateAuctionRoom>
  );
};

export default CreateAuctionRoom;