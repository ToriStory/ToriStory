import { Divider, Switch } from '@mui/material';
import { getNotificationSettingApi, updateNotificationSettingApi } from 'apis/challengeApi';
import { WithdrawalModal } from 'components/molecules/modals/withdrawalModal';
import { privatePolicyPage } from 'constants/pathname';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { cls } from 'utils/cls';

const Setting = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const suggestUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSeu_872x2rpOkXN7GKfCeZPniPXlQ229SUzhKS1Wj7DTvTXog/viewform';
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { data } = useSWR('/api/challenge/setting', () => getNotificationSettingApi());
  console.log(data?.data);

  const [notificationFlag, setNotificationFlag] = useState(true);

  const handleSwitchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationFlag(event.target.checked);
    const res = await updateNotificationSettingApi(event.target.checked);
    console.log(res);
  };

  const defaultSettingMenu = [
    {
      label: '토리스토리 건의함',
      onClick: () => {
        window.open(suggestUrl);
      },
    },
    {
      label: '개인정보처리방침',
      onClick: () => {
        navigate(privatePolicyPage.path);
      },
    },
  ];
  const loggedSettingMenu = [
    {
      label: '토리스토리 건의함',
      onClick: () => {
        window.open(suggestUrl);
      },
    },
    {
      label: '개인정보처리방침',
      onClick: () => {
        navigate(privatePolicyPage.path);
      },
    },
    {
      label: '탈퇴하기',
      onClick: () => {
        setOpenModal(true);
      },
    },
  ];

  return (
    <div>
      {accessToken && (
        <>
          <div className={cls('my-4')}>
            <div className={cls('flex items-center px-2')}>
              <div className='flex-grow font-omyu text-xl'>알림</div>
              <div>
                <Switch
                  name='notificationSwitch'
                  onChange={handleSwitchChange}
                  defaultChecked={notificationFlag}
                />
              </div>
            </div>
          </div>

          <Divider variant='fullWidth' />
        </>
      )}
      {accessToken
        ? loggedSettingMenu.map((menu, i) => (
            <div key={i}>
              <button onClick={menu.onClick} className='w-full flex'>
                <div className={cls('my-4 flex w-full')}>
                  <div className={cls('w-full flex items-center px-2 text-gray-800')}>
                    <div className='flex-grow font-omyu text-xl text-justify'>{menu.label}</div>
                    <ChevronRight size={24} />
                  </div>
                </div>
              </button>
              <Divider variant='fullWidth' />
            </div>
          ))
        : defaultSettingMenu.map((menu, i) => (
            <div key={i}>
              <button onClick={menu.onClick} className='w-full flex'>
                <div className={cls('my-4 flex w-full')}>
                  <div className={cls('w-full flex items-center px-2 text-gray-800')}>
                    <div className='flex-grow font-omyu text-xl text-justify'>{menu.label}</div>
                    <ChevronRight size={24} />
                  </div>
                </div>
              </button>
              <Divider variant='fullWidth' />
            </div>
          ))}
      {openModal && <WithdrawalModal openModal={openModal} setOpenModal={setOpenModal} />}
    </div>
  );
};

export default Setting;
