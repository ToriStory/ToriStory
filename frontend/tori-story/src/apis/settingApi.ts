import axios from 'apis';

const apiUrl = '/setting';

// 푸시 알림 설정 조회
export const getNotificationSettingApi = async () => {
  const res = await axios.get(`${apiUrl}`);
  return res;
};

// 푸시 알림 설정 수정
export const updateNotificationSettingApi = async (flag: boolean) => {
  const res = await axios.patch(`${apiUrl}`, { flag: flag });
  return res;
};
