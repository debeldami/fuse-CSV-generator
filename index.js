const express = require('express');
const app = express();
app.use(express.json());
const { asyncHandler, getUnixTimestamp } = require('./utils');

const PORT = 3000;

app.get(
  '/transactions',
  asyncHandler(async (req, res, next) => {
    const { address, from, to } = req.body;

    const fromTimeStamp = getUnixTimestamp(from);
    const toTimeStamp = getUnixTimestamp(to);

    res.status(200).json({
      message: 'hellow world',
    });
  })
);

app.get(
  '/internal-transactions',
  asyncHandler(async (req, res, next) => {
    const { address, from, to } = req.body;

    const fromTimeStamp = getUnixTimestamp(from);
    const toTimeStamp = getUnixTimestamp(to);

    res.status(200).json({
      message: 'hellow world',
    });
  })
);

app.get(
  '/token-transfer',
  asyncHandler(async (req, res, next) => {
    const { address, from, to } = req.body;

    const fromTimeStamp = getUnixTimestamp(from);
    const toTimeStamp = getUnixTimestamp(to);

    res.status(200).json({
      message: 'hellow world',
    });
  })
);

app.listen(PORT, () => {
  console.log(`listening at ${PORT}...`);
});
