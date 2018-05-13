// Assuming env variables
const NODE_ENV = process.env.NODE_ENV

module.exports = {
  isDev: NODE_ENV === 'development'
}