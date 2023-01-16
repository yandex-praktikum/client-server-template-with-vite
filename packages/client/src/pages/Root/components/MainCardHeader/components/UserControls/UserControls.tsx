import { useAppSelector } from '@src/hooks/useAppSelector';
import { selectUserInfo } from '@src/store/selectors';
import { FC } from 'react';

import Authorized from './Authorized';
import Unauthorized from './Unauthorized';

const UserControls: FC = () => {
  const userInfo = useAppSelector(selectUserInfo);

  return <>{userInfo ? <Authorized /> : <Unauthorized />}</>;
};

export default UserControls;
