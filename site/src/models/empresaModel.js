var database = require("../database/config");

f

function cadastrarEmpresa(Nome_fantasia, Razao_social, Apelido_interno, CNPJ, Responsavel_legal, sede) {
  var query = `insert into Empresa (Nome_fantasia, Razao_social, Apelido_interno, CNPJ, Responsavel_legal, FkSede) values 
  ('${Nome_fantasia}', '${Razao_social}', '${Apelido_interno}', '${CNPJ}','${Responsavel_legal}', ${sede})`;

  return database.executar(query);
}

module.exports = {
  cadastrarEmpresa,
  buscarFk,
}