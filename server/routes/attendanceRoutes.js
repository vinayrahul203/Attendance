const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
// POST /api/attendance/mark
router.post('/mark', async (req, res) => {
  const { subject, status } = req.body;

  if (!subject || !status) {
    return res.status(400).json({ message: 'Subject and status are required' });
  }

  try {
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

    let attendance = await Attendance.findOne({ subject });

    if (!attendance) {
      // First time this subject is marked
      attendance = new Attendance({
        subject,
        total: 1,
        present: status === 'present' ? 1 : 0,
        records: [{ date: today, status }],
      });
    } else {
      // Check if already marked for today
      const alreadyMarked = attendance.records.some(r => r.date === today);
      if (alreadyMarked) {
        return res.status(400).json({ message: 'Already marked for today' });
      }

      // Update existing record
      attendance.total += 1;
      if (status === 'present') attendance.present += 1;

      attendance.records.push({ date: today, status });
    }

    await attendance.save();
    res.status(200).json({ message: 'Attendance marked successfully' });

  } catch (err) {
    console.error('Error saving attendance:', err);
    res.status(500).json({ message: 'Server error while marking attendance' });
  }
});


// Get report
router.get('/report', async (req, res) => {
  try {
    const records = await Attendance.find();
    res.status(200).json(records);
  } catch (err) {
    console.error('Error fetching report:', err);
    res.status(500).json({ message: 'Failed to fetch report' });
  }
});

module.exports = router;
