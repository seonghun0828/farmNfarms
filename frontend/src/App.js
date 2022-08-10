import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import PayTest from "./components/pages/PayTest"
import UpdateProfile from './components/pages/UpdateProfile';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import reissue from '../src/common/reissue'

const DUMMIES = [
  {
    title: '감자',
    grade: '특등',
    quantity: 1000,
    bid_increment: 2000,
    starting_price: 10000,
  },
  {
    title: '배추',
    grade: '1등급',
    quantity: 2000,
    bid_increment: 1000,
    starting_price: 15000,
  },
];
// axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    reissue(dispatch);
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
              element={<VideoRoomComponent items={DUMMIES} />}
            />
            <Route path="/create" element={<CreateAuctionRoom />} />
            <Route path="/auctionrooms" element={<AuctionRooms />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/price" element={<Price />} />
            <Route path="/mypage/update" element={<UpdateProfile />} />
            <Route path="/pay-test" element={<PayTest />} />
            <Route path="/*" element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
