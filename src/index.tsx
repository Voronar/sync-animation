import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { SyncAnimationProvider } from './components/SyncAnimation/SyncAnimationProvider';

const RootApp = () => (
  <React.Fragment>
    <SyncAnimationProvider cycleTime={1000}>
      <App title="App1 (cycle 1000ms)"/>
      <App title="App2 (cycle 1000ms)"/>
    </SyncAnimationProvider>
    <SyncAnimationProvider cycleTime={2000}>
      <App title="App3 (cycle 2000ms)"/>
      <App title="App4 (cycle 2000ms)"/>
    </SyncAnimationProvider>
  </React.Fragment>
);

ReactDOM.render(<RootApp />, document.getElementById('root'));
