import { useEffect, useState } from 'react';

const CHECK_ONLINE_STATUS_PARAM: TCheckOnlineParam = 'check-online';

function getRandomString() {
  return Math.random().toString(36).substring(2, 15);
}

function runCheckIsOnline(setOnline: () => void, setOffline: () => void) {
  // avoid CORS errors with a request to your own origin
  const url = new URL(window.location.origin);

  // random value to prevent cached responses
  url.searchParams.set(CHECK_ONLINE_STATUS_PARAM, getRandomString());

  fetch(url.toString(), { method: 'HEAD' }).then(setOnline).catch(setOffline);

  setTimeout(() => {
    runCheckIsOnline(setOnline, setOffline);
  }, 10000);
}

export const useNavigatorOnLine = () => {
  if (import.meta.env.SSR) {
    return false;
  }

  const [status, setStatus] = useState(window?.navigator?.onLine ?? false);

  const setOnline = () => {
    setStatus(true);
  };

  const setOffline = () => {
    setStatus(false);
  };

  useEffect(() => {
    runCheckIsOnline(setOnline, setOffline);
  }, []);

  return status;
};
