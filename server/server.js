// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const attendanceRoutes = require('./routes/attendanceRoutes');



dotenv.config();
const app = express();

app.use(cors({
  origin: 'https://attendance-r2xbgmmj4-vinay-rahuls-projects.vercel.app',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

app.use('/api/attendance', attendanceRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error('MongoDB connection error:', err));
