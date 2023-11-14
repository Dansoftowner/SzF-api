require('dotenv').config();
const express = require('express');
const trainings = require('trainings');

const app = express();
app.use('/api/trainings', trainings);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server running on port ${port}`));
