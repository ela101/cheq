const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/routes');
const dbConnection = require('./db/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(apiRouter);

// Test DB
dbConnection.connect().then(() => console.log('Connection to the database has been established successfully.Connection to the database has been established successfully.'))
  .catch(err => console.log('Error:', err));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
