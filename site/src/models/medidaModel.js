var database = require("../database/config");

function buscarUltimasMedidas(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        Temperatura as temperatura, 
        Umidade as umidade,  
                        Data_Hora, 
                        FORMAT(Data_Hora, 'HH:mm:ss') as momento_grafico
                    from Registro_Sensor
                    where fkSensor = ${idMaquina}
                    order by idRegistro desc`;


    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        const limite_linhas = 7
        const idMaquina = 1
        instrucaoSql = `select 
        Temperatura as temperatura, 
        Umidade as umidade,
                        Data_Hora,
                        DATE_FORMAT(Data_Hora,'%H:%i:%s') as momento_grafico
                    from  Registro_Sensor
                    where fkSensor = ${idMaquina}
                    order by idRegistro desc limit ${limite_linhas}`;

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

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        // top 1? ta certo isso? mudar para select sem "top 1"
        //tentar fazer esse select funcionar , talvez o problema esteja nele
        instrucaoSql = `SELECT TOP 1
        Temperatura,
        Umidade,
        CONVERT(varchar, Data_Hora, 108) AS momento_grafico,  
        fkSensor
        FROM Registro_Sensor
        WHERE fkSensor = ${idMaquina}
        ORDER BY idRegistro DESC;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        Temperatura as temperatura, 
        Umidade as umidade,
                        DATE_FORMAT(Data_Hora,'%H:%i:%s') as momento_grafico, 
                     fkSensor 
             from Registro_Sensor where fkSensor = 1 
                   order by idRegistro desc limit 1`;

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

