import logo from './logo.svg';
import './App.css';
import VideoRoomComponent from './components/auction/VideoRoomComponent';
// import AuctionTimer from './components/auctiontimer/AuctionTimer';

const DUMMY_DATA = {
  qantity: 1000,
  starting_price:10000,
  bid_increment:1000,
}

function App() {
  return (
    <div className="App">
      <VideoRoomComponent data={DUMMY_DATA}></VideoRoomComponent>
      {/* <AuctionTimer></AuctionTimer> */}
    </div>
  );
}

export default App;
