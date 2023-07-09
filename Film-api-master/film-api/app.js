const express = require('express');
const hbs = require('hbs');
const app = express();

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  const films = require('./films.json');
  res.render('films', { films });
});

app.use(express.static('public'));
app.use('/public', express.static('public'));

app.get('/film/:title', (req, res) => {
  const title = req.params.title;
  const films = require('./films.json');
  const film = films.find(f => f.title === title);

  if (film) {
    res.render('film', { film });
  } else {
    res.status(404).send('Film not found');
  }
});

app.listen(5080, () => {
  console.log('Server listening on port 5080');
});

module.exports = app;
