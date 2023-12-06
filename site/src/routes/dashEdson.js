var express = require("express");
var router = express.Router();

var dashEdsonController = require("../controllers/dashEdsonController");

router.get("/wordCloud", function (res, res){
    dashEdsonController.buscarPalavrasWordCloud(res,res);
});

router.get("/kpiAtual", function (res, res){
    dashEdsonController.kpiMesAtual(res,res);
});

router.get("/kpiPassado", function (res, res){
    dashEdsonController.kpiMesPassado(res,res);
});


module.exports = router;