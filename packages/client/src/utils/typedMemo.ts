import { memo } from 'react'

export const typedMemo: <T>(component: T) => T = memo
