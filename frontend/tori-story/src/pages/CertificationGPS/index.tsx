import { cls } from 'utils/cls';
import './gpsAnimation.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { myChallengePage } from 'constants/pathname';
import CertificationResultModal from 'components/organisms/certification/CerfiticationResultModal';
import { patchCompRandomChallengeApi } from 'apis/challengeApi';
import kakaoMap from 'hooks/kakaoMap';

const { kakao } = window;
const delayedTime: number = 5000;
const radius = 100;

const CertificationGPS = () => {
  const [result, setResult] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    state: { keyword },
  } = useLocation();

  const cerficicate = async (latitude: number, longitude: number) => {
    // 내 주변 반경 radius (m) 에 keyword가 포함된 장소 개수를 불러온다
    const options = {
      x: longitude,
      y: latitude,
      radius: radius,
      sort: kakao.maps.services.SortBy.DISTANCE,
    };
    const placeCount: number = await kakaoMap.getPlaceCountByKeyword(keyword, options);
    if (placeCount > 0) {
      setResult(true);
      patchCompRandomChallengeApi();
    } else {
      setResult(false);
    }

    setShowModal(true);
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
        <div className={cls('w-24 h-24 border-2 bg-orange-600 rounded-full z-40')}></div>
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
