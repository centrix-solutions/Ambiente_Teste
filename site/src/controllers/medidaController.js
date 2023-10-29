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
function buscarUltimasMedidasCPU(req, res) {

    const limite_linhas = 7;

    var idMaquina = req.params.idMaquina;
    var idEmpresa = 1
    
    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidasCPU(idMaquina, idEmpresa, limite_linhas).then(function (resultado) {
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

function buscarUltimasMedidasRAM(req, res) {

    const limite_linhas = 7;

    var idMaquina = req.params.idMaquina;
    var idEmpresa = 1
    
    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidasRAM(idMaquina, idEmpresa, limite_linhas).then(function (resultado) {
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

function buscarMedidasEmTempoRealCPU(req, res) {


    var idMaquina = req.params.idMaquina;
    var idEmpresa = 1

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoRealCPU(idMaquina, idEmpresa).then(function (resultado) {
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

function buscarMedidasEmTempoRealRAM(req, res) {


    var idMaquina = req.params.idMaquina;
    var idEmpresa = 1

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoRealRAM(idMaquina, idEmpresa).then(function (resultado) {
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

function buscarCpu(req, res) {

    var fkMaquina = req.body.idMaquinaServer
    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarCpu(fkMaquina, fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de cpu.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarRam(req, res) {

    var fkMaquina = req.body.idMaquinaServer
    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarRam(fkMaquina, fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de ram.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDisco(req, res) {

    var fkMaquina = req.body.idMaquinaServer
    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarDisco(fkMaquina, fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de disco.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUsb(req, res) {

    var fkMaquina = req.body.idMaquinaServer
    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarUsb(fkMaquina, fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de usb.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDownload(req, res) {

    var fkMaquina = req.body.idMaquinaServer
    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarDownload(fkMaquina, fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de velocidade de download.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUpload(req, res) {

    var fkMaquina = req.body.idMaquinaServer
    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarUpload(fkMaquina, fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de velocidade de upload.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarJanelas(req, res) {

    var fkMaquina = req.body.idMaquinaServer
    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarJanelas(fkMaquina, fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas janelas do sistema.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function buscarProcessos(req, res) {

    var fkMaquina = req.body.idMaquinaServer
    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarProcessos(fkMaquina, fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos processos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function buscarLogin(req, res) {

    var fkMaquina = req.body.idMaquinaServer
    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarLogin(fkMaquina, fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as infos de login.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
module.exports = {
    buscarComponentes,
    buscarUltimasMedidasCPU,
    buscarMedidasEmTempoRealCPU,
    buscarUltimasMedidasRAM,
    buscarMedidasEmTempoRealRAM,
    buscarCpu,
    buscarRam,
    buscarDisco,
    buscarUsb,
    buscarDownload,
    buscarUpload,
    buscarJanelas,
    buscarProcessos,
    buscarLogin,
}
