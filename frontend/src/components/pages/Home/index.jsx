import React from "react";
import RoomCard from "../../molecules/RoomCard";
import logo from '../../../assets/temp_logo.png';
import styled from "styled-components";
import Navbar from '../../molecules/Navbar'
import SearchBar from '../../molecules/SearchBar'
import Text from '../../atoms/Text'

const StyledHome = styled.div`

`
const FlexSearchArea = styled.div`
    ${({theme}) => theme.flex.rowCenter}
    height: 5rem;
`
const SearchArea = styled.div`
    width: 90%;
`
const Home = () => {
    return (
    <StyledHome>
        <Navbar url={logo} isLogin imgSize='xs' fontSize='sm' mode='graytext' />
        <FlexSearchArea>
            <SearchArea>
                <SearchBar />
            </SearchArea>
        </FlexSearchArea>
        <Text>빨리 들어와유</Text>
        <RoomCard profileImg={logo} headerSize='xxs' viewerSize='sm' title='배추아저씨' num='13' thumnail='https://img.seoul.co.kr//img/upload/2020/07/22/SSI_20200722215818.jpg'/>
    </StyledHome>)
}

export default Home;