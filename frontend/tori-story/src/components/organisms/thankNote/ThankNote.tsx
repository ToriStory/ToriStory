import { cls } from 'utils/cls';

interface ThankNoteProps {
  content: string;
  hasName?: boolean;
}

const ThankNoteCard = ({ content, hasName = false }: ThankNoteProps) => {
  const contents = content.split(' - ');

  return (
    <div
      className={cls(
        'p-4 rounded-xl bg-white opacity-95 border-2 border-orange-400 text-lg text-orange-900'
      )}
    >
      {hasName ? (
        <>
          <div className={cls('flex justify-center items-center text-xl')}>{contents[0]}</div>
          <div className={cls('mt-1 flex justify-end items-center text-xl')}>- {contents[1]} -</div>
        </>
      ) : (
        <>
          <div className={cls('flex justify-center items-center text-xl')}>{content}</div>
        </>
      )}
    </div>
  );
};

export default ThankNoteCard;
