import { GameType } from '@/components/types'
import { createContext } from 'react'

export type GameContextType = {
  game: GameType | null
  setGame?: React.Dispatch<React.SetStateAction<GameType>> | null
}

const GameContext = createContext<{
  game: GameType | null
  setGame?: React.Dispatch<React.SetStateAction<GameType>> | null
}>({
  game: {
    score: 0,
  },
})

export default GameContext
