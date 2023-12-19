const mongoose = require('mongoose');
const Training = require('../models/training');
const ErrorResponse = require('../utils/errorResponse');

exports.getTrainings = async (req, res, next) => {
  let queryStr = JSON.stringify(req.query);
  // Kicseréljük a query-ben lévő lte sztringet $lte-re
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`,
  );

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const startIndex = (page - 1) * limit;

  try {
    const trainings = await Training.find(JSON.parse(queryStr))
      .skip(startIndex)
      .limit(limit);

    const total = await Training.estimatedDocumentCount()
    const endIndex = page * limit - 1;

    const pagination = {};
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: trainings.length,
      data: trainings,
    });
  } catch (err) {
    next(err);
  }
};

exports.getTraining = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new ErrorResponse('ObjectID is invalid', 400);

    const training = await Training.findById(req.params.id);
    if (!training) return res.status(404).json({ success: false });

    res.status(200).json(training);
  } catch (err) {
    next(err);
  }
};

exports.createTraining = async (req, res, next) => {
  try {
    const training = await Training.create(req.body);
    res.status(201).json({ success: true, data: training });
  } catch (err) {
    next(err);
  }
};

exports.updateTraining = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new ErrorResponse('ObjectID is invalid', 400);

    const training = await Training.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!training) return res.status(404).json({ success: false });

    res.status(200).json({ success: true, data: training });
  } catch (err) {
    next(err);
  }
};

exports.deleteTraining = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new ErrorResponse('ObjectID is invalid', 400);

    const training = await Training.findByIdAndDelete(req.params.id);
    if (!training) return res.status(404).json({ success: false });

    res.status(200).json({ success: true, data: training });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
