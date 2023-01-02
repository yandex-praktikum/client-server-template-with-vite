import { usePageContext } from '@src/hooks/usePageContext';
import { FC } from 'react';

import Authorized from './Authorized';
import Unauthorized from './Unauthorized';

const UserControls: FC = () => (
  usePageContext().userInfo ? <Authorized /> : <Unauthorized />
);

export default UserControls;
