'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Email is required.'
        },
        isEmail: {
          msg: 'Invalid email format.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required.'
        },
        len: {
          args: [5, Infinity],
          msg: 'Password must be at least 5 characters long.'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true, 
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};