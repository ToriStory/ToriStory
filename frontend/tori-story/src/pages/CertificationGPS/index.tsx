/* eslint-disable @typescript-eslint/no-explicit-any */
import { cls } from 'utils/cls';
import './gpsAnimation.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { myChallengePage } from 'constants/pathname';
import CertificationResultModal from 'components/organisms/certification/CerfiticationResultModal';
import { patchCompRandomChallengeApi } from 'apis/challengeApi';
import { useAtomValue } from 'jotai';
import { profileToriImgUrlAtom } from 'stores/dotoriStore';
import Bush from 'assets/images/Bush.png';

const delayedTime: number = 4000;
const radius = 100;

const CertificationGPS = () => {
  const profileImg = useAtomValue<string>(profileToriImgUrlAtom);
  const [result, setResult] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
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
        <div className={cls('w-24 h-24 mt-32 z-30 absolute')}>
          <img src={Bush} alt='bush'></img>
        </div>
        <div className={cls('w-24 h-24 ml-4 z-40')}>
          <img src={profileImg} alt='profile'></img>
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
