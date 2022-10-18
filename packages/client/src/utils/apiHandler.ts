import { useNavigate } from 'react-router-dom';

export function handleError(error: XMLHttpRequest) {
  const navigate = useNavigate();

  if (!error.response) {
    return navigate('/500');
  }

  const { reason } = JSON.parse(error.response);
  console.error(reason);

  return Promise.reject(error);
}
