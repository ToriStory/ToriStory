interface ThankNoteProps {
  content: string;
}

const ThankNoteCard = ({ content }: ThankNoteProps) => {
  return (
    <div className=' bg-white relative opacity-95 border-orange-400 border-2 rounded-xl px-4 py-2 my-4'>
      <div className=' flex justify-center items-center text-2xl my-2'>{content}</div>
    </div>
  );
};

export default ThankNoteCard;
