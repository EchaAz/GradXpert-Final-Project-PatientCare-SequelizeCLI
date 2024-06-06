const express = require('express');
const doctorRoutes = require('./doctors');
const userRoutes = require('./users');
const appointmentRoutes = require('./appointments');

const router = express.Router();

router.use('/api/doctors', doctorRoutes);
router.use('/api/users', userRoutes);
router.use('/api/appointments', appointmentRoutes);

module.exports = router;
