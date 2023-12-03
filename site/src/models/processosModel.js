var database = require("../database/config");

function listarProcessos(idEmpresa, idAndar) {
    var instrucao = `SELECT * FROM Processo JOIN Empresa ON Processo.idAndar_de_trabalho = Empresa.idEmpresa JOIN andar_de_trabalho ON andar_de_trabalho.fkEmpAndar = Empresa.idEmpresa WHERE Empresa.idEmpresa = ${idEmpresa} AND idAndar_de_trabalho = ${idAndar};`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarProcessos
}