/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from 'react-hook-form';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';
interface FormInputProps extends StandardTextFieldProps {
  name: string;
  control: any;
  label: string;
  rules?: any;
}
export const FormInputText = ({ name, control, label, rules }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          size='small'
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant='outlined'
        />
      )}
    />
  );
};
