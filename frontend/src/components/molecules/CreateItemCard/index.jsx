import React, { useState } from 'react';
import styled from "styled-components";
import Image from "../../atoms/Image"
import Input from "../../atoms/Input"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const StyledCreateItemCard = styled.div`
    ${({theme}) => theme.flex.rowCenter}
    width: 20rem;
    padding: 0.7rem;
    background-color: ${({theme}) => theme.colors.gray1};
    border-radius: 0.5rem;
    gap: 0.5rem;
`
const ImageArea = styled.div`
    width: 9rem;
    height: 9rem;
    `
    const StyledImage = styled.div`
    width: 9rem;
    height: 9rem;
    border-radius: 0.5rem;
`
const InputArea = styled.div`

`
const ImageButton = styled.div`
    ${({theme}) => theme.flex.rowCenter}
    width: 9rem;
    height: 9rem;
    background-color: ${({theme}) => theme.colors.gray2};
    border-radius: 0.5rem;
`
const CreateItemCard = ({inputs}) => {
    const [url, setUrl] = useState(null);
    const clickHandler = () => {
        const fileUploader = document.querySelector('#file-uploader');
        fileUploader.click();
    }
    const uploadImage = () => {
        const fileUploader = document.querySelector('#file-uploader');
        setUrl(URL.createObjectURL(fileUploader.files[0]));
    }
    return (
        <StyledCreateItemCard>
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
            <InputArea>
                {inputs.map(({text, type}, idx) => <Input height='2' type={type} placeholder={text} key={text + idx} />)}
            </InputArea>
        </StyledCreateItemCard>
    );
}

export default CreateItemCard;