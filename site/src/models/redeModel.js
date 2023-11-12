var database = require("../database/config");

function buscarImportanciaMaquina(idMaquina){

    var instrucaoSql = `SELECT Importancia
    FROM Tipo_Alerta  AS TA
    JOIN Alertas AS A ON TA.idTipo_Alerta = A.FKTipo_Alerta
    JOIN Monitoramento AS M ON A.fkMonitoramento = M.idMonitoramento
    JOIN Componentes_Monitorados AS CM ON CM.idComponente_Monitorado = M.fkCompMonitorados
    JOIN Maquinas AS Maq ON CM.fkMaquina = Maq.idMaquina
    WHERE Maq.idMaquina = ${idMaquina}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarMaquinasEmpresa(idEmpresa){
    
    instrucaoSql = `SELECT COUNT(idMaquina) AS totalMaq FROM Maquinas WHERE fkEmpMaq = ${idEmpresa}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
   buscarImportanciaMaquina,
   contarMaquinasEmpresa,
}