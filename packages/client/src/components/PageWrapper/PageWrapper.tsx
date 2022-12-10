import { FC, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useNavigate, useMatch } from 'react-router-dom';

import styles from './PageWrapper.module.scss';

import { PageContext } from '../../hooks/usePageContext';
import { useRootLoaderData } from '../../hooks/useRootLoaderData';
import { getIsAuthorizedToAccessPage } from '../../utils/getIsAuthorizedToAccessPage';
import { ROUTE_PATHS } from '../../utils/routes';

type TPAgeWrapperProps = { children: ReactNode }

const PageWrapper: FC<TPAgeWrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRoot = !!useMatch(ROUTE_PATHS.root);

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
