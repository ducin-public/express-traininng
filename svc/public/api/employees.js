import axios from "axios"
// const axios = require("axios").default

import { EMPLOYEES_SVC_URL } from  './config'

// getEmployee(id)
export const getEmployee = async (id) => {
  const res = await axios.get(`${EMPLOYEES_SVC_URL}/employees/${id}`)
  return res.data
}

// getEmployees(id[]) employees?id=X&id=Y...
