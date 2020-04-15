const express = require('express');
const app = express();

import { getProjectWithEmployees, getBenefits } from './api'
import { loadBenefits } from './load-benefits';
// const { getProjectWithEmployees } = require('./api')

// CHAIN OF RESPONSIBILITY // pierwszy który obsłuży - zamyka temat
// middleware // każdy może coś dodać, ale tylko jeden może wysłać odpowiedź

// TODO: npmjs:yargs
const PORT = 3010

app.get('/', (req, res, next) => {
  res.send("facade")
  next() // podaj dalej
})

// part 1


// approach 2: loading both eagerly
const benefits = (async () => {
  const benefitsFromFiles = loadBenefits()
  const benefitsFromAPI = getBenefits()
  return [... await benefitsFromFiles, ... await benefitsFromAPI]
})()

app.get('/benefits', async (req, res, next) => {
      // approach 1: loading LAZILY, both files / API in parallel
  // const benefitsFromFiles = loadBenefits()
  // const benefitsFromAPI = getBenefits()
  // const benefits = [... await benefitsFromFiles, ... await benefitsFromAPI]
  res.send(await benefits)
  next()
})

// part 2
// this can work, assuming that `benefits` is an awaitable promise
app.get('/benefits/:id', async (req, res, next) => {
  const benefitId = req.params.id;
  const benefit = (await benefits).find(b => b.id == benefitId)
  res.send(benefit)
  next()
})

app.get('/projects/:id', async (req, res, next) => {
  const projectId = req.params.id
  console.log(`received request with projectId:${projectId}`)
  const project = await getProjectWithEmployees(projectId)
  res.status(200).send(project)

  next()
})

app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`)
  console.log('works correctly')
})
