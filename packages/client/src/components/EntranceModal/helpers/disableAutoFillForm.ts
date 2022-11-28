import type { BaseTextFieldProps } from '@mui/material';

export const disableAutoFillFormProps: BaseTextFieldProps['inputProps'] = {
  readOnly: true,
  onFocus: event => (event.currentTarget.readOnly = false),
  onBlur: event => (event.currentTarget.readOnly = true),
  autoComplete: 'off',
};
