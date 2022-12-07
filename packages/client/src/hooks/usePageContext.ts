import { createContext, useContext } from 'react'
import { TPageContext } from '../types/pageContext'

export const PageContext = createContext<TPageContext>({ userInfo: null })

export const usePageContext = () => useContext(PageContext)
