// import { DotoriBox } from 'components/atoms/Box/DotoriBox';
// import { MyToriButtons } from 'components/molecules/buttons/MyToriButtons';

const MyTori = () => {
  return (
    <div className='relative'>
      <div className='fixed -z-10 bg-[#fff3ed] inset-0 flex justify-center items-center bg-[url("/removeTree.png")] bg-center bg-no-repeat bg-cover inset-y-16 -bottom-16' />
      {/* <DotoriBox />
      <MyToriButtons /> */}
    </div>
  );
};

export default MyTori;
