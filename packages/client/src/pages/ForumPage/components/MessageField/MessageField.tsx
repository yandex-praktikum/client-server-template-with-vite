import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, InputAdornment,TextField } from '@mui/material';
import { FC } from 'react';

const MessageField: FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <TextField
        fullWidth
        multiline
        rows={3}
        InputProps={{
          endAdornment: <InputAdornment position="end">
            <IconButton
            >
              <SendIcon onClick={() => console.log('send')}/>
            </IconButton>
          </InputAdornment>,
        }}
        label="Сообщение" />
    </Box>
  );
};

export default MessageField;
