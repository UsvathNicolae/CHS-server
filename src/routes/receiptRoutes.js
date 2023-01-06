const express = require("express");
const router = express.Router();

const ReceiptService = require("../services/receiptService");
const checkAuth = require("../middleware/check-auth");

router.post("/", checkAuth, ReceiptService.postReceipt);

module.exports = router;
