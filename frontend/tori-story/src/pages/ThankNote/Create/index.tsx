import { TextField } from '@mui/material';
import { AddThankNoteProps, addThankNoteAPI } from 'apis/thankNote';
import Label from 'components/atoms/challenge/Label';
import { PlusCircle, XCircle } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateToast } from 'utils/toast';

export const CreateThankNote = () => {
  const useFormReturn = useForm({
    defaultValues: {
      thankNote: [{ content: '' }],
    },
  });

  const navigate = useNavigate();
  const { register, control, handleSubmit } = useFormReturn;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'thankNote',
    rules: {
      maxLength: 200,
    },
  });

  const addThankNote = async (data: AddThankNoteProps) => {
    const res = await addThankNoteAPI(data);
    const addThankNoteToastId = toast.loading('감사일기를 등록하는 중입니다');
    if (res.status === 201) {
      updateToast(addThankNoteToastId, '감사일기를 성공적으로 등록하였습니다!', 'success');
      navigate(-1);
    } else {
      updateToast(addThankNoteToastId, '감사일기를 등록하는 데 실패하였습니다', 'error');
    }
  };

  return (
    <div className='w-full flex pb-4 font-omyu'>
      <div className='h-full w-full fixed -z-30  left-0 top-0 flex justify-center items-center bg-white opacity-80 before:w-full before:h-full before:bg-[url("/background.jpg")] before:bg-cover before:bg-no-repeat before:bg-[center_left_30%] before:sm:bg-center before:opacity-60' />

      <form
        id='thankNoteForm'
        className='w-full h-full flex flex-col items-center gap-4'
        onSubmit={handleSubmit((data) => {
          const filteredData = data.thankNote.filter((v) => {
            if (v.content) return true;
            else return false;
          });
          const addedData = filteredData.map((v) => {
            return v.content.trim() + ' 감사합니다';
          });
          addThankNote({ thankNotes: JSON.stringify(addedData) });
        })}
      >
        <Label title='감사일기 쓰기' />
        <div className='w-full h-full  flex flex-col items-center gap-4 overflow-y-auto'>
          <ul className='w-full flex flex-col gap-4 pt-2'>
            {fields.map((field, index) => (
              <li key={field.id} className='w-full gap-2 flex justify-center items-center'>
                <div className='w-full flex relative justify-center items-center'>
                  <TextField
                    variant='outlined'
                    inputProps={{ maxLength: 200 }}
                    multiline
                    id={field.id}
                    label={`${index + 1} `}
                    className='w-full bg-white rounded [&_textarea]:pr-14'
                    {...register(`thankNote.${index}.content`)}
                  />
                  <div className='flex justify-center items-center absolute right-2 h-full w-fit text-right rounded-e border-none'>
                    감사합니다
                  </div>
                </div>
                <button className=' text-orange-400' type='button' onClick={() => remove(index)}>
                  <XCircle />
                </button>
              </li>
            ))}
          </ul>
          {fields.length < 10 && (
            <button
              className=' text-orange-400'
              type='button'
              onClick={() => append({ content: '' })}
            >
              <PlusCircle />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
