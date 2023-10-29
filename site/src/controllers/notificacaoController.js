var notificacaoModel = require("../models/notificacaoModel");

function enviarAlerta(req, res) {

    var idFuncionario = req.body.xServer;

    if (idFuncionario == undefined) {
        res.status(400).send("idFuncionarioo está undefined!");
    } else {
        notificacaoModel.enviarAlerta(idFuncionario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao salvar a posição dos computadores Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    enviarAlerta
}