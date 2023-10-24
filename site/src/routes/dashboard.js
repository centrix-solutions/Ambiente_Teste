var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

// COMEÇO FOTO

const upload = require('../../public/js/configUpload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD
router.get("", (req, res) => {
    res.render("dashboard_main")
});
router.post("/cadastrarFoto", upload.single('foto'), (req, res) => {
    dashboardController.cadastrarFoto(req, res);
})
// upload.single('foto') vai buscar no json alguma propriedade chamada foto 
// router.post('/cadastro', upload.single('foto'), (req, res) => {
//     dashboardController.salvar(req, res);
// });

// FIM FOTO


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