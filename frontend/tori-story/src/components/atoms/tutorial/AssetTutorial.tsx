import Dotori from 'assets/images/Dotori.png';
import RandomTicket from 'assets/images/RandomTicket.svg';
import TotoriTicket from 'assets/images/TotoriTicket.svg';

export const AssetTutorial = () => {
  return (
    <div className='absolute bottom-60'>
      토리스토리를 하면서 얻을 수 있는 재화를 알려줄게~
      <div className='flex'>
        <img src={Dotori} alt='도토리' className='w-5 mr-1' />{' '}
        <p>도토리: 여우에게 먹이주기/토리입양을 할 수 있어!</p>
      </div>
      <div className='flex'>
        <img src={RandomTicket} alt='랜덤티켓' className='w-5 mr-1' />{' '}
        <p>랜덤티켓: 랜덤도전과제를 갱신할 수 있어!</p>
      </div>
      <div className='flex'>
        <img src={TotoriTicket} alt='토토리티켓' className='w-5 mr-1' />{' '}
        <p>토토리티켓: 토토리를 할 수 있어!</p>
      </div>
    </div>
  );
};
