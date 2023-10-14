var medidaModel = require("../models/medidaModel");



function buscarComponentes(req, res) {

    var fkMaquina = req.body.idMaquinaServer

    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando os componentes da empresa: ${fkEmpresa}, maquina: ${fkMaquina}`);
    if (fkMaquina == undefined || fkEmpresa == undefined) {
        res.status(400).send("Suas fks estão undefined!");
    } else {
        medidaModel.buscarComponentes(fkMaquina, fkEmpresa)
            .then(function (resultadoComponente) {
                console.log(`\nResultados encontrados: ${resultadoComponente.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoComponente)}`);

                var resultados = [];

                for (var i = 0; i < resultadoComponente.length; i++) {
                    resultados.push({
                        idComponente: resultadoComponente[i].idComponente,
                        valor: resultadoComponente[i].valor
                    });
                }
                res.json(resultados);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar as fks Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
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
