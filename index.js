const express = require('express');

const app = express();

app.use(express.static((__dirname + '/src')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

/*app.listen(process.env.PORT || 5000, () => {
  console.log('Server listening on port 5000');
}); */
app.listen(process.env.PORT || 5000);
