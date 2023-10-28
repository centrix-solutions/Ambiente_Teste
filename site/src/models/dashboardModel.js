var database = require("../database/config");

function buscarComputadores(idEmpresa, idAndar) {
    if (idAndar == null) {
        var instrucao = `SELECT * FROM Maquinas WHERE fkEmpMaq = '${idEmpresa}' AND fkAndarDeTrabalho IS NULL`;
    } else {
        var instrucao = `SELECT * FROM Maquinas WHERE fkEmpMaq = '${idEmpresa}' AND fkAndarDeTrabalho = ${idAndar}`;
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function cadastrarAndar(numeroAndar, larguraAndar, comprimentoAndar, imagem) {
    var instrucao = `INSERT INTO Andar_de_trabalho (num_andar, largura_andar, comprimento_andar, foto_andar) VALUES (${numeroAndar}, ${larguraAndar}, ${comprimentoAndar}, "${imagem}")`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function salvarPosicaoComputadores(idComputador, x, y) {
    var instrucao = `UPDATE Maquinas SET posicaoX = ${x}, posicaoY = ${y} WHERE idMaquina = ${idComputador};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function cadastrarFoto(cadastro) {
    var instrucao = `INSERT INTO Andar_de_trabalho (num_andar, largura_andar, comprimento_andar, foto_andar) VALUES (${cadastro.numAndar}, ${cadastro.largAndar}, ${cadastro.compAndar}, "${cadastro.imagem}")`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function buscarComputadores(idEmpresa, idAndar) {
    if (idAndar == null) {
        var instrucao = `SELECT * FROM Maquinas WHERE fkEmpMaq = '${idEmpresa}' AND fkAndarDeTrabalho IS NULL`;
    } else {
        var instrucao = `SELECT * FROM Maquinas WHERE fkEmpMaq = '${idEmpresa}' AND fkAndarDeTrabalho = ${idAndar}`;
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function buscarAndares(idEmpresa) {
    
    var instrucao = `select * from andar_de_trabalho where fkEmpAndar = ${idEmpresa};`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarComputadores,
    cadastrarAndar,
    salvarPosicaoComputadores,
    cadastrarFoto,
    buscarAndares
}