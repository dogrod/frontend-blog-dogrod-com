// Application config file
module.exports = {
  // Port of koa server
  port: 9001,
  // Webpack bundle directory
  bundleDir: 'dist',
  // Forward url for server
  forward: {
    api: 'http://api.example.com',
  }
}