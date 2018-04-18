import axios from 'axios'

const httpRequest = axios.create({
  baseURL: '/v1',
})

export default httpRequest