const express = require('express');
const path = require('path');
const http = require('http');
express.static.mime.define({'content-type": "audio/mpeg': ['mp3']})
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

const port = parseInt(process.env.PORT || '3000', 10);
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
