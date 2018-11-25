import React from 'react';
import uuidv1 from 'uuid/v1';
import Lamp, { LampType, BasicLamp } from './Lamp';
import { LampsGrid } from './styled';

type AppProps = {
  title: string;
};

type AppState = {
  lamps: LampType[];
};

class App extends React.PureComponent<AppProps, AppState> {
  state: AppState = {
    lamps: Array(10).fill(0).map((_, i) => ({
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

  render() {
    const lamps = this.state.lamps.map(lamp => (
      <Lamp
        key={lamp.id}
        lamp={lamp}
        controlledTrigger={lamp.alarm}
        onClick={this.handleAlarmToggle}
      >
        <div>{lamp.name}</div>
      </Lamp>
    ));

    return (
      <div>
        <h1>{this.props.title}</h1>
        <LampsGrid>
          <BasicLamp onClick={this.addNewLamp}>
            <div>+</div>
          </BasicLamp>
          <BasicLamp onClick={this.removeLamp}>
            <div>-</div>
          </BasicLamp>
          {lamps}
        </LampsGrid>
      </div>
    );
  }
}

export default App;
