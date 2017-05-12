const connect = require('connect')
const serveStatic = require('serve-static')
const path = require('path')

connect()
  .use(serveStatic(path.join(__dirname, 'assets')))
  .listen(8080, () => console.log('Running on port 8080'))
