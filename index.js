const express = require('express');
const axios = require('axios');
const ObjectsToCsv = require('objects-to-csv');

const app = express();
app.use(express.json());
const { asyncHandler } = require('./utils');

const PORT = 3000;

app.get(
  '/',
  asyncHandler(async (req, res, next) => {
    let url;

    const { address, action, hash } = req.body;

    if (!(address && action)) {
      return res.status(400).json({
        status: 'error',
        message: 'Please specify all the necessary parameters',
      });
    }

    if (action === 'txlistinternal') {
      url = `https://explorer.fuse.io/api?module=account&action=${action}&txhash=${hash}`;
    } else {
      url = `https://explorer.fuse.io/api?module=account&action=${action}&address=${address}`;
      console.log(url);
    }

    try {
      const { result } = (await axios.get(url)).data;

      console.log(result);

      const csv = new ObjectsToCsv(result);

      await csv.toDisk(`./${address.slice(0, 6)}_${action}_${Date.now()}.csv`);

      res.json({
        message: 'CSV generated',
      });
    } catch (error) {
      res.json({
        message: 'An error occur, check the information you provided',
      });
    }
  })
);

app.listen(PORT, () => {
  console.log(`listening at ${PORT}...`);
});
