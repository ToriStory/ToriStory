import { BookMarkedButton } from 'components/atoms/iconButtons/BookMarkedButton';
import { QuestButton } from 'components/atoms/iconButtons/QuestButton';
import { cls } from 'utils/cls';

export const MyToriButtons = () => {
  return (
    <div className={cls('absolute top-0 right-0')}>
      <QuestButton />
      <BookMarkedButton />
    </div>
  );
};
