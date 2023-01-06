const mindee = require("mindee");

const postReceipt = async (req, res, next) => {
    let response = { amount: 100.43, date: new Date() }

    // const mindeeClient = new mindee.Client({ apiKey: process.env.API_KEY });
    //
    // const doc = mindeeClient.docFromBase64(req.body.image, 'myfile.png');
    // const respPromise = doc.parse(mindee.ReceiptResponse);
    //
    // respPromise
    //     .then((resp) => {
    //         if (resp.document === undefined) return;
    //         response = {
    //             amount: resp.document.totalIncl.value,
    //             date: resp.document.date.value ?? new Date()
    //         }
    //
    //         return res.status(200).send(response)
    //     })
    //     .catch((err) => {
    //         return res.status(500).send({
    //             error: {
    //                 message: err.message
    //             }
    //         })
    //     });

    return res.status(200).send(response)
}

module.exports = {postReceipt}
