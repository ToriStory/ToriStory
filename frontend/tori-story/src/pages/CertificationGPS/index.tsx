/* eslint-disable @typescript-eslint/no-explicit-any */
import { cls } from 'utils/cls';
import './gpsAnimation.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { myChallengePage } from 'constants/pathname';
import CertificationResultModal from 'components/organisms/certification/CerfiticationResultModal';
import { patchCompRandomChallengeApi } from 'apis/challengeApi';
import { Avatar } from '@mui/material';
import { orange400 } from 'constants/color';

const delayedTime: number = 4000;
const radius = 100;

const CertificationGPS = () => {
  const [result, setResult] = useState<boolean>(false);
  // const [pos, setPos] = useState<string>('주소');
  // const [pla, setPla] = useState([{ place_name: '' }]);
  const [showModal, setShowModal] = useState<boolean>(false);
  // const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    state: { keyword },
  } = useLocation();

  const cerficicate = (latitude: number, longitude: number) => {
    // 내 주변 반경 radius (m) 에 keyword가 포함된 장소 개수를 불러온다
    const options = {
      x: longitude,
      y: latitude,
      radius: radius,
    };
    const ps = new kakao.maps.services.Places();
    const callback = function (_data: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        // setPla(data);
        setResult(true);
        patchCompRandomChallengeApi();
        setShowModal(true);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        setResult(false);
        setShowModal(true);
      } else {
        alert('서버 응답에 문제가 발생했습니다.');
      }
    };
    // const geocoder = new kakao.maps.services.Geocoder();
    // geocoder.coord2Address(longitude, latitude, function (result: any, status: any) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     result[0].road_address ? setPos(result[0].road_address.address_name) : '없음';
    //   } else {
    //     alert('geolocation 응답 실패');
    //   }
    // });
    if (keyword && keyword.trim().length !== 0) {
      ps.keywordSearch(keyword, callback, options);
    }
  };

  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          cerficicate(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('위치 정보를 가져오는 동안 오류가 발생했습니다:', error.message);
        }
      );
    } else {
      console.error('브라우저에서 지오로케이션을 지원하지 않습니다.');
    }
  };

  const handleNavigate = () => {
    setShowModal(false);
    navigate(myChallengePage.path, { replace: true });
  };

  const handleRetry = () => {
    setShowModal(false);
    setTimeout(() => {
      getLocation();
    }, delayedTime);
  };

  useEffect(() => {
    setTimeout(() => {
      getLocation();
    }, delayedTime);
  }, []);

  return (
    <div className={cls('w-full h-full relative')}>
      {/* <div id='map' className='width:500px;height:400px;'></div> */}
      <div className='py-24 flex items-center justify-center bg-green-500 w-full h-full'>
        <div
          className={cls(
            'w-96 h-96 border-2 border-orange-100 rounded-full absolute z-10 animate-expand'
          )}
        ></div>
        <div
          className={cls(
            'w-72 h-72 border-2 border-orange-200 rounded-full absolute z-20 animate-expand'
          )}
        ></div>
        <div
          className={cls(
            'w-48 h-48 border-2 border-orange-300 rounded-full absolute z-30 animate-expand'
          )}
        ></div>
        <div className={cls('w-24 h-24 rounded-full z-40')}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              objectFit: 'cover',
              borderRadius: '100%',
              borderColor: orange400,
              borderWidth: 2,
            }}
            src='https://i.pinimg.com/736x/4b/af/8d/4baf8ddeb7937f55a6ca9584b58b03e6.jpg'
          />
        </div>
      </div>
      {showModal && (
        <CertificationResultModal
          result={result}
          handleNavigate={handleNavigate}
          handleRetry={handleRetry}
        />
      )}
    </div>
  );
};

export default CertificationGPS;
