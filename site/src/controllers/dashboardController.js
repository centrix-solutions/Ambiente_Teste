var dashboardModel = require("../models/dashboardModel");

function buscarComputadores(req, res) {

    var idEmpresa = req.body.idEmpresaServer;

    console.log(`Recuperando o idEmpresa`);
    if (idEmpresa == undefined) {
        res.status(400).send("Id da Empresa está undefined!");
    } else {
    dashboardModel.buscarComputadores(idEmpresa)
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

module.exports = {
    buscarComputadores,
}