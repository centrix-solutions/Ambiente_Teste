var medidaModel = require("../models/medidaModel");

function buscarComponentes(req, res) {

    var fkMaquina = req.body.idMaquina

    var fkEmpresa = sessionStorage.getItem.Empresa
    
    console.log(`Recuperando os componentes`);
    if (fkMaquina == undefined || fkEmpresa == undefined) {
        res.status(400).send("Suas fks estão undefined!");
    } else {
    medidaModel.buscarComponentes(fkMaquina, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao buscar os componentes: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function buscarUltimasMedidas(req, res) {

    const limite_linhas = 7;

    var idMaquina = req.params.idMaquina;
    var idMaquina = 1 

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
            
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    
    var idMaquina = req.params.idMaquina;
    var idMaquina = 1 

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    buscarComponentes,
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
}
