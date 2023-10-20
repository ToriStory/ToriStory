/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from 'axios';
// import { refreshTokenApi } from "./refreshApi";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { debounce } from "utils/debounce";

// Axios의 'create' 메서드를 사용하여 Axios 인스턴스 생성
const axios = Axios.create({
  baseURL: `/backend/v1/api`,
  // validateStatus: (status) => status < 500,
  withCredentials: true,
});

axios.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const jwtToken = localStorage.getItem('accessToken');
      if (jwtToken) {
        config.headers['Authorization'] = jwtToken;
      }
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// const notify = () => toast("사용자 정보가 만료되어 다시 갱신합니다.");
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log('response interceptor error', err);
    // if (err.response.status === 403) {
    //   const refresh = async (token: string) => {
    //     const res = await refreshTokenApi(token);
    //     if (res.status === 200) {
    //       axios.defaults.headers.common[`Authorization`] = res.data.accessToken;
    //       if (typeof window !== "undefined") {
    //         localStorage.setItem("accessToken", res.data.accessToken);
    //         localStorage.setItem("refreshToken", res.data.refreshToken);
    //       }
    //       notify();
    //     }
    //   };
    //   if (typeof window !== "undefined") {
    //     const refreshToken = localStorage.getItem("refreshToken");
    //     if (refreshToken) {
    //       const debouncedFunction = debounce(refresh(refreshToken), 1000);
    //       debouncedFunction();
    //     }
    //   }
    // }
    return err;
  }
);

// query라는 인터페이스를 정의
// 이 인터페이스는 쿼리 파라미터를 나타냄
// 문자열 키와 임의의 값(any)을 가질 수 있음
export interface query {
  [key: string]: any;
}

// secondArgsFetcher 함수는 함수(func)를 입력으로 받아 새로운 함수를 반환하는 함수
// 반환된 함수는 두 개의 인자를 받으며,
// 첫 번째 인자(url)는 무시되고, 두 번째 인자(args)는 입력으로 받은 함수(func)에 전달
export function secondArgsFetcher<T, TT>(func: (a: T) => TT) {
  return (url: any, args: T) => func(args);
}

export default axios;
