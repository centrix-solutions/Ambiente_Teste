var database = require("../database/config")

function enviarAlerta(idFuncionario) {
    var instrucao = `UPDATE Funcionario SET notificacao = 'S' WHERE idfuncionario = ${idFuncionario}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    enviarAlerta
};