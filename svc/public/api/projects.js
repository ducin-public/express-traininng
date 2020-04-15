import axios from "axios"
// const axios = require("axios").default

import { PROJECTS_SVC_URL } from  './config'

// getProject(id)
export const getProject = (id) => {
  return axios.get(`${PROJECTS_SVC_URL}/projects/${id}`)
    .then(res => res.data)
}
