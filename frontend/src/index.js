import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//----------------------------------------------
// 서비스 워커 실행하는 코드
// 모킹 안할 땐 지우고 사용하면 됨
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}
//-----------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
