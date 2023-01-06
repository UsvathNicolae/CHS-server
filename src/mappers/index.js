const returnOutputMapper = (ret) => {
    return {
        employeeName: ret.employeeName,
        id: ret.id,
        date: ret.date,
        totalAmount: ret.value,
        userId: ret.userId,
        status: ret.status
    }
}

module.exports = {returnOutputMapper}
