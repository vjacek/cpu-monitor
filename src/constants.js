import PropTypes from 'prop-types';

// TODO: set this to 10000 after testing
export const UPDATE_TIME_MS = 2000; // Update every 10 seconds

// Currently set very low to show what happens when an alert is triggered
export const ALERT_THRESHOLD = 5;

export const measurementsProp = PropTypes.arrayOf(
  PropTypes.shape({
    timestamp: PropTypes.string.isRequired,
    loadAverage: PropTypes.number.isRequired
  })
);

export const STATUS = {
  ALERT: 'alert',
  OK: 'ok'
};