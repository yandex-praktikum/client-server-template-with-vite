export function startServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const reg = await navigator.serviceWorker.register('../sw.js');
        console.info('ServiceWorker registration successful: ', reg);
      } catch (e) {
        console.error('ServiceWorker registration failed: ', e);
      }
    });
  }
}
