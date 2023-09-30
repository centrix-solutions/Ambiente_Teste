import org.springframework.jdbc.core.BeanPropertyRowMapper
import org.springframework.jdbc.core.JdbcTemplate

class InfoSistemaRepositorio {
/*
Esta classe irá abstrair os métodos
de acesso à tabela
(insert, select, delete, update)

Criamos sempre 1 Repositorio por tabela
 */
    lateinit var jdbcTemplate: JdbcTemplate

    fun iniciar(){
        jdbcTemplate = Conexao.jdbcTemplate!!
    }
    fun cadastrar(pcSistema: InfoSistema){
        jdbcTemplate.update("""
            insert into infoSistema (SO, fabricante, arquitetura, tempAtividade, permissoes)
            values
            ('${pcSistema.SO}', '${pcSistema.fabricante}', ${pcSistema.arquitetura}, ${pcSistema.tempAtividade},
            ${pcSistema.permissoes})
        """
        )
    }
    fun visualizar(idComputador: Int): InfoSistema{
       val sistema = jdbcTemplate.queryForObject("""
            select * from infoSistema where idComputador = $idComputador
        """, BeanPropertyRowMapper(InfoSistema::class.java))
        return sistema
    }
    fun getultimoId(): Int{
        val ultimoCodigo = jdbcTemplate.queryForObject("""
            select max(idComputador) from infoSistema
        """, Int::class.java
        )

        return  ultimoCodigo
    }
    fun limparTabela(){
        jdbcTemplate.execute("""
            truncate table infoSistema
        """)
    }

}