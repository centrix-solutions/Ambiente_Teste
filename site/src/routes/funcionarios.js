var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

router.post("/cadastrarfuncionario", function (req, res) {
   funcionarioController.cadastrarfuncionario(req, res);
})



module.exports = router;