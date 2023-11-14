import { cls } from 'utils/cls';

interface ToriAssetItemProps {
  src: string;
  cnt: number;
}

export const ToriAssetItem = ({ src, cnt }: ToriAssetItemProps) => {
  return (
    <div
      className={cls(
        'w-20 px-2 py-[0.5px] flex justify-around items-center border-orange-300 border-[3px] bg-white rounded-lg font-semibold'
      )}
    >
      <img src={src} alt={src} width={24} />
      <div>{cnt}</div>
    </div>
  );
};
