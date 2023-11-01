/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const kakaoMap = {
  getPlaceCountByKeyword(keyword: string, options: any): Promise<number> {
    const ps = new kakao.maps.services.Places();

    return new Promise((resolve, reject) => {
      const callback = function (data: any, status: any) {
        if (status === kakao.maps.services.Status.OK) {
          resolve(data.length);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          resolve(0);
        } else {
          reject(new Error('서버 응답에 문제가 발생했습니다.'));
        }
      };

      ps.keywordSearch(keyword, callback, options);
    });
  },
};

export default kakaoMap;
