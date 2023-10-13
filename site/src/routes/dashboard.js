var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.post("/buscarComputadores", function (req, res) {
    dashboardController.buscarComputadores(req, res);
})

module.exports = router;