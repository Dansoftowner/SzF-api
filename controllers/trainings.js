exports.getTrainings = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all trainings' });
};

exports.getTraining = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Get training ${req.params.id}` });
};

exports.createTraining = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new training' });
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
