var express = require("express");
var router = express.Router();

var relatorioController = require("../controllers/relatorioController");

router.post("/buscarComputadoresRelatorio", function (req, res) {
    relatorioController.buscarComputadoresRelatorio(req, res);
});

module.exports = router;