import csv from 'csvtojson'

export const readCsvFile = async (account) => {
  const { dataFilename, hasHeaders, acctId } = account

  if (hasHeaders) {
    const json = await csv({
      trim: true,
      checkType: true,
      noheader: false,
      headers: []
    }).fromFile(`data/${dataFilename}`)
    return { acctId, data: json, readCsvFileRows: json.length }
  } else {
    const json = await csv({
      trim: true,
      checkType: true,
      noheader: true,
      headers: []
    }).fromFile(`data/${dataFilename}`)
    return { acctId, data: json, readCsvFileRows: json.length }
  }
}
