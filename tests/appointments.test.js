const request = require('supertest');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../models');
process.env.NODE_ENV = 'test'
const { app } = require('../app');

let authToken;
let authToken2
;
beforeAll(async () => {
    await sequelize.authenticate();
    const payload = { userId: 1 };
    const payload2 = { userId: 2 };
    authToken = jwt.sign(payload, process.env.JWT_SECRET);
    authToken2 = jwt.sign(payload2, process.env.JWT_SECRET);
});

describe('POST /api/appointments', () => {
    it('should create a new appointment', async () => {
        const response = await request(app)
            .post('/api/appointments')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                doctorId: 1,
                time: '2025-04-28T12:00:00',
                description: 'Regular checkup'
            });

        const newid = response.body.newAppointment.id;
        console.log(newid);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('newAppointment');
        expect(response.body.newAppointment).toHaveProperty('id');
        expect(response.body.newAppointment.userId).toBe(1); 
    });

    it('should return 400 if required fields are missing', async () => {
        const response = await request(app)
            .post('/api/appointments')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                time: '2025-04-28T12:00:00',
                description: 'Regular checkup'
            });

        expect(response.statusCode).toBe(400); 
        expect(response.body).toHaveProperty('error');
    });

    it('should return 400 if date is not in the future', async () => {
        const response = await request(app)
            .post('/api/appointments')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                doctorId: 1,
                time: '2023-04-28T12:00:00',
                description: 'Regular checkup'
            });

        expect(response.statusCode).toBe(400); 
        expect(response.body).toHaveProperty('error');
    });

    it('should return 403 if user does not have access', async () => {
        const response = await request(app)
            .post('/api/appointments')
            .send({
                doctorId: 1,
                time: '2025-04-28T12:00:00',
                description: 'Regular checkup'
            });

        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty('error');
    });

    it('should return 403 if user token is not the correct type', async () => {
        const response = await request(app)
            .post('/api/appointments')
            .set('Authorization', `Bear ${authToken}`)
            .send({
                doctorId: 1,
                time: '2025-04-28T12:00:00',
                description: 'Regular checkup'
            });

        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty('error');
    });

    it('should return 403 if the token is incorrect', async () => {
        const response = await request(app)
            .post('/api/appointments')
            .set('Authorization', `Bearer ${authToken}123`)
            .send({
                doctorId: 1,
                time: '2025-04-28T12:00:00',
                description: 'Regular checkup'
            });

        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty('error');
    });

    it('should return 500 if other error occurs', async () => {
        const response = await request(app)
            .post('/api/appointments')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                doctorId: 10000000000000000000,
                time: '2025-04-28T12:00:00',
                description: 'Regular checkup'
            });

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Internal Server Error');
    });
});

describe('GET /api/appointments', () => {
    it('should get all existing appointment', async () => {
        const response = await request(app)
            .get('/api/appointments')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('appointments');
    });
    
    it('should return 404 if there is no appointment', async () => {
        const response = await request(app)
            .get('/api/appointments/')
            .set('Authorization', `Bearer ${authToken2}`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('No appointments found');
    });
});

describe('DELETE /api/appointments/:id', () => {
    let newid;

    beforeAll(async () => {
        const response = await request(app)
            .post('/api/appointments')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                userId: 1,
                doctorId: 1,
                time: '2025-04-28T12:00:00',
                description: 'Regular checkup'
            });

        newid = response.body.newAppointment.id;
    });

    it('should delete an existing appointment', async () => {
        const response = await request(app)
            .delete(`/api/appointments/${newid}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Appointment deleted successfully');
    });

    it('should return 404 if appointment is missing', async () => {
        const response = await request(app)
            .delete('/api/appointments/999999')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Appointment not found');
    });

    it('should return 403 if user does not have access', async () => {
        const response = await request(app)
            .delete('/api/appointments/2')
            .set('Authorization', `Bearer `);

        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty('error');
    });

    it('should return 500 if other error occurs', async () => {
        const response = await request(app)
            .delete('/api/appointments/99999999999999')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Internal Server Error');
    });
});

describe('PATCH /api/appointments/:id', () => {
    it('should update an existing appointment', async () => {
        const response = await request(app)
            .patch('/api/appointments/1')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                doctorId: 3,
                time: '2024-12-12T12:00:00',
                description: 'Edit Checkup'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Appointment updated successfully');
    });

    it('should return 404 if appointment is missing', async () => {
        const response = await request(app)
            .patch('/api/appointments/9999')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                doctorId: 5,
                time: '2029-12-12T12:00:00',
                description: 'Edit Checkup'
            });

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Appointment not found');
    });

    it('should return 403 if user does not have access', async () => {
        const response = await request(app)
            .patch('/api/appointments/1')
            .set('Authorization', `Bearer `)
            .send({
                doctorId: 3,
                time: '2024-12-12T12:00:00',
                description: 'Edit Checkup'
            });

        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty('error');
    });

    it('should return 500 if other error occurs', async () => {
        const response = await request(app)
            .patch('/api/appointments/99999999999999999')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                doctorId: 3,
                time: '2024-12-12T12:00:00',
                description: 'Edit Checkup'
            });

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Internal Server Error');
    });
});

afterAll(async () => {
    await sequelize.close();
});
