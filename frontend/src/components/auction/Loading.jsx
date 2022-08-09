import React from "react";
import logo from '../../assets/로고.svg'
import './Loading.css';

const Loading = (props) => {
  return (
    <div>
      <div class="loading-wrap">
        <div class="duck-container">
            <div onClick={props.enterAuctionRoom} class="water-circle"></div>
            <img class="duck" src={logo} alt=""/>
        </div>
        <div class="loading"></div>
      </div>
    </div>
  )
}

export default Loading;