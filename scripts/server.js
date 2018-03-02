// Reference: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment
const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(process.cwd(), 'build')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'build', 'index.html'))
})

app.listen(9000)