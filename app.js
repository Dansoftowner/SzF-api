require('dotenv').config();
const express = require('express');
const trainings = require('./routes/trainings');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.SZF_MONGO_URI)
  .then(() => console.log('Database connection is established'))
  .catch((err) => console.error(err));

const app = express();

app.use(express.json());

const logger = (req, res, next) => {
  req.hello = 'Hello World';
  next();
};

app.use(logger);
app.use(morgan('dev'));

app.use('/api/trainings', trainings);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server running on port ${port}`));
