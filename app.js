require('dotenv').config();
const express = require('express');
const trainings = require('./routes/trainings');
const morgan = require('morgan');

const app = express();

const logger = (req, res, next) => {
  req.hello = 'Hello World';
  next();
};

app.use(logger);
app.use(morgan('dev'));

app.use('/api/trainings', trainings);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server running on port ${port}`));
