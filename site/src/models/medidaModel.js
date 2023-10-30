var database = require("../database/config");

function deletarComputador(IDMaquina) {

    var instrucao = `DELETE FROM Maquinas WHERE idMaquina = ${IDMaquina};`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarComponentes(fkMaquina, fkEmpresa) {

    var instrucao = `SELECT valor, fkComponentesExistentes as idComponente FROM Componentes_Monitorados where fkEmpMaqComp = ${fkEmpresa} and fkMaquina = ${fkMaquina}`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarUltimasMedidasCPU(idMaquina, limite_linhas) {

    instrucaoSql = ''
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
                        Dado_Capturado AS cpu, 
                        Hora_captura,
                        as momento_grafico
                    from Monitoramento
                    where fkMaqCompMoni = ${idMaquina} and fkCompMoniExistentes = 1
                    order by idMonitoramento desc`;


    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        const limite_linhas = 7
        instrucaoSql = `select 
                        Dado_Capturado as cpu, 
                        Hora_captura
                        as momento_grafico
                    from  Monitoramento
                    where fkMaqCompMoni = ${idMaquina} and fkCompMoniExistentes = 1
                    order by idMonitoramento desc limit ${limite_linhas}`;


    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasRAM(idMaquina, limite_linhas) {

    instrucaoSql = ''
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
                        Dado_Capturado AS cpu, 
                        Hora_captura,
                        as momento_grafico
                    from Monitoramento
                    where fkMaqCompMoni = ${idMaquina} and fkCompMoniExistentes = 3
                    order by idMonitoramento desc`;


    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        const limite_linhas = 7
        instrucaoSql = `select 
                        Dado_Capturado as cpu, 
                        Hora_captura
                        as momento_grafico
                    from  Monitoramento
                    where fkMaqCompMoni = ${idMaquina} and fkCompMoniExistentes = 3
                    order by idMonitoramento desc limit ${limite_linhas}`;


    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealCPU(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 1
        Dado_Capturado AS cpu,
        Hora_captura AS momento_grafico,  
        fkMaqCompMoni
        FROM Monitoramento
        where fkMaqCompMoni = ${idMaquina} and fkCompMoniExistentes = 1
        ORDER BY idMonitoramento DESC;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        Dado_Capturado AS cpu,
        Hora_captura as momento_grafico, 
        fkMaqCompMoni
             from Monitoramento where fkMaqCompMoni = ${idMaquina} and fkCompMoniExistentes = 1
                   order by idMonitoramento desc limit 1`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealRAM(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 1
        Dado_Capturado AS ram,
        Hora_captura AS momento_grafico,  
        fkMaqCompMoni
        FROM Monitoramento
        where fkMaqCompMoni = ${idMaquina} and fkCompMoniExistentes = 3
        ORDER BY idMonitoramento DESC;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        Dado_Capturado AS ram,
        Hora_captura as momento_grafico, 
        fkMaqCompMoni
             from Monitoramento where fkMaqCompMoni = ${idMaquina} and fkCompMoniExistentes = 3
                   order by idMonitoramento desc limit 1`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarCpu(fkMaquina, fkEmpresa) {

    var instrucao = `SELECT Dado_Capturado as dado
    FROM Monitoramento
    WHERE fkCompMoniExistentes = 1 and fkMaqCompMoni = ${fkMaquina} and fkEmpMaqCompMoni = ${fkEmpresa}
    ORDER BY Data_captura DESC, Hora_captura DESC
    LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function buscarRam(fkMaquina, fkEmpresa) {

    var instrucao = `SELECT Dado_Capturado as dado
    FROM Monitoramento
    WHERE fkCompMoniExistentes = 3 and fkMaqCompMoni = ${fkMaquina} and fkEmpMaqCompMoni = ${fkEmpresa}
    ORDER BY Data_captura DESC, Hora_captura DESC
    LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function buscarDisco(fkMaquina, fkEmpresa) {

    var instrucao = `SELECT Dado_Capturado as dado
    FROM Monitoramento
    WHERE fkCompMoniExistentes = 2 and fkMaqCompMoni = ${fkMaquina} and fkEmpMaqCompMoni = ${fkEmpresa}
    ORDER BY Data_captura DESC, Hora_captura DESC
    LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function buscarUsb(fkMaquina, fkEmpresa) {

    var instrucao = `SELECT Dado_Capturado as dado
    FROM Monitoramento
    WHERE fkCompMoniExistentes = 4 and fkMaqCompMoni = ${fkMaquina} and fkEmpMaqCompMoni = ${fkEmpresa}
    ORDER BY Data_captura DESC, Hora_captura DESC
    LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function buscarDownload(fkMaquina, fkEmpresa) {

    var instrucao = `SELECT Dado_Capturado as dado
    FROM Monitoramento
    WHERE fkCompMoniExistentes = 5 and fkMaqCompMoni = ${fkMaquina} and fkEmpMaqCompMoni = ${fkEmpresa}
    ORDER BY Data_captura DESC, Hora_captura DESC
    LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function buscarUpload(fkMaquina, fkEmpresa) {

    var instrucao = `SELECT Dado_Capturado as dado
    FROM Monitoramento
    WHERE fkCompMoniExistentes = 6 and fkMaqCompMoni = ${fkMaquina} and fkEmpMaqCompMoni = ${fkEmpresa}
    ORDER BY Data_captura DESC, Hora_captura DESC
    LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function buscarJanelas(fkMaquina, fkEmpresa) {

    var instrucao = `SELECT Dado_Capturado as dado
    FROM Monitoramento
    WHERE fkCompMoniExistentes = 7 and fkMaqCompMoni = ${fkMaquina} and fkEmpMaqCompMoni = ${fkEmpresa}
    ORDER BY Data_captura DESC, Hora_captura DESC
    LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function buscarProcessos(fkMaquina, fkEmpresa) {

    var instrucao = `SELECT Dado_Capturado as dado
    FROM Monitoramento
    WHERE fkCompMoniExistentes = 8 and fkMaqCompMoni = ${fkMaquina} and fkEmpMaqCompMoni = ${fkEmpresa}
    ORDER BY Data_captura DESC, Hora_captura DESC
    LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function buscarLogin(fkMaquina, fkEmpresa) {

    var instrucao = `SELECT
    Nome AS NomeFuncionario,
    Atividade AS Atividade,
    Id_do_dispositivo AS idComputador,
    DATE_FORMAT(dataHoraEntrada, '%Y-%m-%d %H:%i:%s') AS HoraInicioTurno
    FROM Login where idEmpresa = ${fkEmpresa} and idMaquina = ${fkMaquina}
    ORDER BY dataHoraEntrada DESC
	LIMIT 1;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

module.exports = {
    deletarComputador,
    buscarUltimasMedidasCPU,
    buscarMedidasEmTempoRealCPU,
    buscarUltimasMedidasRAM,
    buscarMedidasEmTempoRealRAM,
    buscarComponentes,
    buscarCpu,
    buscarRam,
    buscarDisco,
    buscarUsb,
    buscarDownload,
    buscarUpload,
    buscarJanelas,
    buscarProcessos,
    buscarLogin
}

