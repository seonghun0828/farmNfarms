import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
`

const SlideContainer = styled.div`
  display: flex
`

const AutoCarousel = ({children, slideLength}) => {

  const [count, setCount] = useState(0);
  const slideRef = useRef(null);
  const flag = useRef(false);
  
  const SlidesLength = children.length;

  const array = children.concat(children);
  const newArray = array.map((el, index) => el = {...el, key: index+el.props.name}) // 넘 지저분..

  useEffect(() => {
    const timer = setInterval(() => {
      if (count < SlidesLength) {
        flag.current = false;
        setCount(prev => prev + 1);
      } else {
        flag.current = true;
        setCount(0);
      }
    }, flag.current ? 100 : 5000); // 0으로 주면 모바일에서 동작을 제대로 안해서 적당히 100으로 넣어줬음.. 모지..

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  useEffect(() => {
    if (flag.current) {
      slideRef.current.style.transition = '';
    } else {
      slideRef.current.style.transition = "all 1.5s ease-in-out"; 
    }
    slideRef.current.style.transform = `translateX(-${count*(slideLength+1)}rem)`
  }, [count])

  return (
    <Container>
      <SlideContainer ref={slideRef}>
        {newArray}
      </SlideContainer>
    </Container>
  );
}

export default AutoCarousel;