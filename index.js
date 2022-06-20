const express = require('express');
const app = express();
app.use(express.json());
const { asyncHandler, getUnixTimestamp } = require('./utils');

const PORT = 3000;

app.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const { address, action, from, to } = req.body;
    let url;

    console.log(`${address} ${action} ${from} ${to}`);

    if (!(address && action && from && to)) {
      return res.status(400).json({
        status: 'error',
        message: 'Please specify all the necessary parameters',
      });
    }

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
