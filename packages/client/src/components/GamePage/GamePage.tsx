import React from 'react';

import { CanvasComponent } from '../../game/CanvasComponent';
import Layout from '../Layout/Layout';

export const GamePage = () => {
  return (
    <Layout>
      <CanvasComponent />
    </Layout>
  );
};
