import React from 'react';
import styled, { keyframes, css } from 'styled-components';

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

const lampSizePx = 100;

export const LampsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${lampSizePx}px, 1fr));
  grid-gap: 20px;
  grid-auto-rows: ${lampSizePx}px;
`;

export type LampType = {
  id: string;
  alarm: boolean;
  name: string;
};

type LampProps = {
  lamp: LampType;
  animationReadiness: boolean;
  onClick(lamp: LampType): void;
};

type LampState = {
  alarm: boolean;
};

export class Lamp extends React.PureComponent<LampProps, LampState> {
  constructor(props: LampProps) {
    super(props);

    this.state = {
      alarm: props.lamp.alarm,
    };
  }
  componentDidUpdate(prevProps: LampProps) {
    if (prevProps.animationReadiness !== this.props.animationReadiness && this.props.animationReadiness) {

      if (prevProps.lamp.alarm !== this.state.alarm) {
        this.setState({
          alarm: this.props.lamp.alarm,
        });
      }
    }
  }
  handleClick = () => {
    this.props.onClick(this.props.lamp);
  }
  render() {
    return (
      <StyledLamp
        onClick={this.handleClick}
        alarm={this.state.alarm}
      >
        {this.props.children}
      </StyledLamp>
    );
  }
}

export const StyledLamp = styled.div`
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

  ${(props: { alarm: boolean }) => props.alarm && css`
    animation: ${blink} 2s linear infinite;
  `}

  &:active {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`;
