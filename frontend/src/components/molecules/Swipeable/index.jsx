import React from "react";
import SwipeableButton from "../../atoms/SwipeableButton";
// import './TestPage.css';

const Swipeable = () => {
  const onSuccess = () => {
    console.log('Swipe Success!!');
  }

  return (
      <SwipeableButton color='#6ab04c' onSuccess={onSuccess} text='밀어서 입찰하기' />
  )
}

export default Swipeable;