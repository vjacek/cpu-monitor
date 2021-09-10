import React from 'react';
import { ALERT_THRESHOLD, UPDATE_TIME_MS, STATUS, measurementsProp } from './constants.js';
import { spaces } from './spaces.js';

// This function could live anywhere - exported from here for availability to unit tests
// Return True if and only if every measurement in the provided array exceeds the threshold
export const getIsAlertActive = ({ measurements, window = 2 }) => {
  if (measurements.length > 0) {
    return measurements.filter((m) => {
      const limit = new Date();
      limit.setMinutes(limit.getMinutes() - window);
      return new Date(m.timestamp) > limit;
    }).every((m) =>
      m.loadAverage > ALERT_THRESHOLD
    );
  }
  else {
    return false;
  }
};

export default class Alert extends React.Component {

  static propTypes = {
    measurements: measurementsProp.isRequired,
  };

  state = {
    alertHistory: []
  }

  componentDidMount() {

    // Continuously evaluate for status
    // Would probably be better to do this in the backend since it's generating new data that would be useful to persist
    // and could end up taking a lot of processing time
    setInterval(() => {
      const alert = getIsAlertActive({ measurements: this.props.measurements });
      this.setState(prevState => {
        const newAlertHistory = prevState.alertHistory.concat([{
          timestamp: new Date(),
          status: alert ? STATUS.ALERT : STATUS.OK,
          currentLoad: this.props.currentLoad
        }]);
        return { alertHistory: newAlertHistory };
      });
    }, UPDATE_TIME_MS);

  }

  render() {

    // Only show alerts in the log if it is a new alert status, or recovery
    // This would be another excellent function to test.  In the interest of time, I'm only writing tests for getIsAlertActive()
    const alertEvents = this.state.alertHistory.filter((a, i) => {
      // First status is ALERT: new alert event started
      if (a.status === STATUS.ALERT && i === 0) {
        return true;
      }
      // Current status is ALERT and previous status was OK: new alert event started
      else if (a.status === STATUS.ALERT && i > 0 && this.state.alertHistory[i - 1] === STATUS.OK) {
        return true;
      }
      // Current status is OK and previous status was ALERT: new recovery event started
      else if (a.status === STATUS.OK && i > 0 && this.state.alertHistory[i - 1] === STATUS.ALERT) {
        return true;
      }
      else {
        return false;
      }
    });

    const displayAlerts = alertEvents.map((event) => {
      return <div key={event.timestamp}>{`!! ${event.timestamp} - ${event.status === STATUS.ALERT ? 'New Alert Event' : 'Recovered'} !!`}</div>
    });

    // Only display if there are active alert events
    return (
      <>
        {
          alertEvents.length > 0 ?
            (<>
              <div>{`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`}</div>
              <div>{`!! ALERT LOG: CPU Threshold Exceeded ${spaces(41)} !!`}</div>
              {displayAlerts}
              <div>{`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`}</div>
            </>)
            : (<></>)
        }
      </>
    );
  }

};