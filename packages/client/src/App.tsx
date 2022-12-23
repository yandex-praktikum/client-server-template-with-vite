import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import store from './store/store';
import { ROUTER } from './utils/routes';

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={ROUTER} />
    </Provider>
  );
}
