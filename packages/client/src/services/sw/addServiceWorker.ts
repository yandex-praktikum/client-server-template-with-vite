// eslint-disable-next-line import/no-unresolved
import workerPath from './sw.worker.ts?worker&url';

export const addServiceWorker = () => {
  window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.register(workerPath, {
          type: 'module',
        });
        console.log('ServiceWorker registration successful: ', reg);
      } catch (e) {
        console.warn('ServiceWorker registration failed: ', e);
      }
    }
  });
};
