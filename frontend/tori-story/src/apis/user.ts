/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'apis';
import { signInPage } from 'constants/pathname';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import { Response } from 'types';
import { User } from 'types/user';
import { removeAccessToken } from 'utils';
import { updateToast } from 'utils/toast';

const memberUrl = '/member/';

interface SignUpProps {
  code: string;
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

export interface EmailProps {
  email: string;
}

interface CheckAuthCodeProps {
  code: string;
  email: string;
}

interface UpdateUserProps {
  nickname: string;
  password: string;
}

// export interface ResetPasswordProps {
//   password: string;
// }

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

export const refreshAPI = debounce(async () => {
  const url = memberUrl + 'refresh';

  removeAccessToken();
  const res = await axios.post<SignInResponse>(url);
  if (res.status === 200) {
    const refreshToastId = toast.loading('사용자 정보가 만료되어 다시 불러오는 중입니다');
    updateToast(
      refreshToastId,
      '사용자 정보를 다시 불러왔습니다! 페이지를 다시 불러옵니다',
      'success',
      true
    );
    axios.defaults.headers.common['Authorization'] = res.data.data.accessToken;
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', res.data.data.accessToken);
    }
  } else {
    const refreshToastId = toast.loading('사용자 정보가 만료되어 다시 불러오는 중입니다');
    updateToast(
      refreshToastId,
      `사용자 정보를 다시 불러오는 데 실패하여 로그아웃합니다.
      다시 로그인 해주세요`,
      'error',
      false,
      () => location.replace(signInPage.path)
    );
    removeAccessToken();
  }
}, 1000);

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

export const sendAuthCodeAPI = async (data: EmailProps) => {
  const url = memberUrl + 'checkEmail';
  const res = await axios.post<NonNullishResponse>(url, data);
  return res;
};

export const checkAuthCodeAPI = async (data: CheckAuthCodeProps) => {
  const url = memberUrl + 'checkCode';
  const res = await axios.post<NonNullishResponse>(url, data);
  return res;
};

export const withdrawalAPI = async () => {
  const url = memberUrl;
  const res = await axios.delete<NonNullishResponse>(url);
  return res;
};

export const updateUserAPI = async (data: UpdateUserProps) => {
  const url = memberUrl;
  const res = await axios.put<NonNullishResponse>(url, data);
  return res;
};

// export const findPasswordAPI = async (data: EmailProps) => {
//   const url = memberUrl + '';
//   const res = await axios.post<NonNullishResponse>(url, data);
//   return res;
// };

// export const resetPasswordAPI = async (data: ResetPasswordProps) => {
//   const url = memberUrl + '';
//   const res = await axios.post<NonNullishResponse>(url, data);
//   return res;
// };
