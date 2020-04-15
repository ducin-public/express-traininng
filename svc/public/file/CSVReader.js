const csv = require('csvtojson')

import { fileReader } from './FileReader'

export class CSVReader {
  constructor(fileReader){
    this.fileReader = fileReader
  }

  async getContent(filepath){ // JSON[]
    const content = this.fileReader.getContent(filepath)
    const objects = await csv().fromString(content)
    return objects.map(({ cost: monthlyFee, name, email, ...data }) => ({
      ...data,
      beneficiary: {
        name, email
      },
      monthlyFee: parseInt(monthlyFee)
    }))
  }
}

export const csvReader = new CSVReader(fileReader)
