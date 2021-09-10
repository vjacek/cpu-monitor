import './App.css';
import React from 'react';
import { spaces } from './spaces.js';
import { measurementsProp } from './constants';

// Show load averages for increasing time windows looking back from present
// Works the same as `top` or `htop` for average load of a given window

export default class History extends React.Component {
  static propTypes = {
    measurements: measurementsProp.isRequired
  };

  static defaultProps = {
    measurements: []
  };


  render() {

    const histories = [];
    for (let i = 1; i <= 10; i++) {
      const subset = this.props.measurements.filter((m) => {
        const limit = new Date();
        limit.setMinutes(limit.getMinutes() - i);
        return new Date(m.timestamp) > limit;
      });
      const subsetTotal = subset.reduce((accumulator, current) =>
        accumulator + current.loadAverage
        , 0);
      const subsetAvg = String((Math.round(subsetTotal / subset.length * 100) / 100).toFixed(2)).padStart(5, spaces(1));
      histories.push(subsetAvg);
    }

    return (
      <>
        <div>
          History: {spaces(9)}{histories.join(' ')}
        </div>
        <div>
          {`Window (minutes):  
          ${spaces(3)}
          ${histories.map((h, i) => i).join(spaces(5))} `}
        </div>
      </>
    );

  }
}
