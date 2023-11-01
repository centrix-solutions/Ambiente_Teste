/*
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
        """.trimIndent(), valor, fkComponente, idMaq, novaMaquina.fkEmpMaq
        )
    }

    fun obterComponentesExistentes(): List<Componente> {
        val query = "SELECT * FROM Componentes_Existentes"
        return jdbcTemplate.query(query, BeanPropertyRowMapper(Componente::class.java))
    }

    fun monitorarComponentes(componentesMonitorados: List<Componente>) {
        while (true) {
            val looca = Looca()
            for (componente in componentesMonitorados) {
                when (componente.nome) {
                    "CPU" -> monitorarCPU(looca)
                    "RAM" -> monitorarRAM(looca)
                    // Adicionar outros, caso dê certo
                }
            }
            Thread.sleep(5000)
        }
    }

    private fun monitorarCPU(looca: Looca) {
        val usoCPU = looca.processador.uso.toFloat()
        println("Uso de CPU: $usoCPU%")
    }

    private fun monitorarRAM(looca: Looca) {
        val usoRAM = looca.memoria.emUso.toFloat() / (1024 * 1024)
        println("Uso de RAM: $usoRAM MB")
    }
}

 */