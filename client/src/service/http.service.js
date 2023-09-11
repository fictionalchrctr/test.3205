import axios from 'axios'

const http = axios.create()

const httpService = {
  get: http.get,
  post: http.post,
}

export default httpService
