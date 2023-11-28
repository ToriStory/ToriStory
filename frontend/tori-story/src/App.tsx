import './App.css';
// import 'utils/fcm';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from 'components/organisms/Header';
import BottomTabNavigation from 'components/organisms/BottomTabNavigation';
import { myToriPage, pathname } from './constants/pathname';
import { useEffect } from 'react';

function App() {
  const location = useLocation();
  const label = (pathname.find((item) => item.path === location.pathname) || {}).label;

  const navigate = useNavigate();
  useEffect(() => {
    const isInitialRoute = localStorage.getItem('isInitialRoute');
    console.log(isInitialRoute);
    if (isInitialRoute !== 'F') {
      localStorage.setItem('isInitialRoute', 'F');
      navigate(myToriPage.path, { replace: true });
    }
  }, [navigate]);

  return (
    <div className=' w-full h-full py-14'>
      <Header pathname={label!} />
      <div className='w-full h-full pt-4 px-4'>
        <Outlet />
      </div>
      <BottomTabNavigation pathname={label!} />
    </div>
  );
}

export default App;
