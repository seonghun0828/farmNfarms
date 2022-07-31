import logo from './logo.svg';
import './App.css';
import VideoRoomComponent from './components/auction/VideoRoomComponent';
// import AuctionTimer from './components/auctiontimer/AuctionTimer';

const DUMMY_DATA = [
  {
    title: '감자',
    quantity: 1000,
    starting_price: 10000,
    bid_increment: 1000,
  },
  {
    title: '배추',
    quantity: 2000,
    starting_price: 40000,
    bid_increment: 2000,
  }
]

function App() {
  return (
    <div className="App">
      <VideoRoomComponent items={DUMMY_DATA}></VideoRoomComponent>
      {/* <AuctionTimer></AuctionTimer> */}
    </div>
  );
}

export default App;
