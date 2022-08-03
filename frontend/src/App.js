import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Join from './components/pages/Join'
import VideoRoomComponent from './components/auction/VideoRoomComponent'
import { ThemeProvider } from "styled-components"
import theme from './common/theme'
import CreateAuctionRoom from "./components/pages/CreateAuctionRoom"
import AuctionRooms from "./components/pages/AuctionRooms"

const DUMMIES = [
  {
    title: '감자',
    quantity: 1000,
    bid_increment: 2000,
    starting_price: 10000,
  },
  {
    title: '배추',
    quantity: 2000,
    bid_increment: 1000,
    starting_price: 15000,
  },
]

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/room" element={<VideoRoomComponent items={DUMMIES}/>}/>
            <Route path="/create" element={<CreateAuctionRoom />} />
            <Route path="/auctionrooms" element={<AuctionRooms />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
