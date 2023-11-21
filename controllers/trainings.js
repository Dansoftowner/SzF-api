const mongoose = require('mongoose');
const Training = require('../models/training');

exports.getTrainings = async (req, res, next) => {
  try {
    const trainings = await Training.find({});
    res.status(200).json(trainings);
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

exports.getTraining = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ success: false });

    const training = await Training.findById(req.params.id);
    if (!training) return res.status(404).json({ success: false });

    res.status(200).json(training);
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

exports.createTraining = async (req, res, next) => {
  try {
    const training = await Training.create(req.body);
    res.status(201).json({ success: true, data: training });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

exports.updateTraining = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update training ${req.params.id}` });
};

exports.deleteTraining = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete training ${req.params.id}` });
};
