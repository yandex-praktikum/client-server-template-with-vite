import { GameFinalScreen } from './GameFinalScreen/GameFinalScreen';
import { LeaderRow } from './LeaderRow/LeaderRow';
import { TLeaderData } from './types';
import { useStyles } from './useStyles';

import { useGetAllQuery } from '../../services/redux/queries/leaderboard.api';
import { useAppSelector } from '../../services/redux/store';
import { Loader } from '../Loader/Loader';

export const LeaderboardPage = () => {
  const { data: leaders, isLoading } = useGetAllQuery('');
  const styles = useStyles();
  const { lastScore } = useAppSelector(state => state.common);
  const isFinalScreen = lastScore && lastScore.length;

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      {isFinalScreen && <GameFinalScreen playersResult={lastScore} />}
      <div className={styles.leaderBoard}>
        <div className={styles.header}>
          <div className={styles.top5}>
            top<span>10</span>
          </div>
          <div className={styles.title}>leader board</div>
        </div>
        {leaders.length ? (
          leaders.map((gamer: TLeaderData, index: number) => {
            const { username, login = 'Unnamed user', points } = gamer.data;

            return (
              <LeaderRow
                key={`${username}-${login}`}
                username={username || login}
                points={points}
                position={index + 1}
              />
            );
          })
        ) : (
          <p className={styles.plug}>
            There is no any leader yet.<span>So,</span> you can be the first one!
          </p>
        )}
      </div>
    </div>
  );
};
