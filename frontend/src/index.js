import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
<<<<<<< HEAD
import reportWebVitals from './reportWebVitals';
=======

//----------------------------------------------
// 서비스 워커 실행하는 코드
// 모킹 안할 땐 지우고 사용하면 됨
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}
//-----------------------------------------------
>>>>>>> 29fdffad71c618a1b13b59ec1537b4e04b4c92fb

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
