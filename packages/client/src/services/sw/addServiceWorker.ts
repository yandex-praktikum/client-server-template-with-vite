export const addServiceWorker = () => {
  window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.register('../sw.js');
        console.log('ServiceWorker registration successful: ', reg);
      } catch (e) {
        console.warn('ServiceWorker registration failed: ', e);
      }
    }
  });
};
