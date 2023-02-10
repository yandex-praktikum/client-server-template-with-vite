import { FC, useEffect } from 'react';
import { useOutletContext } from 'react-router';

import { IOutletContext } from '../../utils/OutletContext';

const ProfilePage: FC = () => {
  const { setPageName } = useOutletContext<IOutletContext>();

  useEffect(() => {
    setPageName('Редактировать');
  }, []);

  return <div>PROFILE PAGE</div>;
};

export default ProfilePage;

