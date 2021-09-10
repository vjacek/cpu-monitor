import './App.css';
import React from 'react';
import { ALERT_THRESHOLD, measurementsProp } from './constants.js';

const MAX_GRAPH_LENGTH = 50;
const DISPLAY_COUNT = 100;

// Renders a vertical graph (top is most recent) because flipping all the data horizontal isn't a good use of time for this PoC
export default class LoadGraph extends React.Component {

  static propTypes = {
    measurements: measurementsProp.isRequired
  };

  static defaultProps = {
    measurements: []
  };

  render() {
    const graph = this.props.measurements.map((m) => {
      const countFull = m.loadAverage / 2;
      const spacers = MAX_GRAPH_LENGTH - countFull;
      const color = m.loadAverage > ALERT_THRESHOLD ? 'red' : 'black';
      return <div key={m.timestamp} style={{ color: `${color}` }}> [{'#'.repeat(countFull)}{'.'.repeat(spacers)}]</div > // Fit on a line of max 50 while keeping as much resolution as possible
    }).reverse().slice(0, DISPLAY_COUNT);

    return (
      <div>
        <div>Last {DISPLAY_COUNT} measurements:</div>
        { graph}
      </div >
    );
  }
}
