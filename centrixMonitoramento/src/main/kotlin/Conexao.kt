import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

object Conexao {

    //substitua aqui
    var bancoUser = "root"
    var bancoSenha = "#Gf53359131851"
    //var bancoSenha = "38762"

    var jdbcTemplate: JdbcTemplate? = null

        get() {
            if (field == null) {
                val dataSource = BasicDataSource()
                dataSource.url = "jdbc:mysql://localhost?serverTimezone=UTC"
                dataSource.driverClassName = "com.mysql.cj.jdbc.Driver"
                dataSource.username =  bancoUser
                dataSource.password =  bancoSenha
                val novoJdbcTemplate = JdbcTemplate(dataSource)
                field = novoJdbcTemplate
                println("////Login no banco bem sucedido!\\\\")

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
            }
            return field
        }

}