import org.springframework.jdbc.core.JdbcTemplate

class MaquinaRepositorio {

    lateinit var jdbcTemplate: JdbcTemplate

    fun iniciar() {

        jdbcTemplate = Conexao.jdbcTemplate!!

    }

    fun autenticarMaquina(id: String): Boolean {
        val verificarMaquina = jdbcTemplate.queryForObject(
            "SELECT COUNT(*) AS count FROM Maquinas WHERE Id_do_dispositivo = ?",
            arrayOf(id),
            Int::class.java
        )
        return verificarMaquina == 1
    }

    fun registrarMaquina(novaMaquina: Maquina) {
        jdbcTemplate.update(
            """
        INSERT INTO Maquinas (Sistema_Operacional, Id_do_dispositivo, fkEmpMaq)
        VALUES (?, ?, ?)
        """.trimIndent(),
            novaMaquina.SO,
            novaMaquina.idCPU,
            novaMaquina.fkEmpMaq
        )
    }
}