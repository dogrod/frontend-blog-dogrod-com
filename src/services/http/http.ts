import axios from 'axios'
import constants from '../../dev-constants'

const env = process.env.NODE_ENV || 'local'
const baseURL = constants[env]

const httpRequest = axios.create({
  baseURL,
})

export default httpRequest