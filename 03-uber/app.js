const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

if(process.env.NODE_ENV !== 'test'){
  mongoose.connect('mongodb://127.0.0.1/uber');
}

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
routes(app);

// Error handler
app.use((err, req, res, next) => {
  console.log(err.name);
  res.status(422).send(err)
})

module.exports = app;
