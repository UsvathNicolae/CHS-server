'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Returns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Returns.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    date: DataTypes.STRING,
    value: DataTypes.DOUBLE,
    userId: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: [
        'OPEN',
        'APPROVED',
        'DECLINED'
      ],
      defaultValue: 'OPEN'
    }
  }, {
    sequelize,
    modelName: 'Returns',
  });
  return Returns;
};
