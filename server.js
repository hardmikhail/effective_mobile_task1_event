const express = require('express');
const { postEvents, getChanges } = require('./controllers/changes.controller.js');
const bodyParser = require('body-parser');

const app = express();

const port = 3001;
app.use(bodyParser.json());

app.post('/events', postEvents);
app.get('/changes/:id', getChanges);

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
