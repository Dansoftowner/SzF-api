const Training = require('../models/training');

exports.getTrainings = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: 'Show all trainings', hello: req.hello });
};

exports.getTraining = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Get training ${req.params.id}` });
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
