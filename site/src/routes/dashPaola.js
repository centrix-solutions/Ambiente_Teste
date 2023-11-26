var express = require("express");
var router = express.Router();

var dashPaolaController = require("../controllers/dashPaolaController");

router.get("/grafico", function (req, res) {
    dashPaolaController.listar(req, res);
});

module.exports = router;