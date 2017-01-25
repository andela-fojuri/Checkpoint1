const express = require('express');

const app = express();

app.use(express.static((__dirname + '/src')));

app.listen(process.env.PORT || 5000);

app.get('/', (req, res) => {
  res.sendFile('index.html');
});


