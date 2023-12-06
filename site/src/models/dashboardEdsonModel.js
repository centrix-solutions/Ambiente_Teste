var database = require("../database/config");

function buscarPalavrasWordCloud() {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT palavraGrossa AS palavra, quantidadeTotalAtual AS total FROM grosseria`; // SQL SERVER
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `SELECT palavraGrossa AS palavra, quantidadeTotalAtual AS total FROM grosseria`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function kpiMesAtual() {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `SELECT SUM(quantidadeTotalAtual) AS mesAtual FROM grosseria`; // SQL SERVER
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `SELECT SUM(quantidadeTotalAtual) AS mesAtual FROM grosseria`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    return database.executar(instrucao);
}

function kpiMesPassado() {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `SELECT SUM(quantidadeTotalPassado) AS mesPassado FROM grosseria`; // SQL SERVER
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `SELECT SUM(quantidadeTotalPassado)AS mesPassado FROM grosseria`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    return database.executar(instrucao);
}

module.exports = {
    buscarPalavrasWordCloud,
    kpiMesAtual,
    kpiMesPassado,
}