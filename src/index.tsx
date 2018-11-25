import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { SyncAnimationProvider } from './components/SyncAnimation';

const animationCycle = 2000;

const RootApp = () => (
  <SyncAnimationProvider cycleTime={animationCycle}>
    <App title="Grid1"/>
    <App title="Grid2"/>
    <App title="Grid3"/>
  </SyncAnimationProvider>
);

ReactDOM.render(<RootApp />, document.getElementById('root'));
