import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

object Conexao {
  var jdbcTemplate: JdbcTemplate? = null
      get(){
          if(field == null){
              val dataSource = BasicDataSource()
              dataSource.url = "jdbc:mysql://localhost?serverTimezone=UTC"
              dataSource.username = "root"
              dataSource.password = "TomboySupremacy2!"
              val novoJdbcTemplate = JdbcTemplate(dataSource)
              field = novoJdbcTemplate
              println("////Login no banco bem sucedido!\\\\")

              jdbcTemplate!!.execute("""
                  create database if not exists Centrix
              """)
              jdbcTemplate!!.execute("""
                  use Centrix
              """)
          }
          return field
      }

    fun criarTabelaSistema(){
        jdbcTemplate!!.execute("""
            create table if not exists infoSistema (    
            idComputador int primary key auto_increment,
            SO varchar(40),
            fabricante varchar(30),
            arquitetura int,
            tempAtividade double,
            permissoes bit
            )
        """)
    }
}