import { TextField } from '@mui/material';
import Label from 'components/atoms/challenge/Label';
import { PlusCircle, XCircle } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';

export const CreateThankNote = () => {
  const useFormReturn = useForm({
    defaultValues: {
      thankNote: [{ content: '' }],
    },
  });

  const { register, control, handleSubmit } = useFormReturn;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'thankNote',
    rules: {
      maxLength: 200,
    },
  });

  return (
    <div className='w-full flex pb-4'>
      <div className='h-full w-full fixed -z-30  left-0 top-0 flex justify-center items-center bg-white opacity-80 before:w-full before:h-full before:bg-[url("/background.jpg")] before:bg-cover before:bg-no-repeat before:bg-[center_left_30%] before:sm:bg-center before:opacity-60' />

      <form
        id='thankNoteForm'
        className='w-full h-full flex flex-col items-center gap-4'
        onSubmit={handleSubmit((data) => {
          const filteredData = data.thankNote.filter((v) => {
            if (v.content) return true;
            else return false;
          });
          console.log(data);
          console.log(filteredData);
        })}
      >
        <Label title='감사일기 쓰기' />
        <div className='w-full h-full  flex flex-col items-center gap-4 overflow-y-auto'>
          <ul className='w-full flex flex-col gap-4'>
            {fields.map((field, index) => (
              <li key={field.id} className='w-full gap-2 flex justify-center items-center'>
                <TextField
                  inputProps={{ maxLength: 200 }}
                  multiline
                  id={field.id}
                  label={`${index + 1} `}
                  className='w-full  bg-white rounded'
                  {...register(`thankNote.${index}.content`)}
                />
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
