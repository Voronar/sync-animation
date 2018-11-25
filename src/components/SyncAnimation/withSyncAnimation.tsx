import React from 'react';
import { SyncAnimationContext } from './SyncAnimationProvider';
import { Omit } from 'types/helpers';

type WithSyncAnimationProps = {
  animationReadiness: boolean;
};

type WithAutoSyncTriggerProps = {
  controlledTrigger: boolean;

};
type WithSyncAnimationProviderProps = {
  cycleTime: number;
};

type WithAutoSyncTriggerState = {
  controlledTrigger: boolean;
};

const withAutoSyncTrigger = <ExtendedProps extends WithAutoSyncTriggerProps & WithSyncAnimationProviderProps>(
  SourceComponent: React.ComponentType<ExtendedProps>,
) => {
  type WithAutoSyncTriggerHocProps =
    & Omit<ExtendedProps, keyof (WithAutoSyncTriggerProps & WithSyncAnimationProviderProps)>
    & WithAutoSyncTriggerProps
    & WithSyncAnimationProviderProps
    // & WithSyncAnimationProps
  ;

  class WithAutoSyncTriggerHoc extends React.PureComponent<WithAutoSyncTriggerHocProps, WithAutoSyncTriggerState> {
    constructor(props: WithAutoSyncTriggerHocProps) {
      super(props);

      this.state = {
        controlledTrigger: props.controlledTrigger,
      };
    }
    componentDidUpdate(prevProps: WithAutoSyncTriggerHocProps) {
      if (prevProps.animationReadiness !== this.props.animationReadiness && this.props.animationReadiness) {

        if (prevProps.controlledTrigger !== this.state.controlledTrigger) {
          this.setState({
            controlledTrigger: this.props.controlledTrigger,
          });
        }
      }
    }
    render() {
      return (
        <SourceComponent
          {...this.props}
          controlledTrigger={this.state.controlledTrigger}
        >
          {this.props.children}
        </SourceComponent>
      );
    }
  }

  return WithAutoSyncTriggerHoc;
};

// tslint:disable:jsx-wrap-multiline
// tslint:disable:jsx-no-multiline-js
export const withSyncAnimation = <ExtendedProps extends WithAutoSyncTriggerProps & WithSyncAnimationProviderProps>(
  SourceComponent: React.ComponentType<ExtendedProps>,
) => {
  type WithSyncAnimationHocProps =
    & Omit<ExtendedProps, keyof (WithAutoSyncTriggerProps & WithSyncAnimationProviderProps)>
    & WithSyncAnimationProviderProps
    & WithAutoSyncTriggerProps
  ;

  const EnhancedComponent = withAutoSyncTrigger(SourceComponent);

  class WithSyncAnimationHoc extends React.PureComponent<WithSyncAnimationHocProps> {
    render() {
      return (
        <SyncAnimationContext.Consumer>
          {([animationReadiness, cycleTime]) => (
            <EnhancedComponent
              {...this.props}
              animationReadiness={animationReadiness}
              cycleTime={cycleTime}
            >
              {this.props.children}
            </EnhancedComponent>
          )}
        </SyncAnimationContext.Consumer>
      );
    }
  }

  return WithSyncAnimationHoc;
};

export type WithSyncAnimationInjectedProps = WithAutoSyncTriggerProps & WithSyncAnimationProviderProps;
