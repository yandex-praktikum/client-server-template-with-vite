import { FC, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useMatch, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { getUserInfo } from '../store/actions/auth';
import { selectUserRoutes } from '../store/selectors';
import { getIsAuthorizedToAccessPage } from '../utils/getIsAuthorizedToAccessPage';
import { RoutePaths } from '../utils/routes';

export const withAccessRights = (WrappedComponent: FC) => {
  const ResolvedComponent: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isRoot = !!useMatch(RoutePaths.root);

    const userRoutes = useAppSelector(selectUserRoutes);

    const isAuthorizedToAccess = getIsAuthorizedToAccessPage(
      location,
      userRoutes.list
    );

    useEffect(() => {
      if (isRoot || !isAuthorizedToAccess) {
        navigate(userRoutes.basePath);

        return;
      }

      dispatch(getUserInfo());
    }, [isAuthorizedToAccess]);

    return <WrappedComponent />;
  };

  return ResolvedComponent;
};
