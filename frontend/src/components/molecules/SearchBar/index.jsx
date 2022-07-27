import React from 'react';
import styled from "styled-components";
import theme from '../../../common/theme';
import SearchIcon from '@mui/icons-material/Search';

const InputBox = styled.div`
  display: flex;
  align-items: center;

  box-sizing: border-box;
  height: 3rem;
  padding: 0 0.5rem;

  border-radius: 5px;
  background-color: ${theme.colors.gray1};

  color: ${theme.colors.gray2};

  transition: all 0.2s;

  :focus-within {
    outline: none;
    border: 2px solid ${theme.colors.green3};
    background-color: ${theme.colors.white};
  }
`;

const InputText = styled.input`
  width: 100%;
  margin-left: 8px;
  border: none;
  background: transparent;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeights.redular};
  color: ${theme.colors.black};
  transition: 0.3s;

  ::placeholder {
    color: ${theme.colors.gray2};
    font-size: ${theme.fontSizes.md};
  }
  :focus {
    outline: none;
  }
`;

const SearchBar = ({...rest}) => {
  return (
    <InputBox {...rest}>
      <SearchIcon 
        style={{cursor: 'pointer'}}
        onClick={()=>console.log('dd')} 
        {...rest}
      />
      <InputText placeholder="검색어를 입력하세요" {...rest}/>
    </InputBox>
  );
}

export default SearchBar;