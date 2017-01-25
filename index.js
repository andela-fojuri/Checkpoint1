const express = require('express');

const app = express();

app.use(express.static((__dirname)));

app.listen(process.env.PORT || 5000, () => {
  console.log('Server listening on port 5000');
});

app.get('/', (req, res) => {
  res.send('Hello world');
});
