const express = require('express');
const crypto = require('crypto');
const app = express();
const Worker = require('webworker-threads').Worker;

app.get('/', (req, res) => {
  const worker = new Worker(function() {
    // happens when thread receives message from the app
    this.onmessage = function() {
      let counter = 0;

      while (counter < 1e9) {
        counter++;
      }

      postMessage(counter);
    }
  });

  // happens when the app receives some message from the thread
  worker.onmessage = function(message) {
    console.log(message.data);
    res.send(`${message.data}`);
  }

  // sends a message from the app to the thread
  worker.postMessage();
});

app.get('/fast', (req, res) => {
  res.send('This was fast!');
});

app.listen(3000);