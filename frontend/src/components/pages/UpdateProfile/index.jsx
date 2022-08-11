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
import userInfo from './userInfo';
import updateUserInfo from './updateUserInfo';
import uploadFile from '../../../common/uploadFile';

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
  background-size: cover;
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

  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));
  const navigate = useNavigate();

  const myPhoneNum = useSelector((state) => state.token.value.phone);

  const [url, setUrl] = useState(null);
  const clickHandler = () => {
      const fileUploader = document.querySelector('#file-uploader');
      fileUploader.click();
  }
  const uploadImage = async () => {
      const fileUploader = document.querySelector('#file-uploader');
      setUrl(URL.createObjectURL(fileUploader.files[0]));

      const formData = new FormData();
      formData.append('img', fileUploader.files[0]);
      const thumbnailIdx = await uploadFile(formData);
      setInputs({...inputs, picture: thumbnailIdx});
  }

  const [inputs, setInputs] = useState({
    aboutMe: '',
    account: '',
    bank: '',
    name: '',
    newPassword: undefined,
    newPasswordAgain: undefined,
    password: '',
    picture: '',
  });
  const [originData, setOriginData] = useState({
    account: "",
    address: "",
    bank: "",
    detailAddress: "",
    name: "",
    phone: "",
    pictureIdx: "",
    picturePath: "",
    zipCode: "",
  });

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

  const getOriginData = async () => {
    setOriginData(await userInfo(myPhoneNum));
  }

  useEffect(() => {
    getOriginData();
  }, []);

  useEffect(() => {
    setInputs({
      ...inputs,
      account: originData.account,
      bank: originData.bank,
      name: originData.name,
      phone: originData.phone,
      picture: originData.pictureIdx,
      newPassword: originData.newPassword,
      newPasswordAgain: originData.newPasswordAgain,
    });
    setPostCode({
      zonecode: originData.zipCode,
      address: '',
      extraAddress: '',
      detailAddress: originData.detailAddress,
      fullAddress: originData.address,        
    });
    setUrl(originData.picturePath)
  }, [originData]);

  const onClickHandler = async () => {
    const payload = {
      phone: inputs.phone,
      aboutMe: inputs.aboutMe,
      account: inputs.account,
      address: postCode.fullAddress,
      bank: inputs.bank,
      detailAddress: postCode.detailAddress,
      name: inputs.name,
      newPassword: inputs.newPassword,
      newPasswordAgain: inputs.newPasswordAgain,
      password: inputs.password,
      picture: inputs.picture,
      zipCode: postCode.zonecode,
    }
    const isSuccess = await updateUserInfo(payload);
    if (isSuccess) {
      console.log('회원정보 수정 성공');
      move(navigate, '/mypage');
    } else {
      console.log('실패');
    }
  }

  return (
    <>
      <Navbar url={logo} navigate={navigate} isLogin={isLogin} setIsLogin={setIsLogin} imgSize="xs" fontSize="sm" mode="graytext" />
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
      <Input 
        label="비밀번호" 
        placeholder="비밀번호를 입력해주세요" 
        type="password"
        name="password"
        setValue={setInputs}
      />
      <Input 
        label="수정 비밀번호"
        placeholder="수정할 비밀번호를 입력해주세요" 
        type="password"
        name="newPassword"
        setValue={setInputs}
      />
      <Input 
        label="수정 비밀번호 확인"
        placeholder="수정할 비밀번호를 다시 입력해주세요" 
        type="password"
        name="newPasswordAgain"
        setValue={setInputs}
      />
      <Select options={BANK_OPTIONS} name="bank" setValue={setInputs} selectedvalue={inputs.bank} defaultValue="은행 선택"/>
      <Input 
        label="계좌번호"  
        value={inputs.account}
        placeholder="계좌번호를 입력해주세요" 
        name="account" 
        setValue={setInputs}/>
      <PostCode setPostCode={getPostCode} defaultValue={postCode}/>
      <Button width="100%" onClick={onClickHandler}>수정하기</Button>
    </>
  );
}

export default UpdateProfile;