import axios from 'axios'
import serverConfig from '../../server.config'

const httpRequest = axios.create({
  baseURL: serverConfig.baseURL,
})

export default httpRequest