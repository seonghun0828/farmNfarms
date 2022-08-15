import React, { useEffect, useRef, useState } from "react";
import { TouchApp } from '@mui/icons-material';
import './Swipeable.css';

const SwipeableButton = (props) => {
  const [moving, setMoving] = useState(false);
  const [startX, setStartX] = useState();
  const buttonRef = useRef();
  const container = useRef();
  const [done, setDone] = useState(false);
  const [slideRight, setSlideRight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    setContainerWidth(container.current.clientWidth)
  }, []);

  const updateSliderStyle = () => {
    buttonRef.current.style.left = (slideRight + 50) + 'px';
  }

  const startDrag = (e) => {
    setMoving(true);
    setStartX(e.touches[0].clientX);
  }

  const onDrag = (e) => {
    if (moving) {
      setSlideRight(Math.min(Math.max(0, e.touches[0].clientX - startX), containerWidth))
      // console.log(e.touches[0].clientX, startX) 
      // console.log(containerWidth, container.current.clientWidth)
      // console.log(buttonRef.current.style.left, slideRight)
      updateSliderStyle()
    }
  }

  const endDrag = (e) => {
    setMoving(false);
    // console.log(slideRight, containerWidth, containerWidth * 0.7)
    if (slideRight > containerWidth * 0.75) {
      setSlideRight(containerWidth);
      if (props.onSuccess) {
        props.onSuccess();
        onSuccess();
      }
    } else {
      // 밀다가 도중에 다시 초기화하기 위해 setSlideRight를 동기적으로 사용
      setSlideRight((prev) => {
        buttonRef.current.style.left = 50 + 'px'
        return 0;
      });
      
    }
    updateSliderStyle();
  }

  const onSuccess = () => {
    container.current.style.width = container.current.clientWidth + 'px';
    setDone(true);
  }

  const reset = () => {
    if (done) {
      setDone((prevDone) => {
        prevDone = false;
        return prevDone;
      })
      setSlideRight(0);
      buttonRef.current.style.left = 50 + 'px';
      props.biddingHandler();
    }
  }

  const getText = () => {
    let text = "￦"+parseInt(props.text).toLocaleString('ko-KR')+"원";
    if (done) {
      return (<span><TouchApp />입찰하기</span>);
    } else if (!done && slideRight > 0) {
      return '밀기'
    }
    return text;
  }

  return (
      <div className='ReactSwipeButton'>
        <div className={'rsbContainer ' + (done ? 'rsbContainerUnlocked' : '')} ref={container} onClick={reset}>
          <div className='rsbcSlider'
            ref={buttonRef}
            onTouchStart={startDrag}
            onTouchMove={onDrag}
            onTouchEnd={endDrag}
            // 이 부분은 핸드폰에서 테스트를 하기 위해서 설정함
            onMouseDown={startDrag}
            onMouseUp={endDrag}
            onMouseMove={onDrag}
            ////////
            style={{ background: props.color }}
            >
            <span className='rsbcSliderText'>{getText()}</span>
            <span className='rsbcSliderArrow'></span>
            <span className='rsbcSliderCircle' style={{ background: props.color }}></span>
          </div>
          <div className='rsbcText'>
            {getText()}
            <div style={{fontSize: '12px', color: 'gray'}}>밀어서 입찰하기</div>
          </div>
        </div>
      </div>
  )
}

export default SwipeableButton;