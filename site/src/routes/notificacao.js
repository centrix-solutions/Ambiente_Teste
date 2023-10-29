var express = require("express");
var router = express.Router();

var notificacaoController = require("../controllers/notificacaoController");

router.post("/enviarAlerta", function (req, res) {
    notificacaoController.enviarAlerta(req, res);
})

module.exports = router;