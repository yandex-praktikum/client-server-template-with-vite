import React from 'react'
import classes from './styles.module.less'
import Avatar from '@components/Avatar/Avatar'
import classNames from 'classnames'

const cx = classNames.bind(classes)

type LeaderCardProps = {
  user: {
    avatar?: string
    display_name: string
    score: number
    position: 'first' | 'second' | 'third'
  }
  className?: string
}

const positionTitle = {
  first: 'First',
  second: 'Second',
  third: 'Third',
}

const LeaderCard = ({ user, className }: LeaderCardProps) => {
  const { position, avatar, display_name, score } = user
  return (
    <div className={cx(className)}>
      <div
        className={cx(classes.leaderCard, classes[`leaderCard__${position}`])}>
        <Avatar size="lg" img={avatar} />
        <div className={classes.leaderCard__name}>{display_name}</div>
        <div className={classes.leaderCard__score}>
          Score: {score.toLocaleString('ru-RU')}
        </div>
      </div>
      <div className={classes.leaderCard__position}>
        {positionTitle[position]}
      </div>
    </div>
  )
}

export default LeaderCard
