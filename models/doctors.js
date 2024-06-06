// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Doctors extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Doctors.init({
//     name: DataTypes.STRING,
//     speciality: DataTypes.STRING,
//     practiceAddress: DataTypes.STRING,
//     phone: DataTypes.STRING,
//     email: DataTypes.STRING,
//     schedule: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Doctors',
//   });
//   return Doctors;
// };

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctors.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name is required.'
        }
      }
    },
    speciality: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Speciality is required.'
        }
      }
    },
    practiceAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Practice address is required.'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        is: /^\+?\d{7,15}$/,
      }
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
    schedule: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Schedule is required.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Doctors',
  });
  return Doctors;
};