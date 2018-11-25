import React from 'react';

type SyncAnimationProps = {
  duration: number;
  children(animationReadiness: boolean): React.ReactNode;
};

type SyncAnimationState = {
  animationReadiness: boolean;
};

class SyncAnimation extends React.PureComponent<SyncAnimationProps, SyncAnimationState> {
  private timestamp = -1;
  state: SyncAnimationState = {
    animationReadiness: true,
  };
  componentDidMount() {
    requestAnimationFrame(this.tick);
  }
  tick = (time: number) => {
    if (time - this.timestamp === 2000) {
    }
    // console.log('ready', time);

    this.timestamp = time;
    requestAnimationFrame(this.tick);
  }
  render() {
    return this.props.children(true);
  }
}

export default SyncAnimation;
