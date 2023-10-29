var notificacaoModel = require("../models/notificacaoModel");

function enviarAlerta(req, res) {

    var idFuncionario = req.body.idFuncionarioServer;
    var nomeFuncionario = req.body.idFuncionarioServer;

    if (idFuncionario == undefined || nomeFuncionario == undefined) {
        res.status(400).send("idFuncionario ou nomeFuncionario está undefined!");
    } else {
        notificacaoModel.enviarAlerta(idFuncionario, nomeFuncionario)
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
function verificarAlerta(req, res) {

    var idFuncionario = req.body.idFuncionarioServer;

    if (idFuncionario == undefined) {
        res.status(400).send("idFuncionario está undefined!");
    } else {
        notificacaoModel.verificarAlerta(idFuncionario)
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
function retirarAlerta(req, res) {

    var idFuncionario = req.body.idFuncionarioServer;

    if (idFuncionario == undefined) {
        res.status(400).send("idFuncionario está undefined!");
    } else {
        notificacaoModel.retirarAlerta(idFuncionario)
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

function verificaNotificacao(req, res) {

    var idEmpresa = req.body.idEmpresaServer;

    if (idEmpresa == undefined) {
        res.status(400).send("idFuncionarioo está undefined!");
    } else {
        notificacaoModel.verificaNotificacao(idEmpresa)
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
function retirarNotificacao(req, res) {

    var idDispositivo = req.body.idDispositivoServer;

    if (idDispositivo == undefined) {
        res.status(400).send("idFuncionarioo está undefined!");
    } else {
        notificacaoModel.retirarNotificacao(idDispositivo)
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
    enviarAlerta,
    verificarAlerta,
    retirarAlerta,
    verificaNotificacao,
    retirarNotificacao
}