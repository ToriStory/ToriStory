/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'apis';
import { Response } from 'types';
import { User } from 'types/user';

const memberUrl = '/member/';

interface SignUpProps {
  email: string;
  nickname: string;
  password: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpResponse extends Response {
  data: null;
}

interface SignInResponse extends Response {
  data: {
    accessToken: string;
  };
}
interface NonNullishResponse extends Response {
  data: object;
}

interface UserResponse extends Response {
  data: User;
}

interface GetUserIdResponse extends Response {
  data: {
    id: number;
  };
}

export const signUpAPI = async (data: SignUpProps) => {
  const url = memberUrl + 'join';
  const res = await axios.post<SignUpResponse>(url, data);
  return res;
};

export const signInAPI = async (data: SignInProps) => {
  const url = memberUrl + 'login';
  const res = await axios.post<SignInResponse>(url, data);
  return res;
};

export const signOutAPI = async () => {
  const url = memberUrl + 'logout';
  const res = await axios.post<NonNullishResponse>(url);
  return res;
};

export const refreshAPI = async () => {
  const url = memberUrl + 'refresh';
  const res = await axios.post<SignInResponse>(
    url,
    {},
    {
      transformRequest: [
        (data: any, headers: any) => {
          headers.Authorization = '';
          return data;
        },
      ],
    }
  );
  return res;
};

export const getUserInfoAPI = async () => {
  const url = memberUrl;
  const res = await axios.get<UserResponse>(url);
  return res.data;
};

export const getUserIdAPI = async () => {
  const url = memberUrl + 'id';
  const res = await axios.post<GetUserIdResponse>(url);
  return res;
};

export const sendAuthCodeAPI = async () => {
  const url = memberUrl + 'checkEmail';
  const res = await axios.post<NonNullishResponse>(url);
  return res;
};

export const CheckAuthCodeAPI = async () => {
  const url = memberUrl + 'checkCode';
  const res = await axios.post<NonNullishResponse>(url);
  return res;
};
