import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { withAccessRights } from '@src/HOCs';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { getLeadersList } from '@src/store/actions/leaders';
import { selectLeaders } from '@src/store/selectors';
import { IOutletContext } from '@src/utils/OutletContext';
import { FC, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router';

import { TableLeader } from './components/TableLeader';
import styles from './Leaderboard.module.scss';

const Leaderboard: FC = () => {
  const { setPageName } = useOutletContext<IOutletContext>();
  const leaders = useAppSelector(selectLeaders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setPageName('Лидерборд');
    dispatch(getLeadersList());
  }, []);

  const tableRows = useMemo(() =>
    leaders.map(({ id, user, score }) =>
      <TableLeader user={user} score={score} key={id} />)
    , [leaders]
  );

  return (
    <div className={styles.wrapper}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
              <TableCell align="left" sx={{ fontWeight: 600 }}>
                Score
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default withAccessRights(Leaderboard);
