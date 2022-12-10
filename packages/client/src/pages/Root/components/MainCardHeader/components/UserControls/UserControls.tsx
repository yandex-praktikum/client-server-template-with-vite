import { FC } from 'react';

import Authorized from './Authorized';
import Unauthorized from './Unauthorized';

import { usePageContext } from '../../../../../../hooks/usePageContext';

const UserControls: FC = () => {
  const { userInfo } = usePageContext();

  return <>{userInfo ? <Authorized /> : <Unauthorized />}</>;
};

export default UserControls;
