import { AppBar, Toolbar, Typography } from '@mui/material';
import UserControls from '@src/pages/Root/components/MainCardHeader/components/UserControls';
import UserMenu from '@src/pages/Root/components/MainCardHeader/components/UserMenu';
import { FC } from 'react';

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
        <UserControls />
      </Toolbar>
    </AppBar>
  );
};

export default MainCardHeader;
