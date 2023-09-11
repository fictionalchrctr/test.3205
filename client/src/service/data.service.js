import httpService from './http.service'

const url = 'http://localhost:8083/api'

const DataService = {
  request: async ({ email, number }) => {
    const data = await httpService.post(url, { email, number })
    return data
  }
}

export default DataService
