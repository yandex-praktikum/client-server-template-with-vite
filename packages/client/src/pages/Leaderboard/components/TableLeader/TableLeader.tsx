import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { FC, memo } from 'react';

type LeaderRow = { user: string, score: number };

export const TableLeader: FC<LeaderRow> = memo(({ user, score }) => {
    return (
        <TableRow hover
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell sx={{ minWidth: 200 }}>
                {user}
            </TableCell>
            <TableCell align="left">{score}</TableCell>
        </TableRow>
    );
});
