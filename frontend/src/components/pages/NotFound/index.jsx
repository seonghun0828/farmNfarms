import { useLocation } from 'react-router-dom';

// 임시
const NotFound = () => {

  const { pathname } = useLocation();
  return (<div>존재하지 않는 페이지 입니다.-{pathname}</div>);
}

export default NotFound;