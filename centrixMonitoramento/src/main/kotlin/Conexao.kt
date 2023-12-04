
import com.github.britooo.looca.api.core.Looca
import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

object Conexao {

    private val looca = Looca()
    private val so = looca.sistema.sistemaOperacional


    var bancoUser = "root"
    val bancoSenha = if (so.contains("Win")) {
        "38762"
    } else {
        "urubu100"
    }
    private var bancoUserServer = "sa"
    private var bancoSenhaServer = "centrix"

    var jdbcTemplate: JdbcTemplate? = null

        get() {
            if (field == null) {
                val dataSource = BasicDataSource()
                dataSource.url = "jdbc:mysql://localhost:3306/centrix?serverTimezone=UTC"
                dataSource.driverClassName = "com.mysql.cj.jdbc.Driver"
                dataSource.username =  bancoUser
                dataSource.password =  bancoSenha
                val novoJdbcTemplate = JdbcTemplate(dataSource)
                field = novoJdbcTemplate

                jdbcTemplate!!.execute(
                    """
                  create database if not exists centrix
              """
                )
                jdbcTemplate!!.execute(
                    """
                  use centrix
              """
                )
                jdbcTemplate!!.execute(
                    """
                        CREATE TABLE IF NOT EXISTS Monitoramento (
                        	idMonitoramento INT primary key auto_increment,
                            Data_captura DATE,
                            Hora_captura TIME,
                            Dado_Capturado DECIMAL(10,2),
                            fkCompMonitorados INT,
                            fkCompMoniExistentes INT,
                            fkMaqCompMoni INT,
                            fkEmpMaqCompMoni INT
                        )
                    """.trimIndent()
                )
                jdbcTemplate!!.execute(
                    """
                        CREATE TABLE IF NOT EXISTS Login (
                            idLogin INT primary key auto_increment,
                            Email VARCHAR(45),
                            Atividade VARCHAR(255),
                            Id_do_dispositivo CHAR(16),
                            dataHoraEntrada DATETIME,
                            dataHoraSaida DATETIME
                        )
                    """.trimIndent()
                )
            }
            return field
        }

    var jdbcTemplateServer: JdbcTemplate? = null

        get() {
            if (field == null) {
                val dataSourceServer = BasicDataSource()
                dataSourceServer.url = "jdbc:sqlserver://44.197.21.59;encrypt=false"

                dataSourceServer.driverClassName = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
                dataSourceServer.username =  bancoUserServer
                dataSourceServer.password =  bancoSenhaServer
                val novoJdbcTemplateServer = JdbcTemplate(dataSourceServer)
                field = novoJdbcTemplateServer
                jdbcTemplateServer!!.execute(
                    """
                  use centrix
              """
                )
            }
            return field
        }
}