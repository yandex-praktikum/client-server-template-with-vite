import React from 'react'

import Layout from '../Layout/Layout'
import { CanvasComponent } from '../../game/CanvasComponent'

export const GamePage = () => {
  return (
    <Layout>
      <CanvasComponent />
    </Layout>
  )
}
