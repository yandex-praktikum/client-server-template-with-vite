import PageFrame from '@components/PageFrame/PageFrame'
import LeaderCard from '@components/LeaderCard/LeaderCard'
import {
  leadersMock,
  usersScoreMock
} from '@pages/leaderboard/leader-users-mock'
import classes from './styles.module.less'
import Avatar from '@components/Avatar/Avatar'

const LeaderboardPage = () => {
  return (
    <PageFrame>
      <>
        <div className={classes.leadersCardWrapper}>
          {leadersMock.map(item => (
            <LeaderCard
              user={item}
              className={classes.leadersCardWrapper__card}
            />
          ))}
        </div>
        <div className={classes.leaderboardTableWrapper}>
          {usersScoreMock.map(item => (
            <div className={classes.leaderboardTableWrapper__item}>
              <Avatar size="xs" img={item.avatar} />
              <div className={classes.leaderboardTableWrapper__name}>
                {item.name}
              </div>
              <div className={classes.leaderboardTableWrapper__score}>
                {item.score.toLocaleString('ru-RU')}
              </div>
            </div>
          ))}
        </div>
      </>
    </PageFrame>
  )
}

export default LeaderboardPage
