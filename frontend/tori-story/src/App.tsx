import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from 'components/organisms/Header';
import BottomTabNavigation from 'components/organisms/BottomTabNavigation';
import { pathname } from './constants/pathname';

function App() {
  const location = useLocation();
  const label = (pathname.find((item) => item.path === location.pathname) || {}).label;
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
