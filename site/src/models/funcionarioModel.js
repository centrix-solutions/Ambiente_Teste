var database = require("../database/config");

function cadastrarFuncionario(nome, email, senha, fkEmpresa, nivelAcesso) {
  var instrucaoSql1 = `insert into Funcionario (nome, email, senha, fkEmpFunc, fkNivelAcesso) values 
  ('${nome}', '${email}','${senha}', ${fkEmpresa}, ${nivelAcesso})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql1);
  return database.executar(instrucaoSql1);
}
function buscarFuncionarios(idEmpresa) {
  var instrucao = `SELECT Login.idLogin AS idLogin, Funcionario.idFuncionario as idFuncionario, Funcionario.nome AS nome, Funcionario.email AS email, fkNivelAcesso AS nivelAcesso, Login.Id_do_dispositivo AS idDispositivo, Login.dataHoraSaida AS atividade FROM funcionario JOIN Login ON Funcionario.idFuncionario = Login.idFuncionario WHERE idEmpresa = ${idEmpresa} ORDER BY idLogin DESC`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}
function mudarNivelAcesso(idFuncionario, tipo) {
  var instrucao = `UPDATE Funcionario SET fkNivelAcesso = ${tipo} WHERE idFuncionario = ${idFuncionario};`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}
function mudarAndar(idFuncionario, andar) {
  var instrucao = `UPDATE Funcionario SET fkAndar = ${andar} WHERE idFuncionario = ${idFuncionario};`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  cadastrarFuncionario,
  buscarFuncionarios,
  mudarNivelAcesso,
  mudarAndar
}