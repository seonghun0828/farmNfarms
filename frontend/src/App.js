import logo from './logo.svg';
import './App.css';
import VideoRoomComponent from './components/auction/VideoRoomComponent';
import Chatting from './components/chat/Chatting';

function App() {
  return (
    <div className="App">
      <VideoRoomComponent></VideoRoomComponent>
      {/* <Chatting></Chatting> */}
    </div>
  );
}

export default App;
