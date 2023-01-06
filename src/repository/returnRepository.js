const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize/connection");
const {Receipt} = require("../models");
const Return = require("../models/return")(sequelize, Sequelize.DataTypes);

const createReturn = (payload) => {
    return Return.create(payload)
}

const update = async (id, payload) => {
    const ret = await Return.findOne({where: {id}})

    if(!ret) {
        throw new Error('Unable to find return')
    }

    const response = await ret.update(payload)

    return response.toJSON()
}

const getAllReturns = async (filters) => {
    let queryFilters = {}

    if(filters && filters.userId) {
        queryFilters = { ...queryFilters, userId: filters.userId }
    }

    return Return.findAll({
        where: {
            ...queryFilters
        }
    })
}

const deleteReturn = async (id) => {
    await Receipt.destroy({ where: { returnId: id  } })

    return Return.destroy({ where: { id } })
}

const fetchById = async (id) => {
    return Return.findByPk(id)
}

module.exports = { createReturn, getAllReturns, update, deleteReturn, fetchById }
