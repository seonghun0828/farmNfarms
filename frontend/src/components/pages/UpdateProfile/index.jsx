import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import move from '../../../common/move'
import styled from 'styled-components';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Input from '../../atoms/Input';
import PostCode from '../../molecules/PostCode';
import Select from '../../atoms/Select';
import Button from '../../atoms/Button';
import Navbar from '../../molecules/Navbar';
import logo from '../../../assets/로고.svg';
import { useSelector } from 'react-redux';

const ImageArea = styled.div`
  width: 9rem;
  height: 9rem;
  position: relative;
`

const StyledImage = styled.div`
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({theme}) => theme.colors.gray2};
  background-image: url('${({thumbnail}) => thumbnail}');
  background-repeat: no-repeat;
  background-position: center;
`

const CameraImage = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`

export const CenterAlign = styled.div`
  display: flex;
  justify-content: center;
`

const UpdateProfile = () => {

  const navigate = useNavigate();
  // const isLogin = useSelector((state) => state.token.value.isLogin);
  const [url, setUrl] = useState(null);
  const clickHandler = () => {
      const fileUploader = document.querySelector('#file-uploader');
      fileUploader.click();
  }
  const uploadImage = () => {
      const fileUploader = document.querySelector('#file-uploader');
      setUrl(URL.createObjectURL(fileUploader.files[0]));
  }

  const [inputs, setInputs] = useState({});
  const originData = {
    name: '이윤경',
    phone: '01088422922',
    password: '1234',
    bank: '우리은행',
    zonecode: '12345',
    address: '청주시 어쩌구',
    detailAddress: '123-1234'
  }

  const [postCode, setPostCode] = useState({
		zonecode: '',
    address: '',
    extraAddress: '',
		fullAddress: '',
		detailAddress: '',
	});
  const getPostCode = (data) => {
    setPostCode(data)
  }

  const BANK_OPTIONS = [
		{ value: "woori", name: "우리은행" },
		{ value: "kookmin", name: "국민은행" },
		{ value: "shinhan", name: "신한은행" },
		{ value: "hana", name: "하나은행" },
		{ value: "kakao", name: "카카오뱅크" },
	]

  return (
    <>
      <Navbar url={logo} imgSize="xs" fontSize="sm" mode="graytext" />
      <Button mode="graytext" onClick={() => move(navigate, -1)}>
        뒤로 가기
      </Button>
      <CenterAlign>
        <ImageArea  onClick={clickHandler}>
          <input type='file' hidden id='file-uploader' onChange={uploadImage} />
          <StyledImage thumbnail={url}/>
          <CameraImage>
            <PhotoCameraIcon fontSize="large"/>
          </CameraImage>
        </ImageArea>
      </CenterAlign>
      <Input label="아이디" status="readOnly" value={originData.phone}/>
      <Input label="이름" status="readOnly" value={originData.name}/>
      <Input label="비밀번호"/>
      <Input label="수정 비밀번호"/>
      <Input label="수정 비밀번호 확인"/>
      <Select options={BANK_OPTIONS} value={originData.bank}/>
      <Input label="계좌번호"/>
      <PostCode setPostCode={getPostCode}/>
      <Button width="100%">수정하기</Button>
    </>
  );
}

export default UpdateProfile;