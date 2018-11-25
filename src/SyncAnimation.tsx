import React from 'react';

type SyncAnimationProps = {
  halfCycle: number;
  children(animationReadiness: boolean): React.ReactNode;
};

type SyncAnimationState = {
  animationReadiness: boolean;
};

class SyncAnimation extends React.PureComponent<SyncAnimationProps, SyncAnimationState> {
  private animationReadiness = true;
  private timerId: NodeJS.Timeout | null = null;
  private frameId: number | null = null;

  state: SyncAnimationState = {
    animationReadiness: true,
  };
  componentDidMount() {
    this.timerId = setInterval(() => {
      this.animationReadiness = true;
    }, this.props.halfCycle);

    this.frameId = requestAnimationFrame(this.tick);
  }
  tick = () => {
    if (this.animationReadiness) {
      this.animationReadiness = false;

      if (!this.state.animationReadiness) {
        this.setState({ animationReadiness: true });
      }

      this.frameId = requestAnimationFrame(this.tick);
    }

    if (this.state.animationReadiness) {
      this.setState({ animationReadiness: false });
    }

    this.frameId = requestAnimationFrame(this.tick);
  }
  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
  }
  render() {
    return this.props.children(this.state.animationReadiness);
  }
}

export default SyncAnimation;
