import React, { useState } from 'react';
import styled from "styled-components";
import Autocomplete from '../../atoms/Autocomplete';
import Input from "../../atoms/Input"

const StyledCreateItemCard = styled.div`
    ${({theme}) => theme.flex.rowCenter}
    width: 20rem;
    padding: 0.7rem;
    background-color: ${({theme}) => theme.colors.gray1};
    border-radius: 0.5rem;
    gap: 0.5rem;
`
const InputArea = styled.div`
    width: 15rem;
`
const CreateItemCard = ({inputs, items, idx, setItems}) => {
    const changeInput = (e) => {
        setItems(items => items.map((item, i) => {
            if (i !== idx)
                return item;
            
            return {
                ...item,
                [e.target.name]: e.target.value
            }
        }));
    }
    return (
        <StyledCreateItemCard>
            <InputArea> 
                <Autocomplete name={inputs[0].name} items={items[idx]} onChange={(e) => changeInput(e)} key={inputs[0].text + Math.floor(Math.random() * 100)}></Autocomplete>
                {inputs.slice(1).map(({ text, name, type }, itemIdx) => <Input height='2' onChange={(e) => changeInput(e)} name={name} type={type} placeholder={text} key={text + itemIdx} />)}
            </InputArea>
        </StyledCreateItemCard>
    );
}

export default CreateItemCard;