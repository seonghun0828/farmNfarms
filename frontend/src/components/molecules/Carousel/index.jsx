import { useRef } from 'react'
import styled from 'styled-components'

// container 높이 auto 였는데 박스 그림자가 잘려서 안보여서 룸카드에 맞춰줬음
const Container = styled.div`
  width: 100%;
  height: 17rem; 
  overflow: hidden;
`

const SlideContainer = styled.div`
  display: flex;
`

const SlidePadding = styled.div`
  display: inline-block;
  padding-right: 1rem;
`

const Carousel = ({children}) => {

  const slideRef = useRef(null)

  let initialPosition = null;
  let moving = false;
  let transform = 0;

  const gestureStart = (e) => {
    initialPosition = e.touches[0].pageX;
    moving = true;
    const transformMatrix = window.getComputedStyle(slideRef.current).getPropertyValue('transform');
    if (transformMatrix !== 'none') {
      transform = parseInt(transformMatrix.split(',')[4].trim());
    }
  }
  
  const gestureMove = (e) => {
    if (moving) {
      const currentPosition = e.touches[0].pageX;
      const diff = currentPosition - initialPosition;
      const endDiff = slideRef.current.scrollWidth - slideRef.current.offsetWidth;
      if ( transform + diff <= 0 && transform + diff >= -endDiff) {
        slideRef.current.style.transform = `translateX(${transform + diff}px)`;  
      }
    }
  };
  
  const gestureEnd = (e) => {
    moving = false;
  }
  
  return (
    <Container>
      <SlideContainer 
        ref={slideRef} 
        onTouchStart={gestureStart} 
        onTouchMove={gestureMove} 
        onTouchEnd={gestureEnd}
      >
          {children}
      </SlideContainer>
    </Container>
  );
}

export default Carousel;