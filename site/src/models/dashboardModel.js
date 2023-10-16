var database = require("../database/config");

function buscarComputadores(idEmpresa, idAndar) {
    var instrucao = `SELECT * FROM Maquinas WHERE fkEmpMaq = '${idEmpresa}' AND fkAndarDeTrabalho = ${idAndar}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function cadastrarAndar(numeroAndar, larguraAndar, comprimentoAndar) {
    var instrucao = `INSERT INTO Andar_de_trabalho (num_andar, largura_andar, comprimento_andar) VALUES (${numeroAndar}, ${larguraAndar}, ${comprimentoAndar})`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function salvarPosicaoComputadores(idComputador, x, y) {
    var instrucao = `UPDATE Maquinas SET posicaoX = ${x}, posicaoY = ${y} WHERE idMaquina = ${idComputador};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarComputadores,
    cadastrarAndar,
    salvarPosicaoComputadores
  }