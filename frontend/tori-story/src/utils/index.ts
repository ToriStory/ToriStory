import axios from 'apis';

// index
export const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
  delete axios.defaults.headers.Authorization;
};
