var database = require("../database/config");

function listarProcessos(idEmpresa, idAndar, filtro, pesquisa) {
    if (pesquisa != undefined) {
        var instrucao = `
        SELECT
            Processo.titulo,
            Maquinas.Id_do_dispositivo,
            Maquinas.idMaquina,
            Login.email,
            Processo.fkMaqProc
        FROM
            Processo
        RIGHT JOIN
            Maquinas
        ON
            Processo.fkMaqProc = Maquinas.idMaquina
        JOIN
            Empresa
        ON
            Maquinas.fkEmpMaq = Empresa.idEmpresa
        LEFT JOIN
            andar_de_trabalho
        ON
            andar_de_trabalho.fkEmpAndar = Empresa.idEmpresa
        LEFT JOIN
            Login
        ON
            Login.Id_do_dispositivo = Maquinas.Id_do_dispositivo
        WHERE
            Empresa.idEmpresa = ${idEmpresa} AND Maquinas.Id_do_dispositivo LIKE '%${pesquisa}%';`;
        console.log("Executando listarProcessos com pesquisa: \n" + instrucao);
        return database.executar(instrucao);
    }
    if (!filtro) {
        var instrucao = `
        SELECT
            Processo.titulo,
            Maquinas.Id_do_dispositivo,
            Maquinas.idMaquina,
            Login.email,
            Processo.fkMaqProc
        FROM
            Processo
        RIGHT JOIN
            Maquinas
        ON
            Processo.fkMaqProc = Maquinas.idMaquina
        JOIN
            Empresa
        ON
            Maquinas.fkEmpMaq = Empresa.idEmpresa
        LEFT JOIN
            andar_de_trabalho
        ON
            andar_de_trabalho.fkEmpAndar = Empresa.idEmpresa
        LEFT JOIN
            Login
        ON
            Login.Id_do_dispositivo = Maquinas.Id_do_dispositivo
        WHERE
            Empresa.idEmpresa = ${idEmpresa};`;
        console.log("Executando listarProcessos sem filtro: \n" + instrucao);
        return database.executar(instrucao);
    }
    if (idAndar == null) {
        var instrucao = `
        SELECT
            Processo.titulo,
            Maquinas.Id_do_dispositivo,
            Maquinas.idMaquina,
            Login.email,
            Processo.fkMaqProc
        FROM
            Processo
        RIGHT JOIN
            Maquinas
        ON
            Processo.fkMaqProc = Maquinas.idMaquina
        JOIN
            Empresa
        ON
            Maquinas.fkEmpMaq = Empresa.idEmpresa
        LEFT JOIN
            andar_de_trabalho
        ON
            andar_de_trabalho.fkEmpAndar = Empresa.idEmpresa
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
            Maquinas.Id_do_dispositivo,
            Maquinas.idMaquina,
            Login.email,
            Processo.fkMaqProc
        FROM
            Processo
        RIGHT JOIN
            Maquinas
        ON
            Processo.fkMaqProc = Maquinas.idMaquina
        JOIN
            Empresa
        ON
            Maquinas.fkEmpMaq = Empresa.idEmpresa
        LEFT JOIN
            andar_de_trabalho
        ON
            andar_de_trabalho.fkEmpAndar = Empresa.idEmpresa
        LEFT JOIN
            Login
        ON
            Login.Id_do_dispositivo = Maquinas.Id_do_dispositivo
        WHERE
            Empresa.idEmpresa = ${idEmpresa} AND Maquinas.fkAndarDeTrabalho = ${idAndar};`;
    }
    console.log("Executando listarProcessos com filtro: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarProcessos
}