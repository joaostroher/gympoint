import Sequelize from 'sequelize';
import config from '@/config/database';
import User from '@/app/models/User';
import Student from '@/app/models/Student';

const models = [User, Student];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(config);
    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
