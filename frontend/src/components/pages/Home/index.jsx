import React from "react";
import RoomCard from "../../molecules/RoomCard";
import logo from '../../../assets/temp_logo.png';
import Carousel from '../../molecules/Carousel'


const Home = () => {
    // return <h1>Home Page</h1>
    return <>
        <RoomCard profileImg={logo} headerSize='xxs' viewerSize='sm' title='배추아저씨' num='13' thumnail='https://img.seoul.co.kr//img/upload/2020/07/22/SSI_20200722215818.jpg'/>
        <Carousel></Carousel>
    </>
}

export default Home;