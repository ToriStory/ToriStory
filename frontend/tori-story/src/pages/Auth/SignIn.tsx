import MainButton from 'components/atoms/buttons/MainButton';
import useAppNavigation from 'hooks/useAppNavigation';

const SignIn = () => {
  const navigation = useAppNavigation();
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-10'>
      <div className='w-4/5 aspect-square flex justify-center items-center border rounded-lg'>
        로그인
      </div>
      <div className=' w-4/5 flex flex-col gap-2'>
        <MainButton styleType={'orange'} forGrid onClick={() => navigation.navigateToSignin()}>
          로그인
        </MainButton>
        <MainButton styleType={'orange'} forGrid onClick={() => navigation.navigateToSignup()}>
          회원가입
        </MainButton>
      </div>
    </div>
  );
};

export default SignIn;
