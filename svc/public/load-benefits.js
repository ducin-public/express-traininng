const path = require('path');
const { flatMap } = require('../../lib/lang')
import { csvReader, yamlReader, xmlReader, jsonReader } from './file'

const benefitFile = (countryCode, extension) => path.join(
  __dirname,
  `../../data-imports/benefits-${countryCode}.${extension}`
)

export const loadBenefits = async () => {
  let benefits = []
  // - single file:
  // const filepath = benefitFile('DE', 'yaml')
  // const benefits = yamlReader.getContent(filepath)

  // - multiple files:
  const filesYAML = [
    benefitFile('DE', 'yaml'),
    benefitFile('ES', 'yaml'),
  ]
  benefits = benefits.concat(
    flatMap(filesYAML, f => yamlReader.getContent(f)) // no native flatMap in node
  )

  const filesCSV = [
    benefitFile('FR', 'csv'),
    benefitFile('IT', 'csv'),
  ]

  for (let promise of flatMap(filesCSV, f => csvReader.getContent(f))) {
    benefits = benefits.concat(await promise)
  }

  const filesXML = [
    benefitFile('NL', 'xml'),
    benefitFile('PL', 'xml'),
  ]

  for (let promise of flatMap(filesXML, f => xmlReader.getContent(f))) {
    benefits = benefits.concat(await promise)
  }

  const filesJSON = [
    benefitFile('UK', 'json'),
    benefitFile('US', 'json'),
  ]
  benefits = benefits.concat(
    flatMap(filesJSON, f => jsonReader.getContent(f)) // no native flatMap in node
  )

  return benefits
}
