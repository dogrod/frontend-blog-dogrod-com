import axios from 'axios'

const httpRequest = axios.create({
  baseURL: '/api/v1',
})

export default httpRequest