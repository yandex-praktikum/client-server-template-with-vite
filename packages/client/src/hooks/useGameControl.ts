import { GameEndEvent } from '@src/game_modules/types';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { setLeaderOntoBoard } from '@src/store/actions/leaders';
import { setScore } from '@src/store/reducers/game.reducer';
import { selectUserInfo, selectGameScore } from '@src/store/selectors';

export const useGameControl = (): { handleEndOfGame: (e: GameEndEvent) => void } => {
    const dispatch = useAppDispatch();
    const score = useAppSelector(selectGameScore);
    const userProfile = useAppSelector(selectUserInfo);
    const { id, login } = userProfile ?? {};

    const handleEndOfGame = (e: GameEndEvent) => {
        if (e.gameScore > score) {
            dispatch(setScore(e.gameScore));

            if (id && login) {
                dispatch(setLeaderOntoBoard(id, login, e.gameScore));
            }
        }

    };

    return {
        handleEndOfGame,
    };
};
