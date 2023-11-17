/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from 'axios';
import { refreshAPI } from './user';

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
let isRefreshing = 0; // flag to check if we are already refreshing the token

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log('refresh Test', isRefreshing);
    if (isRefreshing > 0) {
      return err;
    }

    if (err.response.status === 403) {
      isRefreshing += 1;
      console.log('refresh');
      const refresh = async () => {
        refreshAPI();
      };

      refresh();
    }
    console.log('response interceptor error', err);

    return err;
  }
);

// query라는 인터페이스를 정의
// 이 인터페이스는 쿼리 파라미터를 나타냄
// 문자열 키와 임의의 값(any)을 가질 수 있음
export interface query {
  [key: string]: any;
}

export default axios;
