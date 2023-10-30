import { PropsWithChildren } from 'react';
import { cls } from 'utils/cls';

const AuthBackground = (props: PropsWithChildren<{ isLanding?: boolean }>) => {
  const { isLanding, children } = props;
  return (
    <div
      className={cls(
        'w-screen h-screen absolute top-0 left-0 before:block before:absolute before:w-full before:h-full before:bg-[url("/background.jpg")] before:bg-cover before:bg-no-repeat before:bg-[center_left_30%] before:sm:bg-center',
        isLanding ? 'before:opacity-100' : ' before:opacity-60'
      )}
    >
      <div className=' w-full h-full relative flex flex-col justify-center items-center p-4'>
        {children}
      </div>
    </div>
  );
};

export default AuthBackground;
