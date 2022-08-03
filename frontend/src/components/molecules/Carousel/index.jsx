import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import RoomCard from "../RoomCard";


// 카드 마지막에나오면 슬라이드 안되게 고치기
// 터치 슬라이드로 가능하도록 커스텀하기 

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  flex-shrink: 1;
`;

// 버튼 스타일링 고치기!!
const Button = styled.button`
  all: unset;
  padding: 10px;
  border: 1px solid coral;
  color: coral;
  border-radius: 10px;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: coral;
    color: #fff;
  }
`;
const SliderContainer = styled.div`
  display: flex;
`;

const SlidePadding = styled.div`
  padding-right: 1rem;
`


const Carousel = ({roominfos}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const TOTAL_SLIDES = roominfos.length-1;

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) { 
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  }

useEffect(() => {
  slideRef.current.style.transition = "all 0.5s ease-in-out";
  slideRef.current.style.transform = `translateX(-${currentSlide*9}rem)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
}, [currentSlide]);

return (
  <>
    <Container>
      <SliderContainer ref={slideRef}>
        {roominfos.map((roominfo, index) => (
          <SlidePadding>
          <RoomCard 
            {...roominfo}
            key={index}
            />
          </SlidePadding>
        ))}
      </SliderContainer>
    </Container>
    <Button onClick={prevSlide}>왼</Button>
    <Button onClick={nextSlide}>오</Button>
  </>
  );
}

export default Carousel;