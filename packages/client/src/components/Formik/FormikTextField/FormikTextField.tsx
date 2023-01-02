import { TextField } from '@mui/material';
import { type TextFieldProps } from '@mui/material/TextField/TextField';
import { useField } from 'formik';
import { ChangeEvent, FC, useCallback } from 'react';

type TFormikTextFieldRequiredProps = { name: string; label: string }

type TFormikTextFieldProps = TextFieldProps & TFormikTextFieldRequiredProps

const FormikTextField: FC<TFormikTextFieldProps> = ({
  name,
  label,
  onChange,
  ...props
}) => {
  const [{ value }, { error }, { setValue }] = useField(name);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setValue(event.target.value);
      onChange && onChange(event);
    },
    []
  );

  return (
    <TextField
      error={!!error}
      sx={{ mb: 1 }}
      id={name}
      label={label}
      value={value}
      variant="outlined"
      helperText={error}
      onChange={handleChange}
      {...props}
    />
  );
};

export default FormikTextField;
