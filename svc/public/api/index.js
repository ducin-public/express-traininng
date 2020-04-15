import { getProject } from "./projects"
import { getEmployee } from "./employees"

// public.js
export const getProjectWithEmployees = async (projectId) => {
  let projectData = await getProject(projectId)
  const manager = await getEmployee(projectData.manager)

  const promises = projectData.team.map(({ id }) => getEmployee(id))
  const team = await Promise.all(promises)
  const result = {
    ...projectData,
    team,
    manager
  }

  return result
}

// native node.js
// module.exports = {
//   getProjectWithEmployees
// }

// ES6 (re-exports)
export * from './employees'
export * from './projects'
export * from './benefits'
