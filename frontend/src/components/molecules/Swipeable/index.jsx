import React, { useEffect, useRef, useState } from "react";
import SwipeButton from "../../atoms/SwipeButton";
import { TouchApp, Forward } from '@mui/icons-material';
import './Swipeable.css';

const Swipeable = (props) => {
  const [moving, setMoving] = useState(false);
  const [startX, setStartX] = useState();
  const buttonRef = useRef();
  const container = useRef();
  const [done, setDone] = useState(false);
  const [slideRight, setSlideRight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    setContainerWidth(container.current.clientWidth - 50)
  }, []);

  const updateSliderStyle = () => {
    // if (this.unmounted || this.state.unlocked) return;
    buttonRef.current.style.left = (slideRight + 50) + 'px';
  }

  const startDrag = (e) => {
    setMoving(true);
    setStartX(e.touches[0].clientX);
    console.log('dd');
  }

  const onDrag = (e) => {
    if (moving) {
      setSlideRight(Math.min(Math.max(0, e.touches[0].clientX - startX), containerWidth))
    }
  }

  const endDrag = (e) => {
    setMoving(false);
    if (slideRight > containerWidth * 0.9) {
      setSlideRight(containerWidth);
      if (props.onSuccess) {
        props.onSuccess();
        onSuccess();
      }
    } else {
      setSlideRight(0);
    }
    updateSliderStyle();
  }

  const onSuccess = () => {
    container.current.style.width = container.current.clientWidth + 'px';
    setDone(true);
  }

  const reset = () => {
    // if (this.unmounted) return;
    setDone((prev) => {
      prev = false;
      setSlideRight(0);
      updateSliderStyle();
    })
  }

  const getText = () => {
    return done ? (props.text || 'UNLOCKED') : (props.text || 'SLIDE')
  }

  return (
    <div ref={container}>
      {/* <div id="swipe" 
        ref={buttonRef} 
        onTouchStart={startDrag}
        onTouchMove={onDrag}
        onTouchEnd={endDrag}
      >
        <TouchApp></TouchApp>
        <Forward></Forward>
        ??
        <SwipeButton></SwipeButton>
      </div> */}
      <div className='ReactSwipeButton'>
        <div className={'rsbContainer ' + (!done ? 'rsbContainerUnlocked' : '')} ref={container}>
          <div className='rsbcSlider'
            ref={buttonRef}
            onTouchStart={startDrag}
            onTouchMove={onDrag}
            onTouchEnd={endDrag}
            style={{ background: props.color }}
            >
            <span className='rsbcSliderText'>{getText()}</span>
            <span className='rsbcSliderArrow'></span>
            <span className='rsbcSliderCircle' style={{ background: props.color }}></span>
          </div>
          <div className='rsbcText'>{getText()}</div>
        </div>
      </div>
    </div>
  )
}

export default Swipeable;