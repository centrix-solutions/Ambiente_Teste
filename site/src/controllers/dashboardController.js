var dashboardModel = require("../models/dashboardModel");

function buscarComputadores(req, res) {

    var idEmpresa = req.body.idEmpresaServer;
    var idAndar = req.body.idAndarServer;

    console.log(`Recuperando o idEmpresa`);
    if (idEmpresa == undefined || idAndar == undefined) {
        res.status(400).send("Id da Empresa está undefined!");
    } else {
    dashboardModel.buscarComputadores(idEmpresa, idAndar)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao buscar a fkempresa Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function cadastrarAndar(req, res) {

    var numeroAndar = req.body.numAndarServer;
    var larguraAndar = req.body.largAndarServer;
    var comprimentoAndar = req.body.compAndarServer;

    if (numeroAndar == undefined || larguraAndar == undefined || comprimentoAndar == undefined) {
        res.status(400).send("Algum campo está undefined!");
    } else {
    dashboardModel.cadastrarAndar(numeroAndar, larguraAndar, comprimentoAndar)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao cadastrar o andar Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function salvarPosicaoComputadores(req, res) {

    var idComputador = req.body.idComputadorServer;
    var x = req.body.xServer;
    var y = req.body.yServer;

    if (idComputador == undefined || x == undefined || y == undefined) {
        res.status(400).send("Algum campo está undefined!");
    } else {
    dashboardModel.salvarPosicaoComputadores(idComputador, x, y)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao cadastrar o andar Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    buscarComputadores,
    cadastrarAndar,
    salvarPosicaoComputadores
}