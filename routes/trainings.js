const express = require('express');
const {
  getTraining,
  getTrainings,
  createTraining,
  updateTraining,
  deleteTraining,
} = require('../controllers/trainings');

const router = express.Router();

router.get('/', getTrainings);
router.get('/:id', getTraining);
router.post('/', createTraining);
router.put('/:id', updateTraining);
router.delete('/:id', deleteTraining);

module.exports = router;
