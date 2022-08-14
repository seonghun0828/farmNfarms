import React from "react";
import SwipeableButton from "../../atoms/SwipeableButton";
// import './TestPage.css';

const Swipeable = ({ biddingHandler, price }) => {
  const onSuccess = () => {
    console.log('Swipe Success!!');
  }

  return (
    <SwipeableButton color='#019267' biddingHandler={biddingHandler} onSuccess={onSuccess} text={price} />
  )
}

export default Swipeable;