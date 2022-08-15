// 요일 반환해주는 애
// 요일이 영어로 뭐지..
import styled from 'styled-components';
import { useState } from 'react';
import theme from '../../../common/theme';
const Container = styled.div`
  width: 100%;
  padding: 1rem 0;
  background-color: ${theme.colors.gray1};
  text-align: center;
  color: ${({value}) => {
    if (value === 0 || value === 6) {
      return `${theme.colors.red};`
    } else {
      return `${theme.colors.black};`
    }
  }}}
`

const Date = ({value}) => {
  const date = value.day();

  let inner = '';
  switch (date) {
    case 0:
      inner = "일";
      break;
    case 1:
      inner = "월";
      break;
    case 2:
      inner = "화";
      break;
    case 3:
      inner = "수";
      break;
    case 4:
      inner = "목";
      break;
    case 5:
      inner = "금";
      break;
    case 6:
      inner = "토";
      break;
  }

  return (
    <Container value={date}>{inner}</Container>
  );
}

export default Date;