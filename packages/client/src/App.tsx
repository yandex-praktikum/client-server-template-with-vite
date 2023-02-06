import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import store from './store/store';
import { routes } from './utils/routes';

export default function App() {

  const router = createBrowserRouter(routes);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
