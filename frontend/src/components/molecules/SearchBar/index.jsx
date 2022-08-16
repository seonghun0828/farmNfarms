import React from 'react';
import styled from "styled-components";
import theme from '../../../common/theme';
import SearchIcon from '@mui/icons-material/Search';

const InputBox = styled.div`
  display: flex;
  align-items: center;

  box-sizing: border-box;
  height: 2.5rem;
  padding: 0 0.5rem;

  border-radius: 1rem;
  background-color: ${theme.colors.gray1};
  border: 2px solid ${theme.colors.gray2};

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
  font-weight: ${theme.fontWeights.normal};
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

const SearchBar = ({value, setKeyword, SearchKey, ...rest}) => {
  const onChangeHandler = (e) => {
    setKeyword(e.target.value);
  }

  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      SearchKey();
    }
  }

  return (
    <InputBox {...rest}>
      <SearchIcon 
        style={{cursor: 'pointer'}}
        {...rest}
      />
      <InputText 
        placeholder="검색어를 입력하세요" 
        value={value}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        {...rest}
      />
    </InputBox>
  );
}

export default SearchBar;