import React, { useEffect, useState } from "react";
import { FlexBox, Label, HelpText } from '../Input/Input.styled';
import styled from 'styled-components';

const InputBox = styled.div`
  display:flex;
  border: 1px solid rgba(0, 0, 0, 0.3);
  z-index: 3;
  &:focus-within {
    box-shadow: rgb(0, 0, 0, 0.3);
  }
  background-color: white;
`

const AutoStyledInput = styled.input`
  flex: 1 0 0;
  background-color: transparent;
  border: none;
  outline: none;
`

const DeleteButton = styled.div`
  cursor: pointer;
`

const RecommendBox = styled.ul`
  display: block;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  list-style-type: none;
  z-index: 3;
`

const RecommendItems = styled.li`
  &.selected {
    background-color: lightgray;
  }
`

const productSuggestions = [
  '배추', '당근', '멜론', '수박', '오이', '감자', '고구마', '옥수수', '연근', '대파', '파', '감', '레몬', '오렌지',
  '사과', '토마토', '딸기', '양파', '양상추', '양배추', '햇감자', '햇고구마', '고추', '청양고추', '망고', '두리안',
  '파인애플', '감귤', '귤', '복숭아', '포도', '청포도', '아보카도', '키위', '골드키위', '코코넛', '배', '바나나',
  '가지', '체리', '풋사과', '브로콜리', '표고버섯', '송이버섯', '노루궁뎅이버섯', '땅콩', '밤',
];

const Autocomplete = () => {
  const [suggestions, setSuggestions] = useState(productSuggestions); // 자동완성 추천 목록
  const [itemIdx, setItemIdx] = useState(0); // suggestion에 대한 아이템 인덱스
  const [inputText, setInputText] = useState(''); // 텍스트 입력값
  const [isAutocompleting, setIsAutocompleting] = useState(false); // 자동 완성을 보여줄지 말지 결정

  const showSuggestions = () => {
    if (inputText === '') { // 인풋에 아무것도 없으면 자동 검색 기능을 off
      setIsAutocompleting(false);
      setSuggestions([]);
    } else {
      const recommendList = productSuggestions.filter((item) => (
        item.includes(inputText)
      ))
      setSuggestions(recommendList);
    }
  }

  useEffect(() => {
    showSuggestions();
  }, [inputText]);

  const textChangeHandler = (event) => {
    setInputText(event.target.value);
    setIsAutocompleting(true);
  };

  const selectSuggestion = (item) => {
    setInputText(item);
    setIsAutocompleting(false);
  };

  return (
    <FlexBox>
      <InputBox>
        <AutoStyledInput
          value={inputText}
          type="text"
          onChange={textChangeHandler}
        />
        <DeleteButton onClick={() => setInputText('')}>&times;</DeleteButton>
      </InputBox>
      {isAutocompleting && <RecommendBox>
        {suggestions.length === 0 && <RecommendItems>추천하는 품목이 없습니다</RecommendItems>}
        {suggestions.map((item, i) => {
          return (
            <RecommendItems
              key={i}
              onClick={() => selectSuggestion(item)}
            >
              {item}
            </RecommendItems>
          )
        })}
      </RecommendBox>}
    </FlexBox>
  )

}

export default Autocomplete;