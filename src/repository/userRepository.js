const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize/connection.js');
const USER = require('../models/user')(sequelize, Sequelize.DataTypes);

const fetchAllUsers = () => {
    return USER.findAll({ attributes: { exclude: ['createdAt','updatedAt'] } });
}

const fetchUserById = (id) => {
    return USER.findOne({where: { id }});
}

const fetchUserByUsername = (username) => {
    return USER.findOne( { where: { username: username } });
}

const fetchUserByEmail = (email) => {
    return USER.findOne( { where: { email: email } });
}

const postUserDB = (payload) => {
    return USER.create(payload);
}

const putUserDB = (id, payload) => {
    return USER.update(payload, {where: { id: id }});
}

const deleteUserDB = (id) => {
    return USER.destroy({where: { id: id }});
}

module.exports = { fetchAllUsers, postUserDB, putUserDB, deleteUserDB, fetchUserByUsername, fetchUserById, fetchUserByEmail }
