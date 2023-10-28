var database = require("../database/config");

function cadastrarFuncionario(nome, email, senha, fkEmpresa, nivelAcesso) {
  var instrucaoSql1 = `insert into Funcionario (nome, email, senha, fkEmpFunc, fkNivelAcesso) values 
  ('${nome}', '${email}','${senha}', ${fkEmpresa}, ${nivelAcesso})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql1);
  return database.executar(instrucaoSql1);
}

module.exports = {
  cadastrarFuncionario
}