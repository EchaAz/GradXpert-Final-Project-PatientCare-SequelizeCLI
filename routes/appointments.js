const express = require('express');
const router = express.Router();
const { authorizeUser } = require('../authmiddleware');
const appointmentsController = require('../controllers/appointments');

router.route('/').post(authorizeUser, appointmentsController.createAppointment).get(authorizeUser, appointmentsController.getAllAppointments)
router.route('/:id').delete(authorizeUser, appointmentsController.deleteAppointmentById).patch(authorizeUser, appointmentsController.updateAppointment)

module.exports = router;