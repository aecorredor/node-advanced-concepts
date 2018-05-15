const express = require('express');
const crypto = require('crypto');
const app = express();

app.get('/', (req, res) => {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    res.send('hi there');
  });
});

app.get('/fast', (req, res) => {
  res.send('This was fast!');
});

app.listen(3000);

// To run server with pm2 in cluster mode run `pm2 start pm2ClusterModeExample.js -i 0`
// With 0 as the last option, pm2 takes care of creating as many instances as logical cores
// in your computer.