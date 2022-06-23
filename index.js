const axios = require('axios');
const ObjectsToCsv = require('objects-to-csv');

async function csvGenegartor(address) {
  const txlistUrl = `https://explorer.fuse.io/api?module=account&action=txlist&address=${address}`;

  const tokentxUrl = `https://explorer.fuse.io/api?module=account&action=txlist&address=${address}`;

  const txlistinternalUrl = `https://explorer.fuse.io/api/?module=account&action=txlistinternal&address=${address}`;

  try {
    const [txlistData, tokentxData, txlistinternalData] = await Promise.all([
      axios.get(txlistUrl),
      axios.get(tokentxUrl),
      axios.get(txlistinternalUrl),
    ]);

    const txlistCSV = new ObjectsToCsv(txlistData.data.result);
    const tokentxCSV = new ObjectsToCsv(tokentxData.data.result);
    const txlistinternalCSV = new ObjectsToCsv(txlistinternalData.data.result);

    await Promise.all([
      txlistCSV.toDisk(`txlist_${address.slice(0, 6)}.csv`),
      tokentxCSV.toDisk(`tokentx_${address.slice(0, 6)}.csv`),
      txlistinternalCSV.toDisk(`txlistinternal_${address.slice(0, 6)}.csv`),
    ]);

    console.log('succesfully generated CSV files');
  } catch (error) {
    console.log(error.message);
  }
}

//replace address with the required one
csvGenegartor('0xD418c5d0c4a3D87a6c555B7aA41f13EF87485Ec6');
