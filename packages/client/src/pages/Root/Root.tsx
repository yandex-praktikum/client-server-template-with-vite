import { Card } from '@mui/material';
import { FC, useState } from 'react';
import { Outlet } from 'react-router';

import MainCardHeader from './components/MainCardHeader';
import styles from './Root.module.scss';

import PageWrapper from '../../components/PageWrapper';
import { withAccessRights } from '../../HOCs';

const Root: FC = () => {
  const [pageName, setPageName] = useState('');

  return (
    <PageWrapper>
      <Card variant="outlined" className={styles.wrapper}>
        <MainCardHeader pageName={pageName} />
        <Outlet context={{ setPageName }} />
      </Card>
    </PageWrapper>
  );
};

export default withAccessRights(Root);
