import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Join from './components/pages/Join'
import Input from './components/atoms/Input'
function App() {
  return (
    <div className="App">
      <Input size={'small'}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
