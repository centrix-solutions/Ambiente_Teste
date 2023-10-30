var database = require("../database/config");

function buscarImportanciaMaquina(idMaquina){
    if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucaoSql = `SELECT Importancia
    FROM Tipo_Alerta  AS TA
    JOIN Alertas AS A ON TA.idTipo_Alerta = A.FKTipo_Alerta
    JOIN Monitoramento AS M ON A.fkMonitoramento = M.idMonitoramento
    JOIN Componentes_Monitorados AS CM ON CM.idComponente_Monitorado = M.fkCompMonitorados
    JOIN Maquinas AS Maq ON CM.fkMaquina = Maq.idMaquina
    WHERE Maq.idMaquina = ${idMaquina}`;
    
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT Importancia
        FROM Tipo_Alerta  AS TA
        JOIN Alertas AS A ON TA.idTipo_Alerta = A.FKTipo_Alerta
        JOIN Monitoramento AS M ON A.fkMonitoramento = M.idMonitoramento
        JOIN Componentes_Monitorados AS CM ON CM.idComponente_Monitorado = M.fkCompMonitorados
        JOIN Maquinas AS Maq ON CM.fkMaquina = Maq.idMaquina
        WHERE Maq.idMaquina = ${idMaquina}`;
    }
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarMaquinasEmpresa(idEmpresa){
    if (process.env.AMBIENTE_PROCESSO == "producao") {
         instrucaoSql = `Select COUNT(idMaquina) as totalMaq from Maquinas where fkEmpMaq = ${idEmpresa}`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
         instrucaoSql = `Select COUNT(idMaquina) as totalMaq from Maquinas where fkEmpMaq = ${idEmpresa}`;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
   buscarImportanciaMaquina,
   contarMaquinasEmpresa,
}