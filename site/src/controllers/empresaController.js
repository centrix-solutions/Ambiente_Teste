var empresaModel = require("../models/empresaModel");

function cadastrarEmpresa(req, res) {

    var Nome_fantasia = req.body.nomeFantasiaServer;
    var Razao_social = req.body.razaoSocialServer;
    var Apelido_interno = req.body.apelidoInternoServer;
    var CNPJ = req.body.cnpjServer;
    var Responsavel_legal = req.body.responsavelLegalServer;
    var sede = req.body.sedeServer;

    if (Nome_fantasia == undefined) {
        res.status(400).send("Seu nome fantasia está undefined!");
    } else if (Razao_social == undefined) {
        res.status(400).send("Sua razão social está undefined!");
    } else if (Apelido_interno == undefined) {
        res.status(400).send("Seu apelido interno está undefined!");
    } else if (CNPJ == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (Responsavel_legal == undefined) {
        res.status(400).send("Seu responsavel legal está undefined!");
    } else if (sede == undefined) {
      res.status(400).send("Sua sede está undefined!");
    } else {

        empresaModel.cadastrarEmpresa(Nome_fantasia, Razao_social, Apelido_interno, CNPJ, Responsavel_legal, sede)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function buscarFk(req, res) {

    var cnpj = req.body.cnpjServer;

    console.log(`Recuperando a fkEmpresa`);
    if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else {
    empresaModel.buscarFk(cnpj)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao buscar a fk Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function cadastrarEndereco(req, res) {
        var rua = req.body.ruaServer
        var bairro = req.body.bairroServer
        var cidade = req.body.cidadeServer
        var estado = req.body.estadoServer
        var numero = req.body.numeroServer
        var cep = req.body.CEPServer
        var fkempresa = req.body.fkEmpresaServer

    
    if (rua == undefined) {
        res.status(400).send("Sua rua está undefined!");
    } else if ( bairro == undefined) {
        res.status(400).send("Sua bairro está undefined!");
    } else if ( cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu numero está undefined!");
    }else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    }else if (fkempresa == undefined) {
        res.status(400).send("Seu fkempresa está undefined!");
    }else {


        empresaModel.cadastrarEndereco(rua, bairro, cidade, estado, numero, cep, fkempresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
module.exports = {
    cadastrarEmpresa,
    buscarFk,
    cadastrarEndereco,
    cadastrarFuncionario,
}