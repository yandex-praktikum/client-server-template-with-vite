import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import '@styles/styles.less'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const imgUrl = new URL('../sw.js', import.meta.url).href
    navigator.serviceWorker
      .register(imgUrl, { scope: './' })
      .then(registration => {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        )
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error)
      })
  })
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
