const express = require("express");
const router = express.Router();

const ReturnService = require("../services/returnService");
const checkAuth = require("../middleware/check-auth");

router.patch('/:id', checkAuth, ReturnService.updateReturn)

router.delete('/:id', checkAuth, ReturnService.deleteReturn)

router.get('/', checkAuth, ReturnService.getAll)

router.get("/:id/pdf", checkAuth, ReturnService.generatePDF);

router.post("/", checkAuth, ReturnService.postReturn);



module.exports = router;
