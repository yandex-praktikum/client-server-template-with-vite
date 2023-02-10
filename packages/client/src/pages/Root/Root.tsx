import { Card } from '@mui/material';
import { FC, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router';

import MainCardHeader from './components/MainCardHeader';
import styles from './Root.module.scss';

import PageWrapper from '../../components/PageWrapper';
import { RuntimeError } from '../../components/RuntimeError/RuntimeError';
import { withAccessRights } from '../../HOCs';

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
