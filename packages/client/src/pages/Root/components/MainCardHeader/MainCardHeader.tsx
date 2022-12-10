import { AppBar, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';

import UserControls from './components/UserControls';
import UserMenu from './components/UserMenu';

interface IMainCardHeaderProps {
  pageName: string
}

const MainCardHeader: FC<IMainCardHeaderProps> = ({ pageName }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <UserMenu />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {pageName}
        </Typography>
        <UserControls />
      </Toolbar>
    </AppBar>
  );
};

export default MainCardHeader;
