import { Location } from '@remix-run/router';

export const getIsAuthorizedToAccessPage = (
  location: Location,
  accessRights: string[]
): boolean => accessRights.indexOf(location.pathname) !== -1;
