var database = require("../database/config");

function buscarComponentes(fkMaquina, fkEmpresa) {

    var instrucao = `SELECT valor, fkComponentesExistentes as idComponente FROM Componentes_Monitorados where fkEmpMaqComp = ${fkEmpresa} and fkMaquina = ${fkMaquina}`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarUltimasMedidas(idMaquina, limite_linhas) {

    instrucaoSql = ''
    idMaquina = 1
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
                        Dado_Capturado AS cpu, 
                        Hora_captura,
                        as momento_grafico
                    from Monitoramento
                    where fkMaqCompMoni = ${idMaquina}
                    order by idMonitoramento desc`;


    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        const limite_linhas = 7
        const idMaquina = 1
        instrucaoSql = `select 
                        Dado_Capturado as cpu, 
                        Hora_captura
                        as momento_grafico
                    from  Monitoramento
                    where fkMaqCompMoni = ${idMaquina}
                    order by idMonitoramento desc limit ${limite_linhas}`;


    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idMaquina) {

    instrucaoSql = ''
    idMaquina = 1

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 1
        Dado_Capturado AS cpu,
        Hora_captura AS momento_grafico,  
        fkMaqCompMoni
        FROM Monitoramento
        WHERE fkMaqCompMoni = ${idMaquina}
        ORDER BY idMonitoramento DESC;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        Dado_Capturado AS cpu,
        Hora_captura as momento_grafico, 
        fkMaqCompMoni
             from Monitoramento where fkMaqCompMoni = ${idMaquina}
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
    L.Nome AS NomeFuncionario,
    L.Atividade AS Atividade,
    T.inicio AS HoraInicioTurno,
    T.fim AS HoraFimTurno
FROM
    Login AS L
JOIN
    Turno AS T ON L.Turno = T.idPeriodo_de_Operacao
WHERE
    L.idEmpresa = ${fkEmpresa}
    AND L.idMaquina = ${fkMaquina};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}
module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarComponentes,
    buscarCpu,
    buscarRam,
    buscarDisco,
    buscarUsb,
    buscarJanelas,
    buscarProcessos,
    buscarLogin
}

