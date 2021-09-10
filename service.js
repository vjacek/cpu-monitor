const os = require('os');
const express = require('express');
const app = express();
const port = 3001;

app.get('/cpu-average', (req, res) => {
  const cpus = os.cpus().length;
  const loadAverage = Math.round(os.loadavg()[0] / cpus * 100) / 100;
  res.status(200).send({ timestamp: new Date(), loadAverage });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});