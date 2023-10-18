const express = require('express');
const app = express();
const port = 3000;

app.all('/', (req, res) => {
  res.send(`Express Activated for P2_AC_Multi`);
  res.end();
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});


//const bot1 = require('./bots/bot1.js');
//const bot2 = require('./bots/bot2.js');
//const bot3 = require('./bots/bot3.js');
//const bot4 = require('./bots/bot4.js');
//const bot5 = require('./bots/bot5.js');


//bot1.startBot();
//bot2.startBot();
//bot3.startBot();
//bot4.startBot();
//bot5.startBot();

