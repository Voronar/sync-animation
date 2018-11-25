import React from 'react';
import uuidv1 from 'uuid/v1';
import { Lamp, LampsGrid, StyledLamp, LampType } from './styled';
import SyncAnimation from './SyncAnimation';

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
  handleAlarmToggle = (toggledLamp: LampType) => {
    this.setState(state => ({
      ...state,
      lamps: state.lamps.map(lamp => lamp.id === toggledLamp.id ? {
        ...lamp,
        alarm: !lamp.alarm,
      } : lamp),
    }));
  }

  // tslint:disable:jsx-no-multiline-js
  render() {
    const lamps = (
      <SyncAnimation halfCycle={2000}>
        {readiness => this.state.lamps.map(lamp => (
          <Lamp
            key={lamp.id}
            lamp={lamp}
            animationReadiness={readiness}
            onClick={this.handleAlarmToggle}
          >
            <div>{lamp.name}</div>
          </Lamp>
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
