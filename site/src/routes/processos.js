var express = require("express");
var router = express.Router();

var processosController = require("../controllers/processosController");

router.post("/listarProcessos", function (req, res) {
    processosController.listarProcessos(req, res);
})

module.exports = router;