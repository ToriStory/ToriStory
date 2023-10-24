import AuthButtons from 'components/molecules/buttons/AuthButtons';

const Landing = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-10'>
      <div className='w-4/5 aspect-square flex justify-center items-center border rounded-lg'>
        랜딩
      </div>
      <div className=' w-4/5 flex flex-col gap-2'>
        <AuthButtons />
      </div>
    </div>
  );
};

export default Landing;
