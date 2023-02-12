import { Card } from '@mui/material';
import PageWrapper from '@src/components/PageWrapper';
import RuntimeError from '@src/components/RuntimeError';
import { withAccessRights } from '@src/HOCs';
import { FC, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router';

import MainCardHeader from './components/MainCardHeader';
import styles from './Root.module.scss';

const Root: FC = () => {
  const [pageName, setPageName] = useState('');

  return (
    <ErrorBoundary FallbackComponent={RuntimeError} >
    <PageWrapper>
      <Card variant="outlined" className={styles.wrapper}>
        <MainCardHeader pageName={pageName} />
        <Outlet context={{ setPageName }} />
      </Card>
    </PageWrapper>
    </ErrorBoundary>
  );
};

export default withAccessRights(Root);
