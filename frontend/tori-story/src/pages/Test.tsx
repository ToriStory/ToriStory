import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { atom, useAtom } from 'jotai';
import { ChangeEvent } from 'react';

const textAtom = atom('hello');
const uppercaseAtom = atom((get) => get(textAtom).toUpperCase());

const Input = () => {
  const [text, setText] = useAtom(textAtom);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  return <input value={text} onChange={handleChange} />;
};

const Uppercase = () => {
  const [uppercase] = useAtom(uppercaseAtom);
  return <div>Uppercase: {uppercase}</div>;
};

function Test() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className='text-3xl font-bold underline bg-red-500'>Test 화면입니다.</h1>
      <Button variant='contained' onClick={() => navigate('/')}>
        홈으로 이동
      </Button>
      <Input />
      <Uppercase />
    </div>
  );
}

export default Test;
