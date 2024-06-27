const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routers/index');
const { ErrorHandler, NotFoundHandler, DevLogs } = require('./middleware/general');
const { Tag } = require('./database/repositories/tag.repo');

const APIBASE = '/api/v1';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(DevLogs)
app.use(APIBASE, routes);

app.use(ErrorHandler);
app.use(NotFoundHandler);

async function seedDb() {
  //test code
  const up = await Tag.getById('6663176eacf98a2b0f94c83a');
  up.recipients = [];
  await up.save();
  console.log(up)
}
// seedDb();

module.exports = app;