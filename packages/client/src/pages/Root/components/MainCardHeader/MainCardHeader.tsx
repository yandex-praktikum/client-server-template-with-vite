import { AppBar, Toolbar, Tooltip, Typography } from '@mui/material';
import { useNavigatorOnLine } from '@src/hooks/useNavigatorOnLine';
import UserControls from '@src/pages/Root/components/MainCardHeader/components/UserControls';
import UserMenu from '@src/pages/Root/components/MainCardHeader/components/UserMenu';
import React, { FC } from 'react';

import styles from './MainCardReader.module.scss';

const OnOffIndicator = () => {
  const isOnline = useNavigatorOnLine();

  return (
    <Tooltip title={isOnline ? 'Online' : 'Offline'}>
      <div
        className={styles.indicator}
        style={{ background: isOnline ? 'limegreen' : 'indianred' }}
      />
    </Tooltip>
  );
};

interface IMainCardHeaderProps {
  pageName: string;
}

const MainCardHeader: FC<IMainCardHeaderProps> = ({ pageName }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <UserMenu />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {pageName}
        </Typography>
        <OnOffIndicator />
        <UserControls />
      </Toolbar>
    </AppBar>
  );
};

export default MainCardHeader;
