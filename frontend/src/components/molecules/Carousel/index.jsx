import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import RoomCard from "../RoomCard";
import logo from '../../../assets/temp_logo.png';


// 아오~~~ css 모르겟다 진짜

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  flex-shrink: 1;
`;
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

const rowFlex = styled.div`
  width: 100%;
`;

const SlidePadding = styled.div`
  padding-right: 1rem;
`


const Carousel = (roominfos) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const TOTAL_SLIDES = 2; // 왜 roominfos.length 안되지
  console.log(TOTAL_SLIDES)

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
  <rowFlex>
    <Container>
      <SliderContainer ref={slideRef}>
        {roominfos.roominfos.map((roominfo, index) => (
          <SlidePadding>
          <RoomCard 
            profileImg={roominfo.profileImg} 
            headerSize={roominfo.headerSize} 
            viewerSize={roominfo.viewerSize} 
            title={roominfo.title} 
            num={roominfo.num} 
            thumnail={roominfo.thumnail}
            key={index}
            />
          </SlidePadding>
        ))}
      </SliderContainer>
    </Container>
    <Button onClick={prevSlide}>왼</Button>
    <Button onClick={nextSlide}>오</Button>
  </rowFlex>
  );
}

export default Carousel;