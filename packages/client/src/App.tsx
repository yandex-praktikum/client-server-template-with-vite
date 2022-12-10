import { RouterProvider } from 'react-router-dom';

import { ROUTER } from './utils/routes';

export default function App() {
  return <RouterProvider router={ROUTER} />;
}
