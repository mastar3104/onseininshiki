const express = require('express');
const path = require('path');
const axios = require('axios');
const http = require('http');
express.static.mime.define({'content-type": "audio/mpeg': ['mp3']})
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/yukkuri.mp3', (req, res) => {
  if (req.query.kanji === "") {
    return res.send("")
  }
  axios.get("https://www.yukumo.net/api/v2/aqtk1/koe.mp3?type=f1&kanji="+ encodeURI(req.query.kanji) , {responseType: 'stream'})
    .then(response => {
      response.data.pipe(res)
    })
});

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
