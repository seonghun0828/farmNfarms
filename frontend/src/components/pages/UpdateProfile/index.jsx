import { useState } from 'react'
import styled from 'styled-components';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Image from '../../atoms/Image';
import Input from '../../atoms/Input';
import PostCode from '../../molecules/PostCode';

const ImageArea = styled.div`
  width: 9rem;
  height: 9rem;
`

const ImageButton = styled.div`
  ${({theme}) => theme.flex.rowCenter}
  width: 9rem;
  height: 9rem;
  background-color: ${({theme}) => theme.colors.gray2};
  border-radius: 0.5rem;
`

const StyledImage = styled.div`
  width: 9rem;
  height: 9rem;
  border-radius: 0.5rem;
  overflow: hidden;
`

const UpdateProfile = () => {

  const [url, setUrl] = useState(null);
  const clickHandler = () => {
      const fileUploader = document.querySelector('#file-uploader');
      fileUploader.click();
  }
  const uploadImage = () => {
      const fileUploader = document.querySelector('#file-uploader');
      setUrl(URL.createObjectURL(fileUploader.files[0]));
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

  return (
    <>
      <ImageArea>
        <input type='file' hidden id='file-uploader' onChange={uploadImage} />
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
      <Input></Input>
      <Input></Input>
      <PostCode setPostCode={getPostCode}/>
    </>
  );
}

export default UpdateProfile;