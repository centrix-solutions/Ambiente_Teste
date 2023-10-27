
import org.springframework.jdbc.core.BeanPropertyRowMapper
import org.springframework.jdbc.core.JdbcTemplate
import java.time.LocalDateTime

class UsuarioRepositorio {

    lateinit var jdbcTemplate: JdbcTemplate

    fun iniciar() {

        jdbcTemplate = Conexao.jdbcTemplate!!

    }

    fun autenticarLogin(logarUsuarioEmail: String, logarUsuarioSenha: String): Boolean {
        val consulta = jdbcTemplate.queryForObject(
            "SELECT COUNT(*) AS count FROM Funcionario WHERE email = ? AND senha = ?",
            arrayOf(logarUsuarioEmail, logarUsuarioSenha),
            Int::class.java
        )

        return consulta == 1
    }

    fun logarFuncionario(logarUsuarioEmail: String, logarUsuarioSenha: String): Usuario {
        val funcionario = jdbcTemplate.queryForObject(
            "SELECT idFuncionario, nome, email, senha, fkEmpFunc, fkNivelAcesso FROM Funcionario WHERE email = ? AND senha = ?",
            arrayOf(logarUsuarioEmail, logarUsuarioSenha),
            BeanPropertyRowMapper(Usuario::class.java)
        )
        return funcionario
    }
    fun registrarLogin(usuarioLogado: Usuario, idMaq: Int, maquinaSpecs:Maquina, horaLogin: LocalDateTime) {
        jdbcTemplate.update(
            """
        INSERT INTO Login (idFuncionario, idMaquina, idEmpresa, Nome, Id_do_dispositivo, dataHoraEntrada)
        VALUES (?, ?, ?, ?, ?, ?)
        """.trimIndent(),
            usuarioLogado.idFuncionario,
            idMaq,
            usuarioLogado.fkEmpFunc,
            usuarioLogado.nome,
            maquinaSpecs.idCPU,
            horaLogin
        )
    }
    fun atualizarAtividade(usuarioLogado: Usuario, idMaq: Int, atividade: String, horaLogin: LocalDateTime) {
        jdbcTemplate.update(
            """
                UPDATE Login
                SET Atividade = '${atividade}'
                WHERE idFuncionario = ${usuarioLogado.idFuncionario} and idMaquina = ${idMaq} 
                and idEmpresa = ${usuarioLogado.fkEmpFunc};
        """.trimIndent(),

        )
    }
    fun registrarSaida(usuarioLogado: Usuario, idMaquina: Int, horaLogin: LocalDateTime, horaLogout: LocalDateTime){
        jdbcTemplate.update(
            """
                UPDATE Login
                SET dataHoraSaida = '${horaLogout}'
                WHERE idFuncionario = ${usuarioLogado.idFuncionario}
                and idMaquina = ${idMaquina} and idEmpresa = ${usuarioLogado.fkEmpFunc}
            """.trimIndent()
        )
    }
    fun verificarLogin(usuarioLogado: Usuario, idMaquina: Int): LocalDateTime? {
        val sql = """
        SELECT MIN(dataHoraEntrada) AS dataMaisAntigaEntrada
        FROM login
        WHERE idFuncionario = ${usuarioLogado.idFuncionario} AND idMaquina = $idMaquina AND idEmpresa = ${usuarioLogado.fkEmpFunc};
    """.trimIndent()

        return jdbcTemplate.queryForObject(sql) { rs, _ ->
            rs.getTimestamp("dataMaisAntigaEntrada")?.toLocalDateTime()
        }
    }
    fun apagarLogs(usuarioLogado: Usuario, idMaquina: Int){
        jdbcTemplate.update("""
        DELETE FROM login
        WHERE dataHoraEntrada <= NOW() and idFuncionario = ${usuarioLogado.idFuncionario} AND 
        idMaquina = $idMaquina AND idEmpresa = ${usuarioLogado.fkEmpFunc}
        ORDER BY dataHoraEntrada ASC
        LIMIT 6;
    """.trimIndent())
    }

}