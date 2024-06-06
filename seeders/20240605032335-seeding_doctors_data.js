'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Doctors', [
      {
        name: 'Dr. Aomori Mine',
        speciality: 'Cardiology',
        practiceAddress: '404 Johannes St, Trinity',
        phone: '0911-1444-4200',
        email: 'aomori.mine@trinity.com',
        schedule: 'Monday - Saturday: 9am - 6pm',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dr. Himuro Sena',
        speciality: 'Orthopedics',
        practiceAddress: '999 Baal St, Gehenna',
        phone: '0911-1444-4600',
        email: 'himuro.sena@gehenna.com',
        schedule: 'Monday - Wednesday: 9am - 5pm, Friday: 10am - 6pm',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dr. Netzach Sefirot',
        speciality: 'Radiology',
        practiceAddress: '233 Aleph St, Lobotomy',
        phone: '1244-7777-2020',
        email: 'netzach.sefirot@lobotomy.com',
        schedule: 'Monday - Friday: 8am - 6pm',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dr. Faust',
        speciality: 'Pediatrics',
        practiceAddress: '123 Mephisto St, Limbus',
        phone: '1222-2345-8888',
        email: 'faust@limbus.com',
        schedule: 'Monday - Wednesday: 10am - 6pm, Saturday - Sunday: 12am - 6pm',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dr. Black Jack',
        speciality: 'Surgery',
        practiceAddress: '123 Tezuka St, Tokyo',
        phone: '1222-2345-9100',
        email: 'black.jack@tezuka.com',
        schedule: 'Monday - Saturday: 11am - 7pm',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dr. Temperance Brennan',
        speciality: 'Forensic Anthropology',
        practiceAddress: '206 Jeffersonian St, Washington D.C.',
        phone: '1244-7777-2300',
        email: 'temperance.brennan@bones.com',
        schedule: 'Monday - Friday: 8am - 4pm',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dr. Gregory House',
        speciality: 'Nephrology',
        practiceAddress: '123 Princeton St, Plainsboro',
        phone: '0911-1444-4300',
        email: 'gregory.house@fox.com',
        schedule: 'Monday - Friday: 9am - 5pm',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dr. Derek Shepherd',
        speciality: 'Neurosurgery',
        practiceAddress: '456 Grey Sloan St, Seattle',
        phone: '1222-2345-8900',
        email: 'derek.shepherd@grey.com',
        schedule: 'Monday - Saturday: 10am - 7pm',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dr. Meredith Grey',
        speciality: 'General Surgery',
        practiceAddress: '456 Grey Sloan St, Seattle',
        phone: '1244-7777-2400',
        email: 'meredith.grey@atomy.com',
        schedule: 'Monday - Friday: 8am - 6pm',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dr. Stephen Strange',
        speciality: 'Neurosurgery',
        practiceAddress: '177A Bleecker St, New York',
        phone: '0911-1444-4800',
        email: 'stephen.strange@marvel.com',
        schedule: 'Monday - Saturday: 9am - 6pm, Sunday: 10am - 4pm',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Doctors', null, {});
  }
};
