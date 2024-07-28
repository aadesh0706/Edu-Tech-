const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    examName: {
    type: String,
    required: true,
  },
  examLink: {
    type: String,
    required: true,
  },
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
