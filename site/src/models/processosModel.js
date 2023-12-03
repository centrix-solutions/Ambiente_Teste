var database = require("../database/config");

function listarProcessos(idEmpresa, idAndar, filtro) {
    if (!filtro) {
        var instrucao = `
        SELECT
            Processo.titulo,
            Maquinas.Id_do_dispositivo
        FROM
            Processo
        JOIN
            Empresa
        ON
            Processo.fkEmpProc = Empresa.idEmpresa
        LEFT JOIN
            andar_de_trabalho
        ON
            andar_de_trabalho.fkEmpAndar = Empresa.idEmpresa
        JOIN
            Maquinas
        ON
            Maquinas.fkEmpMaq = Empresa.idEmpresa
        LEFT JOIN
            Login
        ON
            Login.Id_do_dispositivo = Maquinas.Id_do_dispositivo
        WHERE
            Empresa.idEmpresa = 1;`;
        console.log("Executando listarProcessos sem filtro: \n" + instrucao);
        return database.executar(instrucao);
    }
    if (idAndar == null) {
        var instrucao = `
        SELECT
            Processo.titulo,
            Maquinas.Id_do_dispositivo
        FROM
            Processo
        JOIN
            Empresa
        ON
            Processo.fkEmpProc = Empresa.idEmpresa
        LEFT JOIN
            andar_de_trabalho
        ON
            andar_de_trabalho.fkEmpAndar = Empresa.idEmpresa
        JOIN
            Maquinas
        ON
            Maquinas.fkEmpMaq = Empresa.idEmpresa
        LEFT JOIN
            Login
        ON
            Login.Id_do_dispositivo = Maquinas.Id_do_dispositivo
        WHERE
            Empresa.idEmpresa = ${idEmpresa} AND Maquinas.fkAndarDeTrabalho IS NULL;`;
    } else {
        var instrucao = `
        SELECT
            Processo.titulo,
            Maquinas.Id_do_dispositivo
        FROM
            Processo
        JOIN
            Empresa
        ON
            Processo.fkEmpProc = Empresa.idEmpresa
        LEFT JOIN
            andar_de_trabalho
        ON
            andar_de_trabalho.fkEmpAndar = Empresa.idEmpresa
        JOIN
            Maquinas
        ON
            Maquinas.fkEmpMaq = Empresa.idEmpresa
        LEFT JOIN
            Login
        ON
            Login.Id_do_dispositivo = Maquinas.Id_do_dispositivo
        WHERE
            Empresa.idEmpresa = 1 AND Maquinas.fkAndarDeTrabalho = ${idAndar};`;
    }
    console.log("Executando listarProcessos com filtro: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarProcessos
}