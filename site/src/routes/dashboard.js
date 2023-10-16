var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.post("/buscarComputadores", function (req, res) {
    dashboardController.buscarComputadores(req, res);
})
router.post("/cadastrarAndar", function (req, res) {
    dashboardController.cadastrarAndar(req, res);
})
router.post("/salvarPosicaoComputadores", function (req, res) {
    dashboardController.salvarPosicaoComputadores(req, res);
})

module.exports = router;