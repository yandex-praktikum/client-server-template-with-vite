import { FC, useEffect } from 'react'
import { useOutletContext } from 'react-router'
import { IOutletContext } from '../../utils/OutletContext'

const Game: FC = () => {
  const { setPageName } = useOutletContext<IOutletContext>()

  useEffect(() => {
    setPageName('Играть')
  }, [])

  return <div>GAME PAGE</div>
}

export default Game
