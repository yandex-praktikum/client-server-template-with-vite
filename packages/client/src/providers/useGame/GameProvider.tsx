import React, { ReactNode } from 'react'
import GameContext, { GameContextType } from './GameContext'
import { GameType } from '@components/types'

interface GameContextProps extends GameContextType {
  children?: ReactNode
  setGame: React.Dispatch<React.SetStateAction<GameType>> | null
}

export const GameContextProvider = ({
  game,
  setGame,
  children,
}: GameContextProps) => {
  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  )
}
