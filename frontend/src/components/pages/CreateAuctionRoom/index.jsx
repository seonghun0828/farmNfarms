import React, { useEffect, useState } from 'react';
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
import { AddCircle } from '@mui/icons-material';
import { useDispatch } from 'react-redux/es/exports';
import reissue from '../../../common/reissue'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const StyledCreateAuctionRoom = styled.div``;

const PageBody = styled.div`
  ${({theme}) => theme.flex.columnCenter}
    padding: 1.2rem;
    height: auto;
    gap: 0.7rem;
`;
const FixedInputArea = styled.div`
  ${({theme}) => theme.flex.rowCenter}
  justify-content: space-between;
  gap: 0.7rem;
`
const ImageArea = styled.div`
    width: 7.5rem;
    height: 12rem;
    cursor: pointer;
    `
const StyledImage = styled.div`
  width: 7.5rem;
  height: 12rem;
  border-radius: 1rem;
`
const ImageButton = styled.div`
  ${({theme}) => theme.flex.rowCenter}
  width: 7.5rem;
  height: 12rem;
  background-color: ${({theme}) => theme.colors.gray3};
  border-radius: 1.2rem;
`
const TextInputs = styled.div`
    ${({theme}) => theme.flex.columnCenter}
    justify-content: space-between;
    height: 12rem;
`
const StyledInput = styled.div`
    width: 12rem;
`
const StyledTextarea = styled.div`
    width: 12rem;
    `;
const ItemAddingArea = styled.div`
    width: 20rem;
    height: 26rem;
    border: 2px solid ${({theme}) => theme.colors.gray3};
    background-color: ${({theme}) => theme.colors.white};
    border-radius: 5px;
`

const ItemAddingAreaNav = styled.div`
  ${({theme}) => theme.flex.rowCenter}
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: ${({theme}) => theme.colors.white};
  border-radius: 5px 5px 0 0;
  border-bottom: solid ${({theme}) => theme.colors.gray3};
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
  padding-top: 1rem;
  gap: 1rem;
`
const FooterButtons = styled.div`
  ${({theme}) => theme.flex.rowCenter}
  width: 100%;
  gap: 2rem;
  justify-content: space-around;
`

const TextAlign = styled.div`
  align-self: flex-start;
`

const TextDiv = styled.div`
  width: 20rem;
`

const cardInputs=[{text: '품목명', name: 'productTitle', type: 'text'}, {text: '수량', name: 'quantity', type: 'number'}, {text: '등급', name: 'grade', type: 'text'}, {text: '금액증가폭', name: 'bidIncrement', type: 'number'}, {text: '경매시작가', name: 'startingPrice', type: 'number'}];

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
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));
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
  const dispatch = useDispatch();

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

    const roomId = await createAuctionRoom(title, description, thumbnailIdx, items, phone, dispatch)
    if (roomId !== false) {
      console.log('경매방 생성 성공');

      navigate('/room', { state: { id: roomId, items: items, phone: phone, title: title } })
    }
  }

  useEffect(() => {
    if (localStorage.getItem('isLogin')) {
      reissue(dispatch);
    }
  }, [dispatch]);

  return (
    <StyledCreateAuctionRoom>
      <Navbar navigate={navigate} isLogin={isLogin} setIsLogin={setIsLogin} />
      <PageBody>
        <TextDiv>
          <TextAlign>
            <Text weight='bold' fontSize='xl'>경매방 생성</Text>
          </TextAlign>
        </TextDiv>
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
                  <Input height='2.5' placeholder='제목을 입력하세요' onChange={(e) => onChange(e, setTitle)} />
              </StyledInput>
              <StyledTextarea>
                  <Textarea height='8.5' placeholder='내용을 입력하세요' onChange={(e) => onChange(e, setDescription)} />
              </StyledTextarea>
          </TextInputs>
        </FixedInputArea>
        <ItemAddingArea>
          <ItemAddingAreaNav>
            <Text weight='bold' fontSize='lg' >농산물 항목</Text>
            <Button mode='secondary' width="7.5rem" height="2rem" radius="2rem" color='white' fontSize="md" onClick={addItem}>항목추가 +</Button>
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