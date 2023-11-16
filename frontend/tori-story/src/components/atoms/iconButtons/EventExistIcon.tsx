import { cls } from 'utils/cls';

const EventExistIcon = ({ displayFlag }: { displayFlag: boolean }) => {
  return (
    <>
      {displayFlag && (
        <div className={cls(`relative`)}>
          <div
            className={cls('rounded-full w-3 h-3 absolute bg-red-400 -top-1 -right-1 animate-ping')}
          ></div>
          <span className='absolute z-10 -top-1 -right-1 inline-flex rounded-full h-3 w-3 bg-red-400'></span>
        </div>
      )}
    </>
  );
};

export default EventExistIcon;
