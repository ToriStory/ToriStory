import { cls } from 'utils/cls';

interface ToriAssetItemProps {
  src: string;
  cnt: number;
}

export const ToriAssetItem = ({ src, cnt }: ToriAssetItemProps) => {
  return (
    <div
      className={cls(
        'px-2 py-[0.5px] w-24 flex justify-around items-center border-orange-300 border-[3px] bg-white rounded-lg font-semibold'
      )}
    >
      <img className={cls('mr-3')} src={src} alt={src} width={24} />
      <div className={cls('m-auto')}>{cnt}</div>
    </div>
  );
};
