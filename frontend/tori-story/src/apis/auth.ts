import axios from 'apis';
import { AuthResponse } from 'types';

const memberUrl = '/member';
interface SignUpProps {
  email: string;
  nickname: string;
  password: string;
}
interface SignInProps {
  email: string;
  password: string;
}

interface SignUpResponse extends AuthResponse {
  data: null;
}
interface SignInResponse extends AuthResponse {
  data: {
    accessToken: string;
  };
}
export const signUpAPI = async (data: SignUpProps) => {
  const url = memberUrl + '/join';
  const res = await axios.post<SignUpResponse>(url, data);
  return res;
};
export const signInAPI = async (data: SignInProps) => {
  const url = memberUrl + '/login';
  const res = await axios.post<SignInResponse>(url, data);
  return res;
};
