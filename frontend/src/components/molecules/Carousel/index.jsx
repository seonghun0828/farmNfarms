import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import RoomCard from "../RoomCard";
import logo from '../../../assets/temp_logo.png';

const Container = styled.div`
  width: 100%;
  overflow: hidden; // 선을 넘어간 이미지들은 보이지 않도록 처리합니다.
`;
const Button = styled.button`
  all: unset;
  border: 1px solid coral;
  padding: 0.5em 2em;
  color: coral;
  border-radius: 10px;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: coral;
    color: #fff;
  }
`;
const SliderContainer = styled.div`
  width: 100%;
  display: flex;
`;

const SlidePadding = styled.div`
  padding-right: 1rem;
`

const TOTAL_SLIDES = 4;

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) { 
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  }

useEffect(() => {
  slideRef.current.style.transition = "all 0.5s ease-in-out";
  slideRef.current.style.transform = `translateX(-${currentSlide*9}rem)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
}, [currentSlide]);

return (
  <Container>
    {currentSlide}
    <SliderContainer ref={slideRef}>
      <SlidePadding>
        <RoomCard profileImg={logo} headerSize='xxs' viewerSize='sm' title='배추아저씨' num='13' thumnail='https://img.seoul.co.kr//img/upload/2020/07/22/SSI_20200722215818.jpg'/>
      </SlidePadding>
      <SlidePadding>
        <RoomCard profileImg={logo} headerSize='xxs' viewerSize='sm' title='배추아저씨' num='13' thumnail='https://img.seoul.co.kr//img/upload/2020/07/22/SSI_20200722215818.jpg'/>
      </SlidePadding>
      <SlidePadding>
        <RoomCard profileImg={logo} headerSize='xxs' viewerSize='sm' title='배추아저씨' num='13' thumnail='https://img.seoul.co.kr//img/upload/2020/07/22/SSI_20200722215818.jpg'/>
      </SlidePadding>
      <SlidePadding>
        <RoomCard profileImg={logo} headerSize='xxs' viewerSize='sm' title='배추아저씨' num='13' thumnail='https://img.seoul.co.kr//img/upload/2020/07/22/SSI_20200722215818.jpg'/>
      </SlidePadding>
      <SlidePadding>
        <RoomCard profileImg={logo} headerSize='xxs' viewerSize='sm' title='배추아저씨' num='13' thumnail='https://img.seoul.co.kr//img/upload/2020/07/22/SSI_20200722215818.jpg'/>
      </SlidePadding>
    </SliderContainer>
    <Button onClick={prevSlide}>Previous Slide</Button>
    <Button onClick={nextSlide}>Next Slide</Button>
  </Container>
  );
}

export default Carousel;