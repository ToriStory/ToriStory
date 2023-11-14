import { cls } from 'utils/cls';

const ChallengeCategory = ({ title }: { title: string }) => {
  return <div className={cls('p-1 px-4 bg-orange-100 rounded-2xl text-orange-600')}>{title}</div>;
};

export default ChallengeCategory;
