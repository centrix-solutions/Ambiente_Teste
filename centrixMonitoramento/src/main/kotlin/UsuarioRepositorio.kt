
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
    fun atualizarAtividade(usuarioLogado: Usuario, idMaq: Int, atividade: String) {
        jdbcTemplate.update(
            """
                UPDATE Login
                SET Atividade = '${atividade}'
                WHERE idFuncionario = ${usuarioLogado.idFuncionario} and idMaquina = ${idMaq};
        """.trimIndent(),

        )
    }

}