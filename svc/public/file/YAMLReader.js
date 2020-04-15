const yaml = require('js-yaml')
import { fileReader } from './FileReader'

export class YAMLReader {
  constructor(fileReader){
    this.fileReader = fileReader
  }

  getContent(filepath){
    const content = this.fileReader.getContent(filepath)
    const objects = yaml.safeLoad(content)
    return objects.map(({ cost: monthlyFee, name, email, ...data }) => ({
      ...data,
      beneficiary: {
        name, email
      },
      monthlyFee: parseInt(monthlyFee)
    }))
  }
}

export const yamlReader = new YAMLReader(fileReader)
