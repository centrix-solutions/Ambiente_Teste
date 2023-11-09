import com.github.britooo.looca.api.core.Looca
import org.springframework.jdbc.core.BeanPropertyRowMapper
import org.springframework.jdbc.core.JdbcTemplate

class ComponentesRepositorio {
    lateinit var jdbcTemplate: JdbcTemplate
    lateinit var jdbcTemplateServer: JdbcTemplate

    fun iniciar() {

        jdbcTemplate = Conexao.jdbcTemplate!!
        jdbcTemplateServer = Conexao.jdbcTemplateServer!!
    }

    fun buscarIdMaq(novaMaquina: Maquina): Int {
        val idMaquinaComp = jdbcTemplate.queryForObject(
            "SELECT idMaquina FROM Maquinas WHERE Id_do_dispositivo = ?",
            arrayOf(novaMaquina.idMaquina),
            Int::class.java
        )
        return idMaquinaComp
    }

    fun buscarIdMaqPorId(idProcessador:String): Int {
        val idMaquinaComp = jdbcTemplate.queryForObject(
            "SELECT idMaquina FROM Maquinas WHERE Id_do_dispositivo = ?",
            arrayOf(idProcessador),
            Int::class.java
        )
        return idMaquinaComp
    }

    fun buscarComponetesMaq(idMaquina:Int): List<Int> {
        val componetes = jdbcTemplate.queryForList(
            "SELECT fkComponentesExistentes FROM maquinas AS m JOIN componentes_monitorados AS c ON m.idMaquina = c.FKMaquina WHERE idMaquina = ?;",
            arrayOf(idMaquina),
            Int::class.java
        )
        return componetes
    }

    fun buscarIdComp(fkEmpresa:Int,fkMaquina:Int,fkComponentesExistentes:Int): Int {
        val idComponente = jdbcTemplate.queryForObject(
            "SELECT idComponente_monitorado FROM componentes_monitorados WHERE fkEmpMaqComp = ? AND fkMaquina = ? AND fkComponentesExistentes = ?;",
            arrayOf(fkEmpresa,fkMaquina,fkComponentesExistentes),
            Int::class.java
        );
        return idComponente;
    }

    fun registrarComponente(valor: Double, fkComponente: Int, idMaq: Int, novaMaquina: Maquina) {
        jdbcTemplate.update(
            """
        INSERT INTO Componentes_Monitorados (valor, fkComponentesExistentes, fkMaquina, fkEmpMaqComp)
        VALUES (?, ?, ?, ?)
        """.trimIndent(), valor, fkComponente, idMaq, novaMaquina.fkEmpMaq
        )
        jdbcTemplateServer.update(
            """
        INSERT INTO Componentes_Monitorados (valor, fkComponentesExistentes, fkMaquina)
        VALUES (?, ?, ?)
        """.trimIndent(), valor, fkComponente, idMaq
        )

    }
}
