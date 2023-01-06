const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize/connection");
const Receipt = require("../models/receipt")(sequelize, Sequelize.DataTypes);

const createBulk = async (payload) => {
    return Receipt.bulkCreate(payload)
}

const fetchAllByReturnId = async (returnId) => {
    return Receipt.findAll({ where: { returnId } })
}

module.exports = { createBulk, fetchAllByReturnId }
