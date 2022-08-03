import { useEffect } from 'react'
import reactDom from "react-dom";
import styled from 'styled-components';



const ModalPortal = ({ children }) => {

  // 백그라운드에서 스크롤 안되게
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);
  
  const el = document.getElementById("modal");
  return reactDom.createPortal(children, el);
};

export default ModalPortal;