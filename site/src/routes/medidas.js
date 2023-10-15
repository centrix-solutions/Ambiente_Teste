var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.post("/buscarComponentes", function (req, res) {
    medidaController.buscarComponentes(req, res);
});

router.get("/tempo-real/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
});

router.post("/buscarCpu", function (req, res) {
    medidaController.buscarCpu(req, res);
});

router.post("/buscarRam", function (req, res) {
    medidaController.buscarRam(req, res);
});

router.post("/buscarDisco", function (req, res) {
    medidaController.buscarDisco(req, res);
});

router.post("/buscarUsb", function (req, res) {
    medidaController.buscarUsb(req, res);
});

router.post("/buscarJanelas", function (req, res) {
    medidaController.buscarJanelas(req, res);
});

router.post("/buscarProcessos", function (req, res) {
    medidaController.buscarProcessos(req, res);
});

router.post("/buscarLogin", function (req, res) {
    medidaController.buscarLogin(req, res);
});

module.exports = router;