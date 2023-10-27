import AuthBackground from 'components/atoms/background/AuthBackground';
import AuthButtons from 'components/molecules/buttons/AuthButtons';

const Landing = () => {
  return (
    // <div className='w-screen h-screen flex flex-col justify-center items-center gap-10 bg-[url("/background.jpg")] bg-cover bg-no-repeat bg-[center_left_-16rem] sm:bg-center'>
    <AuthBackground isLanding>
      <div className='w-4/5 aspect-square flex justify-center items-center border rounded-lg bg-opacity-50 bg-white'>
        <img src='/logo.png' className='object-cover' />
      </div>
      <div className=' w-4/5 flex flex-col gap-2'>
        <AuthButtons />
      </div>
    </AuthBackground>
  );
};

export default Landing;
