const faker = require('faker/locale/pt_BR');

module.exports = {
  up: queryInterface => {
    const students = [];
    for (let i = 0; i < 10; i++) {
      students.push({
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        age: faker.random.number({ min: 10, max: 70 }),
        weight: faker.random.number({ min: 40, max: 120, precision: 0.001 }),
        height: faker.random.number({ min: 0.5, max: 2.2, precision: 0.01 }),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    return queryInterface.bulkInsert('students', students, {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('students', null, {});
  },
};
