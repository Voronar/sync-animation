import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import { WithSyncAnimationInjectedProps, withSyncAnimation } from './SyncAnimation/withSyncAnimation';

const blink = keyframes`
  0% {
    background: transparent;
  }

  50% {
    background: #2196F3;
  }

  100% {
    background: transparent;
  }
`;

export const BasicLamp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;

  font-weight: 500;
  font-size: 3rem;
  font-family: sans-serif;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
  will-change: box-shadow;

  &:active {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`;

const AnimatedLamp = styled(BasicLamp)`
  ${(props: { alarm: boolean, animationCycle: number }) => props.alarm && css`
    animation: ${blink} ${props.animationCycle}ms infinite;
  `}
`;

export type LampType = {
  id: string;
  name: string;
  alarm: boolean;
};

type LampProps = {
  lamp: LampType;
  onClick(lamp: LampType): void;
} & WithSyncAnimationInjectedProps;

class Lamp extends React.PureComponent<LampProps> {
  handleClick = () => {
    this.props.onClick(this.props.lamp);
  }
  render() {
    return (
      <AnimatedLamp
        onClick={this.handleClick}
        alarm={this.props.controlledTrigger}
        animationCycle={this.props.cycleTime}
      >
        {this.props.children}
      </AnimatedLamp>
    );
  }
}

export default withSyncAnimation(Lamp);
