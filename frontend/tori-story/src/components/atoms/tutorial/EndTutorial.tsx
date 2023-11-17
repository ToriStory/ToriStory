import { Clover, Smile, Sparkles } from 'lucide-react';

export const EndTutorial = () => {
  return (
    <div className='absolute bottom-64'>
      <div className='flex'>
        이제부터 토리스토리 시작해볼까? <br />
        <Sparkles size={15} />
      </div>
      <div className='flex'>
        우리 토리들은 항상 곁에 있을거야 <br />
        <Smile size={15} />
      </div>
      <div className='flex'>
        너의 도전을 항상 응원해~~
        <Clover size={15} />
      </div>
    </div>
  );
};
