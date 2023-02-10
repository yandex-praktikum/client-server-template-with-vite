import { Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Error404: FC = () => {

  const navigate = useNavigate();

  const onLogin = () => { navigate('/login'); };

  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <Typography variant="h1" color="primary">404</Typography>
      <Typography variant="h2" color="primary">Не туда попали...</Typography>
      <Typography variant="h5" onClick={onLogin} color="error" sx={{ cursor: 'pointer' }}>назад в игру</Typography>
    </div>
  );
};

export default Error404;
