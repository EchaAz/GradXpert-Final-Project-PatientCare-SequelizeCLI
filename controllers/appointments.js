const { Appointments } = require('../models');

exports.createAppointment = async (req, res) => {
    try {
        const { userId, doctorId, time, description } = req.body;
            const newAppointment = await Appointments.create({
            userId,
            doctorId,
            time,
            description
        });
        return res.status(201).json({
                message: 'Appointment created successfully',
                newAppointment
              });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const { userId } = req.body;
        const appointments = await Appointments.findAll({ where: { userId }});
        if (!appointments.length) {
            return res.status(404).json({ error: 'No appointments found' });
        }
        res.status(200).json({ appointments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.deleteAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointments.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        await appointment.destroy();
        return res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointments.findByPk(id);
        if(!appointment) {
            return res.status(404).json({error: 'Appointment not found'})
        } else {
            const { userId, doctorId, time, description } = req.body;
            await appointment.update({
            userId,
            doctorId,
            time,
            description
        });
        }
        return res.status(200).json({
            statusCode: 200,
            message: 'Appointment updated successfully'
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
