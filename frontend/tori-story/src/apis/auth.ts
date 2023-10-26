import axios from 'apis';

const memberUrl = '/member';
interface SignUpProps {
  email: string;
  nickname: string;
  password: string;
}
export const signUpAPI = async (data: SignUpProps) => {
  const url = memberUrl + '/join';
  const res = await axios.post(url, data);
  return res;
};
