import { fileReader } from './FileReader'

export class JSONReader {
  constructor(fileReader){
    this.fileReader = fileReader
  }

  getContent(filepath){ // JSON[]
    const content = this.fileReader.getContent(filepath)
    const objects = JSON.parse(content)
    return objects.map(({ cost: monthlyFee, name, email, ...data }) => ({
      ...data,
      beneficiary: {
        name, email
      },
      monthlyFee: parseInt(monthlyFee)
    }))
  }
}

export const jsonReader = new JSONReader(fileReader)
