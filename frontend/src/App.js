import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Join from './components/pages/Join'
import VideoRoomComponent from './components/auction/VideoRoomComponent'
import { ThemeProvider } from "styled-components"
import theme from './common/theme'
import CreateAuctionRoom from "./components/pages/CreateAuctionRoom"

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/room" element={<VideoRoomComponent/>}/>
            <Route path="/create" element={<CreateAuctionRoom />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
