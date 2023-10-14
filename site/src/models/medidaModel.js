var database = require("../database/config");

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

        //esse select nao executa no sql
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
        // top 1? ta certo isso? mudar para select sem "top 1"
        //tentar fazer esse select funcionar , talvez o problema esteja nele
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

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
}

