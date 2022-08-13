import React from "react";
import Swipeable from "../../molecules/Swipeable";
import './TestPage.css';


const TestPage = () => {
  const onSuccess = () => {
    console.log('Yay! Swipe Success');
  }

  return (
    <div>
      <div>
        <div className='container'>
          <div className='block'>
            <Swipeable color='#6ab04c' onSuccess={onSuccess} text='SLIDE TO UNLOCK' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestPage;