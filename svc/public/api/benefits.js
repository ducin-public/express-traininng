import axios from "axios"
// const axios = require("axios").default

import { BENEFITS_SVC_URL } from  './config'

export const getBenefits = async () => {
  const res = await axios.get(`${BENEFITS_SVC_URL}/benefits`)
  return res.data
}
