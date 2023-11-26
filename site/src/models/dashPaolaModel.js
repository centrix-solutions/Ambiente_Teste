var database = require("../database/config")

function listar() {
    var instrucao = `
    select avg(Dado_Capturado) from monitoramento where fkCompMoniExistentes = ${idEmpresa};
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar
};