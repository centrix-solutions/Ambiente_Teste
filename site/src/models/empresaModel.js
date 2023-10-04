var database = require("../database/config");

function cadastrarEmpresa(Nome_fantasia, Razao_social, Apelido_interno, CNPJ, Responsavel_legal, sede) {
  var instrucaoSql1 = `insert into Empresa (Nome_fantasia, Razao_social, Apelido_interno, CNPJ, Responsavel_legal, FkSede) values 
  ('${Nome_fantasia}', '${Razao_social}', '${Apelido_interno}', '${CNPJ}','${Responsavel_legal}', ${sede})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql1);
  return database.executar(instrucaoSql1);
}

function buscarFk(cnpj) {
  var instrucaoSql2 = `SELECT Idempresa as fkempresa FROM empresa where CNPJ = '${cnpj}'`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql2);
  return database.executar(instrucaoSql2);
}

function cadastrarEndereco(rua, bairro, cidade, estado, numero, cep, fkempresa) {
  var instrucaoSql3 = `insert into Empresa_endereco (rua, bairro, cidade, estado, numero, cep, fkempresa) values 
  ('${rua}', '${bairro}', '${cidade}', '${estado}', ${numero}, '${cep}', ${fkempresa})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql3);
  return database.executar(instrucaoSql3);
}

module.exports = {
  cadastrarEmpresa,
  buscarFk,
  cadastrarEndereco,
}