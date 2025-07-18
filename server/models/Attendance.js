// models/Attendance.js
const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  date: { type: String, required: true }, // store as YYYY-MM-DD
  status: { type: String, enum: ['present', 'absent'], required: true }
});

const attendanceSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  total: { type: Number, default: 0 },
  present: { type: Number, default: 0 },
  records: [recordSchema],
});

module.exports = mongoose.model('Attendance', attendanceSchema);
