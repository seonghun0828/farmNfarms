import React from 'react';
import SwipeableButton from './SwipeableButton'
import './TestPage.css';

function TestPage() {

  return (
    <div className="App">
      <div className='container'>
        <div className='block'>
          <SwipeableButton color='#6ab04c' text='SLIDE TO UNLOCK' />
        </div>
      </div>
    </div>
  );
}

export default TestPage;