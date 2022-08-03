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
const CreateItemCard = ({inputs, items, idx, setItems}) => {
    const [url, setUrl] = useState(null);
    const clickHandler = () => {
        const fileUploader = document.querySelector('#file-uploader');
        fileUploader.click();
    }
    const uploadImage = () => {
        const fileUploader = document.querySelector('#file-uploader');
        setUrl(URL.createObjectURL(fileUploader.files[0]));
    }
    const changeInput = (e) => {
        // console.log(e.target.value);
        // console.log(e.target.parentNode.parentNode.parentNode);
        // const parent = e.target.parentNode.parentNode.parentNode;
        // const arr = inputs.map(({text, type}, idx) => {
        //     return {
        //         [text]: ''     
        //     }
        // })
        // for (let i = 0; i < items.length; i++) {
        //     if (i === idx) {
                // console.log(items[i]);
                // console.log(idx, parent.name);
            //     setItems(items => [
            //         ...items,
            //         [...arr,
            //             {
            //                 [e.target.name]: e.target
            //             }
            //         ]
                    
            //     ])
                
            // }
        // }
    }
    return (
        <StyledCreateItemCard name={idx}>
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
                {inputs.map(({text, type}, idx) => <Input height='2' onChange={(e) => changeInput(e)} name={text} type={type} placeholder={text} key={text + idx} />)}
            </InputArea>
        </StyledCreateItemCard>
    );
}

export default CreateItemCard;