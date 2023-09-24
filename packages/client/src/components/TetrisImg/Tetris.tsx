import React from 'react'
import tetrisImg from '../../../public/TetrisImg.png'
import classes from './styles.module.less'

const Tetris: React.FC = () => {
  return (
    <div className={classes.tetris}>
      <img src={tetrisImg} />
    </div>
  )
}

export default Tetris
