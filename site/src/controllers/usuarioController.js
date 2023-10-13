var usuarioModel = require("../models/usuarioModel");


function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.length == 1) {
                    console.log(resultadoAutenticar);


                    sessionStorage.setItem("id", resultadoAutenticar[0].idfuncionario);
                    sessionStorage.setItem("nome", resultadoAutenticar[0].nome);
                    sessionStorage.setItem("email", resultadoAutenticar[0].email);
                    sessionStorage.setItem("senha", resultadoAutenticar[0].senha);
                    sessionStorage.setItem("NivelAcesso", resultadoAutenticar[0].fkNivelAcesso);
                    sessionStorage.setItem("Turno", resultadoAutenticar[0].fkTurno);
                    sessionStorage.setItem("Empresa", resultadoAutenticar[0].empresaId);

                    res.json({
                        id: resultadoAutenticar[0].idfuncionario,
                        nome: resultadoAutenticar[0].nome,
                        email: resultadoAutenticar[0].email,
                        senha: resultadoAutenticar[0].senha,
                        NivelAcesso: resultadoAutenticar[0].fkNivelAcesso,
                        Turno: resultadoAutenticar[0].fkTurno,
                        Empresa: resultadoAutenticar[0].empresaId
                    });
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });

    }

}


module.exports = {
    autenticar
}