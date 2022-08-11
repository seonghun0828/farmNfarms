import React, { useState } from "react";
import { FlexBox, Label, StyledInput, HelpText } from '../Input/Input.styled';

const productSuggestions = [
  '배추', '당근', '멜론', '수박', '오이', '감자', '고구마', '옥수수', '연근', '대파', '파', '감', '레몬', '오렌지',
  '사과', '토마토', '딸기', '양파', '양상추', '양배추', '햇감자', '햇고구마', '고추', '청양고추', '망고', '두리안',
  '파인애플', '감귤', '귤', '복숭아', '포도', '청포도'

];

const compareLabel = (a, b) => {
  const labelA = a.label.toUpperCase();
  const labelB = b.label.toUpperCase();
  if (labelA < labelB) return -1;
  if (labelA > labelB) return 1;
  return 0;
};

const Autocomplete = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState('');
  const [isAutocompleting, setIsAutocompleting] = useState(false);

  const textChangeHandler = (event) => {
    let suggestionList = [];
    let inputText = event.target.value;
    setText(inputText);
  };


  return (
    <div>
      <input
        value={text}
        type="text"
        onChange={textChangeHandler}
        onClick={() => setIsAutocompleting(true)}
      />
      {suggestions.length > 0}
    </div>
  )

}

export default Autocomplete;