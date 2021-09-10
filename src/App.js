import './App.css';
import React from 'react';
import LoadGraph from './LoadGraph.js';
import History from './History.js';
import Alert from './Alert.js';
import { spaces } from './spaces.js';
import { measurementsProp } from './constants.js';

export default class App extends React.Component {

  static propTypes = {
    measurements: measurementsProp.isRequired
  };

  static defaultProps = {
    measurements: []
  };

  render() {
    const lastLoadAverage = this.props.measurements[this.props.measurements.length - 1].loadAverage;
    return (
      <div className='App'>
        <Alert measurements={this.props.measurements} />
        <div className='spacer'>
          {`Current CPU Load: ${String(lastLoadAverage).padStart(5, spaces(1))}`}
          <History measurements={this.props.measurements} />
        </div>
        <div className='spacer'>
          <LoadGraph measurements={this.props.measurements} />
        </div>
      </div>
    );
  }
}