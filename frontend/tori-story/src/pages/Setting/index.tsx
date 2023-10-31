import { Divider } from '@mui/material';
import { ChevronRight } from 'lucide-react';
import { cls } from 'utils/cls';

const Setting = () => {
  // const [notificationFlag, setNotificationFlag] = useState(true);
  const suggestUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSeu_872x2rpOkXN7GKfCeZPniPXlQ229SUzhKS1Wj7DTvTXog/viewform';
  // const notificationResult = useSWR('userNotificationStatus', () => getNotificationSettingApi());

  // const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setNotificationFlag(event.target.checked);
  // };

  return (
    <div>
      {/* <div className={cls('my-4')}>
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
      <Divider variant='fullWidth' /> */}
      <div className={cls('my-4')}>
        <div className={cls('flex items-center px-2 text-gray-800')}>
          <div className='flex-grow font-omyu text-xl'>토리스토리 건의함</div>
          <button
            onClick={() => {
              window.open(suggestUrl);
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <Divider variant='fullWidth' />
    </div>
  );
};

export default Setting;
