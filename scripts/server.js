// Reference: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment
const express = require('express')
const path = require('path')
const app = express()

const port = 9002

app.use(express.static(path.join(process.cwd(), 'build')))

const sendFile = (req, res) => {
  return res.sendFile(path.join(process.cwd(), 'build', 'index.html'))
}

app.get('*', sendFile)

app.listen(port, () => {
  console.log(`App is now running at port ${port}`)
})