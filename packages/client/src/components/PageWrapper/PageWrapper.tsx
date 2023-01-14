import { PageContext } from '@src/hooks/usePageContext';
import { useRootLoaderData } from '@src/hooks/useRootLoaderData';
import { getIsAuthorizedToAccessPage } from '@src/utils/getIsAuthorizedToAccessPage';
import { RoutePaths } from '@src/utils/routes';
import { FC, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useNavigate, useMatch } from 'react-router-dom';

import styles from './PageWrapper.module.scss';

type TPAgeWrapperProps = { children: ReactNode };

const PageWrapper: FC<TPAgeWrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRoot = !!useMatch(RoutePaths.root);

  const { userInfo, userRoutes } = useRootLoaderData();

  useEffect(() => {
    if (isRoot || !getIsAuthorizedToAccessPage(location, userRoutes.list)) {
      navigate(userRoutes.basePath);
    }
  }, [userRoutes]);

  return (
    <PageContext.Provider value={{ userInfo }}>
      <div className={styles.wrapper}>{children}</div>
    </PageContext.Provider>
  );
};

export default PageWrapper;
