import React, { useEffect, useState } from "react";
import { FlexBox } from '../Input/Input.styled';
import styled from 'styled-components';

const InputBox = styled.div`
  display:flex;
  border: 2px solid ${({theme}) => theme.colors.gray3};
  z-index: 3;
  &:focus-within {
    box-shadow: #0F9749;
  }
  background-color: white;
  height: 2rem;
  align-items: center;
  border-radius: 5px;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 2px;
`

const AutoStyledInput = styled.input`
  flex: 1 0 0;
  margin: 0;
  padding: 0 0.5rem;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 400;
  color: #232724;
`

const DeleteButton = styled.div`
  margin: 5px;
  cursor: pointer;
`

const StyledDiv = styled.div`
`

const RecommendBox = styled.ul`
  display: block;
  width: 240px;
  box-sizing: border-box;
  position: absolute;
  margin: 0 auto;
  padding: 8px 0;
  background-color: white;
  border: 2px solid #ADA7A8;
  border-top: 1px;
  list-style-type: none;
  border-radius: 0 0 5px 5px;
  z-index: 3;
  transform: translate(0px, -5px);
`

const RecommendItems = styled.li`
  padding: 0 16px;
  &.selected {
    background-color: lightgray;
  }
`

const productSuggestions = [
  '배추', '당근', '멜론', '수박', '오이', '감자', '고구마', '옥수수', '연근', '대파', '파', '감', '레몬', '오렌지',
  '사과', '토마토', '딸기', '양파', '양상추', '양배추', '햇감자', '햇고구마', '고추', '청양고추', '망고', '두리안',
  '파인애플', '감귤', '귤', '복숭아', '포도', '청포도', '아보카도', '키위', '골드키위', '코코넛', '배', '바나나',
  '가지', '체리', '풋사과', '브로콜리', '표고버섯', '송이버섯', '노루궁뎅이버섯', '땅콩', '밤', '마늘', '상추',
  '깻잎', '무', '청경채'
];

const Autocomplete = ({ name, changeInput }) => {
  const [suggestions, setSuggestions] = useState(productSuggestions); // 자동완성 추천 목록
  const [itemIdx, setItemIdx] = useState(-1); // suggestion에 대한 아이템 인덱스
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
    changeInput(event);
    setInputText(event.target.value);
    setIsAutocompleting(true);
  };

  const selectSuggestion = (event, item) => {
    changeInput(event, item, name);
    setInputText(item);
    setIsAutocompleting(false);
  };

  return (
    <FlexBox>
      <StyledDiv>
        <InputBox>
          <AutoStyledInput
            value={inputText}
            name={name}
            type="text"
            placeholder="품목"
            onChange={textChangeHandler}
          />
          {inputText !== "" && <DeleteButton onClick={() => setInputText('')}>&times;</DeleteButton>}
        </InputBox>
        {isAutocompleting && <StyledDiv>
          <RecommendBox>
            {suggestions.length === 0 && <RecommendItems>추천하는 품목이 없습니다</RecommendItems>}
            {suggestions.map((item, i) => {
              return (
                <StyledDiv key={item + i}>
                  <RecommendItems
                    key={item + i}
                    onClick={(event) => {
                      selectSuggestion(event, item)
                      setItemIdx(i)
                    }}
                    onMouseOver={() => setItemIdx(i)}
                    className={
                      itemIdx === i ? 'selected' : ''
                    }
                  >
                    {item}
                  </RecommendItems>
                </StyledDiv>
              )
            })}
          </RecommendBox>
        </StyledDiv>}
      </StyledDiv>
    </FlexBox>
  )

}

export default React.memo(Autocomplete);