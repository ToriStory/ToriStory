/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from 'axios';
import { refreshAPI } from './user';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
import { updateToast } from 'utils/toast';

// Axios의 'create' 메서드를 사용하여 Axios 인스턴스 생성
const axios = Axios.create({
  baseURL: `/api`,
  withCredentials: true,
});

axios.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const jwtToken = localStorage.getItem('accessToken');
      if (jwtToken) {
        config.headers['Authorization'] = `Bearer ${jwtToken}`;
      }
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 403) {
      const refreshToastId = toast.loading('사용자 정보가 만료되어 다시 불러오는 중입니다');
      const debouncedFunction = debounce(async () => {
        const res = await refreshAPI();
        if (res.status === 200) {
          updateToast(refreshToastId, '사용자 정보를 다시 불러왔습니다!', 'success', true);
          axios.defaults.headers.common['Authorization'] = res.data.data.accessToken;
          if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', res.data.data.accessToken);
          }
        } else {
          updateToast(refreshToastId, '사용자 정보를 다시 불러오는 데 실패했습니다', 'error');
        }
      }, 1000);

      debouncedFunction();
    }
    console.log('response interceptor error', err);

    return err.response;
  }
);

// query라는 인터페이스를 정의
// 이 인터페이스는 쿼리 파라미터를 나타냄
// 문자열 키와 임의의 값(any)을 가질 수 있음
export interface query {
  [key: string]: any;
}

export default axios;
