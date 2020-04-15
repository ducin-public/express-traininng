const xml2js = require('xml2js')

import { fileReader } from './FileReader'

export class XMLReader {
  constructor(fileReader){
    this.fileReader = fileReader
    this.parser = new xml2js.Parser({
      explicitArray: false
    })
  }

  async getContent(filepath){ // JSON[]
    const content = this.fileReader.getContent(filepath)
    const document = await this.parser.parseStringPromise(`<root>${content}</root>`)
    const objects = document.root.benefit
    return objects.map(({ cost: monthlyFee, name, email, ...data }) => ({
      ...data,
      beneficiary: {
        name, email
      },
      monthlyFee: parseInt(monthlyFee)
    }))
  }
}

export const xmlReader = new XMLReader(fileReader)
