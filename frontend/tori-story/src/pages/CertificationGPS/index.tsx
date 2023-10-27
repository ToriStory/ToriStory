import { cls } from 'utils/cls';
import './gpsAnimation.css';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { myChallengePage } from 'constants/pathname';

interface CertificationGPSResponse {
  result: boolean;
}

const CertificationGPS = () => {
  const navigate = useNavigate();
  const {
    state: { id, type },
  } = useLocation();

  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          sendRequest(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('위치 정보를 가져오는 동안 오류가 발생했습니다:', error.message);
        }
      );
    } else {
      console.error('브라우저에서 지오로케이션을 지원하지 않습니다.');
    }
  };

  const sendRequest = (latitude: number, longitude: number) => {
    const requestDto = {
      latitude: latitude,
      longitude: longitude,
      challengeId: id,
      challengeType: type,
    };

    console.log(requestDto); // api 요청
    const response: CertificationGPSResponse = { result: false };
    if (response.result === true) {
      // 성공 모달
      console.log('성공');
    } else {
      // 실패 모달
      console.log('실패');
    }
  };

  useEffect(() => {
    getLocation();
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
