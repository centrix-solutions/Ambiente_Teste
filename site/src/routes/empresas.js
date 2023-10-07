var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");


router.post("/cadastrarEmpresa", function (req, res) {
    empresaController.cadastrarEmpresa(req, res);
})

router.post("/buscarFk", function (req, res) {
    empresaController.buscarFk(req, res);
})

router.post("/cadastrarfuncionario", function (req, res) {
    empresaController.cadastrarfuncionario(req, res);
})


module.exports = router;