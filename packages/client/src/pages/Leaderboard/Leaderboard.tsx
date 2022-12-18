import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FC, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router';

import { TableLeader } from './components/TableLeader';
import styles from './Leaderboard.module.scss';

import { IOutletContext } from '../../utils/OutletContext';

export const Leaderboard: FC = () => {
    const { setPageName } = useOutletContext<IOutletContext>();

    useEffect(() => {
        setPageName('Лидерборд');
    }, []);

    const tableRows = useMemo(() =>
        rows.map(({ userId, user, score }) =>
            <TableLeader user={user} score={score} key={userId} />)
        , [rows]
    );

    return (
        <div className={styles.wrapper}>
            <TableContainer>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 600 }}>Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {tableRows}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

function createData(
    userId: number,
    user: string,
    score: number,
) {
    return { userId, user, score };
}

//temporary MockData for Leaderboard Page
const rows = [
    createData(1, 'Frozen', 159),
    createData(2, 'Icecream2', 256),
    createData(3, 'Eclair1', 269),
    createData(4, 'Cupcake', 305),
    createData(5, 'Gingerbread', 356),
    createData(6, 'Yyoghurt2', 159),
    createData(7, 'Sandwich', 237),
    createData(8, 'Eclair2', 262),
    createData(9, 'Foghurt', 159),
    createData(10, 'Sandwich3', 256),
    createData(11, 'Eclair3', 262),
];
