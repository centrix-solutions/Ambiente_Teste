var database = require("../database/config");

function buscarComputadores(idEmpresa) {
    var instrucao = `SELECT * FROM Maquinas where fkEmpMaq = '${idEmpresa}'`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarComputadores
  }