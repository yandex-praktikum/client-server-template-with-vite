import React from 'react';

import { SingleGameCanvas } from '../../canvas/components/SingleGameCanvas/SingleGameCanvas';
import Layout from '../Layout/Layout';

export const GamePage = () => {
  return (
    <Layout>
      <SingleGameCanvas />
    </Layout>
  );
};
