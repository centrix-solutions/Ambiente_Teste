var express = require("express");
var router = express.Router();

var redeController = require("../controllers/redeController");

router.get("/importancia/:idMaquina",  function (req, res) {
    redeController.buscarImportanciaMaquina(req, res);
});

router.get("/maqEmp/:idEmpresa", function (req, res){
    redeController.contarMaquinasEmpresa(req, res);
});

module.exports = router;