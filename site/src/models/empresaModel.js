var database = require("../database/config");

function cadastrarEmpresa(Nome_fantasia, CNPJ, Responsavel_legal, cep, numero, complemento) {
  var instrucaoSql1 = `insert into Empresa (Nome_fantasia, CNPJ, Responsavel_legal, CEP, numero, complemento, fkSede) values 
  ('${Nome_fantasia}', '${CNPJ}','${Responsavel_legal}', ${cep}, ${numero}, '${complemento}', null)`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql1);
  return database.executar(instrucaoSql1);
}

function buscarFk(cnpj) {
  var instrucaoSql2 = `SELECT Idempresa as fkempresa FROM empresa where CNPJ = '${cnpj}'`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql2);
  return database.executar(instrucaoSql2);
}

function cadastrarFuncionario(nome, email, senha, fkEmpresa) {
  var instrucaoSql3 = `insert into Funcionario (nome, email, senha, fkEmpFunc, fkNivelAcesso) values 
  ('${nome}', '${email}','${senha}', ${fkEmpresa}, 1, null)`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql3);
  return database.executar(instrucaoSql3);
}

module.exports = {
  cadastrarEmpresa,
  buscarFk,
  cadastrarFuncionario
}