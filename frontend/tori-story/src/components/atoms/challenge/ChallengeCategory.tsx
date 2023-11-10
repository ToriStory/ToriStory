import { cls } from 'utils/cls';

const ChallengeCategory = ({ title }: { title: string }) => {
  return <div className={cls('px-4 mr-2 bg-orange-100 rounded-xl text-orange-600')}>{title}</div>;
};

export default ChallengeCategory;
