import { getProjectWithEmployees } from ".";

jest.mock('./projects', () => ({
  getProject: (id) => Promise.resolve({})
}))

describe('API', () => {
  it('should fetch projects with employee data', () => {
    // Dependency Injection
    // Parameter Injection
    expect(getProjectWithEmployees('345673567')).toBe('xyz')
  });
});
