import org.springframework.jdbc.core.JdbcTemplate

class ComponentesRepositorio {
    lateinit var jdbcTemplate: JdbcTemplate

    fun iniciar() {

        jdbcTemplate = Conexao.jdbcTemplate!!

    }

    fun buscarIdMaq(novaMaquina: Maquina): Int {
        val idMaquinaComp = jdbcTemplate.queryForObject(
            "SELECT idMaquina FROM Maquinas WHERE Id_do_dispositivo = ?",
            arrayOf(novaMaquina.idMaquina),
            Int::class.java
        )
        return idMaquinaComp
    }
    fun registrarComponente(valor: Double, fkComponente: Int, idMaq: Int, novaMaquina: Maquina) {
        jdbcTemplate.update(
            """
        INSERT INTO Componentes_Monitorados (valor, fkComponentesExistentes, fkMaquina, fkEmpMaqComp)
        VALUES (?, ?, ?, ?)
        """.trimIndent(),
            valor,
            fkComponente,
            idMaq,
            novaMaquina.fkEmpMaq
        )
    }
}
