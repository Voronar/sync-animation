import React from 'react';
import uuidv1 from 'uuid/v1';
import { StyledLamp, LampsGrid } from './styled';
import SyncAnimation from './SyncAnimation';

type LampType = {
  id: string;
  alarm: boolean;
  name: string;
};

type AppState = {
  lamps: LampType[];
};

class App extends React.PureComponent<{}, AppState> {
  state: AppState = {
    lamps: Array(20).fill(0).map((_, i) => ({
      id: uuidv1(),
      alarm: false,
      name: i.toString(),
    })),
  };
  addNewLamp = () => {
    this.setState(state => ({
      ...state,
      lamps: [...state.lamps, {
        id: uuidv1(),
        alarm: false,
        name: state.lamps.length.toString(),
      }],
    }));
  }
  removeLamp = () => {
    this.setState(state => ({
      ...state,
      lamps: state.lamps.slice(0, state.lamps.length - 1),
    }));
  }
  handleAlarmToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    const index = e.currentTarget.dataset['id'];

    if (index !== undefined) {
      this.setState(state => ({
        ...state,
        lamps: state.lamps.map(lamp => lamp.id === index ? {
          ...lamp,
          alarm: !lamp.alarm,
        } : lamp),
      }));
    }
  }

  // tslint:disable:jsx-no-multiline-js
  render() {
    const lamps = (
      <SyncAnimation duration={1}>
        {() => this.state.lamps.map(lamp => (
          <StyledLamp
            data-id={lamp.id}
            key={lamp.id}
            alarm={lamp.alarm}
            onClick={this.handleAlarmToggle}
          >
            <div>{lamp.name}</div>
          </StyledLamp>
        ))}
      </SyncAnimation>
    );

    return (
      <LampsGrid>
        <StyledLamp alarm={false} onClick={this.addNewLamp}>
          <div>+</div>
        </StyledLamp>
        <StyledLamp alarm={false} onClick={this.removeLamp}>
          <div>-</div>
        </StyledLamp>
        {lamps}
      </LampsGrid>
    );
  }
}

export default App;
