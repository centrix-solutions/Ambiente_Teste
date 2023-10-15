import org.springframework.jdbc.core.BeanPropertyRowMapper
import org.springframework.jdbc.core.JdbcTemplate
import java.time.LocalTime

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
            "SELECT idFuncionario, nome, email, senha, fkEmpFunc, fkNivelAcesso, fkTurno FROM Funcionario WHERE email = ? AND senha = ?",
            arrayOf(logarUsuarioEmail, logarUsuarioSenha),
            BeanPropertyRowMapper(Usuario::class.java)
        )
        return funcionario
    }
    fun registrarLogin(usuarioLogado: Usuario, idMaq: Int, horaLogin: LocalTime) {
        jdbcTemplate.update(
            """
        INSERT INTO Login (idFuncionario, idMaquina, idEmpresa, Nome, HoraLogin, Turno)
        VALUES (?, ?, ?, ?, ?, ?)
        """.trimIndent(),
            usuarioLogado.idFuncionario,
            idMaq,
            usuarioLogado.fkEmpFunc,
            usuarioLogado.nome,
            horaLogin,
            usuarioLogado.fkTurno
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