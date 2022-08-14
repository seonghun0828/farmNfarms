import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Join from './components/pages/Join';
import VideoRoomComponent from './components/auction/VideoRoomComponent';
import { ThemeProvider } from 'styled-components';
import theme from './common/theme';
import CreateAuctionRoom from './components/pages/CreateAuctionRoom';
import AuctionRooms from './components/pages/AuctionRooms';
import Mypage from './components/pages/Mypage';
import Price from "./components/pages/Price"
import NotFound from "./components/pages/NotFound"
import UpdateProfile from './components/pages/UpdateProfile';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reissue from '../src/common/reissue'
import History from './components/pages/History';
import TestPage from './components/pages/TestPage/TestPage';
import apiPath from './common/apiPath';
import Success from './components/pages/PayResult/Success';
import Cancel from './components/pages/PayResult/Cancel';
import Fail from './components/pages/PayResult/Fail';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('isLogin')) {
      console.log('로그인 돼있네유');
      reissue(dispatch);
    }
  }, [dispatch]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route
              path="/room"
              element={<VideoRoomComponent />}
            />
            <Route path="/create" element={<CreateAuctionRoom />} />
            <Route path="/auctionrooms" element={<AuctionRooms />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/price" element={<Price />} />
            <Route path="/mypage/update" element={<UpdateProfile />}/>
            <Route path="/history" element={<History />}/>
            <Route path="/test" element={<TestPage />}/>
            <Route path={apiPath.pay.pay() + "success"} element={<Success />}/>
            <Route path={apiPath.pay.pay() + "cancel"} element={<Cancel />}/>
            <Route path={apiPath.pay.pay() + "fail"} element={<Fail />}/>
            <Route path="/*" element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
