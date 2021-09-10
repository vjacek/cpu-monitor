const { getIsAlertActive } = require('../Alert.js');

const mockDate = new Date();

const mockAlertMeasurements = [
  {
    "timestamp": mockDate,
    "loadAverage": 18.22
  },
  {
    "timestamp": mockDate,
    "loadAverage": 18.22
  },
  {
    "timestamp": mockDate,
    "loadAverage": 18.9
  },
  {
    "timestamp": mockDate,
    "loadAverage": 18.9
  },
  {
    "timestamp": mockDate,
    "loadAverage": 17.59
  },
  {
    "timestamp": mockDate,
    "loadAverage": 17.59
  }
];

const mockOkMeasurements = [
  {
    "timestamp": mockDate,
    "loadAverage": 1
  },
  {
    "timestamp": mockDate,
    "loadAverage": 1
  },
  {
    "timestamp": mockDate,
    "loadAverage": 1
  },
  {
    "timestamp": mockDate,
    "loadAverage": 1
  },
  {
    "timestamp": mockDate,
    "loadAverage": 1
  },
  {
    "timestamp": mockDate,
    "loadAverage": 1
  }
];

const mockMixedMeasurements = [
  {
    "timestamp": mockDate,
    "loadAverage": 1
  },
  {
    "timestamp": mockDate,
    "loadAverage": 1
  },
  {
    "timestamp": mockDate,
    "loadAverage": 1
  },
  {
    "timestamp": mockDate,
    "loadAverage": 70
  },
  {
    "timestamp": mockDate,
    "loadAverage": 71
  },
  {
    "timestamp": mockDate,
    "loadAverage": 72
  }
];

const mockOldDate = new Date();
mockOldDate.setMinutes(mockOldDate.getMinutes() - 30);
const mockOldMeasurements = [
  {
    "timestamp": mockOldDate,
    "loadAverage": 1
  },
  {
    "timestamp": mockOldDate,
    "loadAverage": 1
  },
  {
    "timestamp": mockOldDate,
    "loadAverage": 1
  },
  {
    "timestamp": mockDate,
    "loadAverage": 70
  },
  {
    "timestamp": mockDate,
    "loadAverage": 71
  },
  {
    "timestamp": mockDate,
    "loadAverage": 72
  }
];


test('Alert is triggered when measurements exceed threshold', () => {
  expect(getIsAlertActive({ measurements: mockAlertMeasurements })).toBe(true);
});

test('Alert is not triggered when measurements do not exceed threshold', () => {
  expect(getIsAlertActive({ measurements: mockOkMeasurements })).toBe(false);
});

test('Alert is not triggered when some measurements within the window do not exceed threshold', () => {
  expect(getIsAlertActive({ measurements: mockMixedMeasurements })).toBe(false);
});

test('Alert is triggered when some measurements outside the window do not exceed threshold, but all within window do', () => {
  expect(getIsAlertActive({ measurements: mockOldMeasurements })).toBe(true);
});

test('Alert is not triggered when no measurements are provided', () => {
  expect(getIsAlertActive({ measurements: [] })).toBe(false);
});