const Sequelize = require('sequelize');
const dbConnection = require('../configs/sequelize/connection');

const UserModel = require('./user');
const ReturnModel = require('./return');
const ReceiptModel = require('./receipt');


const User = UserModel(dbConnection, Sequelize);
const Return = ReturnModel(dbConnection, Sequelize);
const Receipt = ReceiptModel(dbConnection,Sequelize)

Return.belongsTo(User, {
    foreignKey: {
        name: 'userId',
    },
    as: 'user'
})
Receipt.belongsTo(Return)

module.exports = {User, Return, Receipt };
