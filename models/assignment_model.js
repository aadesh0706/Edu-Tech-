const mongoose = require('mongoose');

const assignementSchema = new mongoose.Schema({
  assignementName: {
    type: String,
    required: true,
  },
  assignementLink: {
    type: String,
    required: true,
  },
});

const Assignement = mongoose.model('Assignment', assignementSchema);

module.exports = Assignement;
