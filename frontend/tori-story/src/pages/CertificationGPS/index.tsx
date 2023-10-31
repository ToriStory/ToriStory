import { cls } from 'utils/cls';
import './gpsAnimation.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myChallengePage } from 'constants/pathname';
// import { patchCompRandomChallengeApi } from 'apis/challengeApi';

type Location = {
  latitude: number;
  longitude: number;
};

const CertificationGPS = () => {
  const [curLocation, setCurLocation] = useState<Location>();
  const navigate = useNavigate();

  const sendCertificationResult = (result: boolean) => {
    if (result === true) {
      console.log('성공');
      // patchCompRandomChallengeApi();
    } else {
      console.log('실패');
    }
  };

  const cerficicate = (): boolean => {
    const latitude = curLocation?.latitude;
    const longitude = curLocation?.longitude;
    let result = false;
    //로직
    result = true;
    console.log(result, latitude, longitude);
    return result;
  };

  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const current: Location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCurLocation(current);
        },
        (error) => {
          console.error('위치 정보를 가져오는 동안 오류가 발생했습니다:', error.message);
        }
      );
    } else {
      console.error('브라우저에서 지오로케이션을 지원하지 않습니다.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (curLocation) {
      const result = cerficicate();
      sendCertificationResult(result);
    }
  }, [curLocation]);

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
        <div
          className={cls('w-24 h-24 border-2 bg-orange-600 rounded-full z-40')}
          onClick={() => navigate(myChallengePage.path, { replace: true })}
        >
          취소
        </div>
        <div
          className={cls('w-24 h-24 border-2 bg-orange-600 rounded-full z-40')}
          onClick={getLocation}
        >
          다시 시도
        </div>
        <div
          className={cls('w-24 h-24 border-2 bg-orange-600 rounded-full z-40')}
          onClick={() => navigate(myChallengePage.path, { replace: true })}
        >
          확인
        </div>
      </div>
    </div>
  );
};

export default CertificationGPS;
