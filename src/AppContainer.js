import React from 'react';
import App from './App.js';
import { getLoadAverage } from './requests.js';
import { UPDATE_TIME_MS } from './constants.js';

const OBSERVATION_WINDOW_M = 10; // Only keep the last 10 minutes of data

class AppContainer extends React.Component {

  state = {
    measurements: [],
  };

  // Add new measurements to the data set
  // Check if any measurements have fallen out of the observation window and remove them
  addMeasurement(measurement) {
    this.setState((prevState) => {
      const newMeasurements = prevState.measurements.concat([measurement]); // Using concat because it returns a new array
      newMeasurements.filter((m) => {
        const limit = new Date();
        limit.setMinutes(limit.getMinutes() - OBSERVATION_WINDOW_M);
        return new Date(m.timestamp) > limit
      });
      return { measurements: newMeasurements };
    });
  }


  componentDidMount() {
    // Get initial measurement, and set up 10 second updates

    getLoadAverage().then((data) => {
      this.addMeasurement(data);
    });

    setInterval(() => {
      getLoadAverage().then((data) => {
        this.addMeasurement(data);
      })
    }, UPDATE_TIME_MS);
  }



  render() {
    console.log(this.state.measurements);
    return this.state.measurements.length > 0 ? <App measurements={this.state.measurements} /> : <> Loading! </>
  }

}

export default AppContainer;