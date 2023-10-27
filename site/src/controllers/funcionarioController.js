var funcionarioModel = require("../models/funcionarioModel");

function cadastrarFuncionario(req, res) {

  var nome = req.body.nomeServer
  var email = req.body.emailServer
  var senha = req.body.senhaServer
  var fkEmpresa = req.body.fkEmpresaServer
  var nivelAcesso = req.body.nivelAcessoServer

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (nivelAcesso == undefined) {
    res.status(400).send("Seu nivelAcesso está undefined!");
  } else if (fkEmpresa == undefined) {
    res.status(400).send("Seu fkEmpresa está undefined!");
  } else {
    funcionarioModel.cadastrarFuncionario(nome, email, senha, fkEmpresa, nivelAcesso)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastro do funcionario! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }

}
module.exports = {
  cadastrarFuncionario
}