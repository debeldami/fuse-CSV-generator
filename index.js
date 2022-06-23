const axios = require('axios');
const ObjectsToCsv = require('object-to-csv');

async function csvGenegartor(address) {
  const txlistUrl = `https://explorer.fuse.io/api?module=account&action=txlist&address=${address}`;

  const tokentxUrl = `https://explorer.fuse.io/api?module=account&action=txlist&address=${address}`;

  const txlistinternalUrl = `https://explorer.fuse.io/api/?module=account&action=txlistinternal&address=${address}`;

  try {
    const [txlistData, tokentxData, txlistinternalData] = await Promise.all([
      axios.get(url).data,
      axios.get(url).data,
      axios.get(url).data,
    ]);

    const txlistCSV = new ObjectsToCsv(txlistData.result);
    const tokentxCSV = new ObjectsToCsv(tokentxData.result);
    const txlistinternalCSV = new ObjectsToCsv(txlistinternalData.result);

    await Promise.all([
      txlistCSV.toDisk(`txlist_${address.slice(0, 6)}.csv`),
      tokentxCSV.toDisk(`tokentx_${address.slice(0, 6)}.csv`),
      txlistinternalCSV.toDisk(`txlistinternal_${address.slice(0, 6)}.csv`),
    ]);
  } catch (error) {
    console.log(error.message);
  }
}

csvGenegartor('0x976C102C3D2108DBEb6620323eB086b62FBC1a03');
