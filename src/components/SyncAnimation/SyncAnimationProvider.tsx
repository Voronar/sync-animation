import React from 'react';

export const SyncAnimationContext = React.createContext<[boolean, number]>([true, 1000]);

type SyncAnimationProviderProps = {
  cycleTime: number;
};

type SyncAnimationProviderState = {
  animationReadiness: boolean;
};

export class SyncAnimationProvider extends React.PureComponent<SyncAnimationProviderProps, SyncAnimationProviderState> {
  private animationReadiness = true;
  private timerId: NodeJS.Timeout | null = null;
  private frameId: number | null = null;

  state: SyncAnimationProviderState = {
    animationReadiness: true,
  };
  componentDidMount() {
    this.timerId = setInterval(() => {
      this.animationReadiness = true;
    }, this.props.cycleTime);

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
    return (
    <SyncAnimationContext.Provider value={[this.state.animationReadiness, this.props.cycleTime]}>
      {this.props.children}
    </SyncAnimationContext.Provider>
    );
  }
}
