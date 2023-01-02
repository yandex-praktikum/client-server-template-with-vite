import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { usePageContext } from '@src/hooks/usePageContext';
import { RoutePaths } from '@src/utils/routes';
import { FC, useState, MouseEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';

import styles from './UserMenu.module.scss';

const UserMenu: FC = () => {
  const { userInfo } = usePageContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <IconButton
        disabled={!userInfo}
        onClick={handleClick}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        <MenuItem onClick={handleClose}>
          <Link className={styles.link} to={RoutePaths.game}>Игра</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={styles.link} to={RoutePaths.leaderboard}>Лидерборд</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={styles.link} to={RoutePaths.forum}>Форум</Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
