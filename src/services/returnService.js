const ReturnRepository = require('../repository/returnRepository')
const ReceiptRepository = require('../repository/receiptRepository')
const UserRepository = require('../repository/userRepository')
const {returnOutputMapper} = require("../mappers");
const {User} = require("../models");
const {createPdf} = require("../utils");
const sequelize = require("../configs/sequelize/connection");
const Sequelize = require("sequelize");
const USER = require('../models/user')(sequelize, Sequelize.DataTypes);

const getAll = async (req, res) => {
    const filters = req.query

    let returns = await ReturnRepository.getAllReturns(filters)

    returns = returns.map((ret) => returnOutputMapper(ret))

    for(let i = 0; i<returns.length; i++) {
        let user = await User.findByPk(returns[i].userId)
        returns[i] = {...returns[i], employeeName: `${user?.firstName} ${user?.lastName}`}
    }

    return res.status(200).send(returns)
}

const updateReturn = async (req, res) => {
    const { id } = req.params
    const payload = req.body

    const updatedReturn = ReturnRepository.update(id, payload)

    return res.status(200).send(updatedReturn)
}

const deleteReturn = async (req, res) => {
    const { id } = req.params

    await ReturnRepository.deleteReturn(id)

    return res.status(200).send()
}

const postReturn = async (req, res) => {
    const { receipts, returnTotalAmount, userId } = req.body
    const { userData } = req
    console.log(userId, userData.userId)
    console.log({
        date: new Date().toISOString(),
        value: returnTotalAmount,
        userId: userId ?? userData.userId
    })
    const createdReturn = await ReturnRepository.createReturn({
        date: new Date().toISOString(),
        value: returnTotalAmount,
        userId: userId ?? userData.userId
    })

    const createdReceipts = await ReceiptRepository.createBulk(receipts.map((receipt) => ({
        value: receipt.value,
        date: receipt.date,
        returnId: createdReturn.id,
    })))

    return res.status(200).send({
        return: createdReturn,
        receipts: createdReceipts
    })
}

const generatePDF = async (req, res) => {
    console.log('AM AJUNS AICI')
    const { id } = req.params

    const returnResult = await ReturnRepository.fetchById(id)

    if(!returnResult) {
        return res.status(404).send({message: 'Return not found'})
    }

    const userResult = await UserRepository.fetchUserById(returnResult.userId)

    let receiptsResult = await ReceiptRepository.fetchAllByReturnId(returnResult.id)

    let amount = receiptsResult.map((receipt) => receipt.value)
    amount = amount.reduce((previousValue, currentValue) => previousValue + currentValue, 0 )

    let documentNo = 0
    receiptsResult = receiptsResult.map((receipt) => ({
        amount: receipt.value,
        docNumber: `${documentNo++} ${receipt.date}`,
        providerName: "Gym One 5"
    }))

    const adviser = await USER.findOne({ where: { role: 'ADMIN' } })

    const pdfData = {
        amount,
        adviser: `${adviser.firstName} ${adviser.lastName}`,
        employee: `${userResult.firstName} ${userResult.lastName}`,
        id: returnResult.id,
        date: returnResult.date.split('T')[0],
        receiptData: receiptsResult
    }

    const resultHtml = await createPdf('return', pdfData);

    const filename = `Return-${new Date()}.pdf`;
    res.contentType('application/pdf');
    res.setHeader('File-Name', filename);
    res.status(200).send(resultHtml.toString());
}

module.exports = { postReturn, getAll, updateReturn, deleteReturn, generatePDF }
