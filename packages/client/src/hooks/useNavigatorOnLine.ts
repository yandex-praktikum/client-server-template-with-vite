import { useEffect, useState } from 'react';

const CHECK_ONLINE_STATUS_PARAM = 'check-online';

const getOnLineStatus = () => (typeof navigator !== 'undefined' ? navigator.onLine : true);

function getRandomString() {
  return Math.random().toString(36).substring(2, 15);
}

async function isOnline() {
  if (!window.navigator.onLine) {
    return false;
  }

  // avoid CORS errors with a request to your own origin
  const url = new URL(window.location.origin);

  // random value to prevent cached responses
  url.searchParams.set(CHECK_ONLINE_STATUS_PARAM, getRandomString());

  return await fetch(url.toString(), { method: 'HEAD' });
}

export const useNavigatorOnLine = () => {
  const [status, setStatus] = useState(getOnLineStatus());

  const setOnline = () => {
    setStatus(true);
  };

  const setOffline = () => {
    setStatus(false);
  };

  useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    isOnline().then(setOnline).catch(setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);

  return status;
};
