import com.github.britooo.looca.api.core.Looca
import javax.swing.JOptionPane


fun main(){
    Conexao.criarTabelaSistema()

    val repositorioSistema = InfoSistemaRepositorio()
    repositorioSistema.iniciar()

    val looca = Looca()

    val sistema: com.github.britooo.looca.api.group.sistema.Sistema = looca.sistema

    val pcSistema = InfoSistema()

    // Capturar os dados que vão ser inseridos na tabela
    val sistemaOperacional = sistema.sistemaOperacional
    val fabricante = sistema.fabricante
    val arquitetura = sistema.arquitetura
    val tempoAtividade = sistema.tempoDeAtividade
    val permissoes = sistema.permissao

    pcSistema.SO = sistemaOperacional
    pcSistema.fabricante = fabricante
    pcSistema.arquitetura = arquitetura
    pcSistema.tempAtividade = tempoAtividade
    pcSistema.permissoes = permissoes

    // Apenas para testes
    repositorioSistema.limparTabela()
    // Apenas para testes

    repositorioSistema.cadastrar(pcSistema)
    val ultimoId = repositorioSistema.getultimoId()

    val idComputador: Int = JOptionPane.showInputDialog("Quais dos computadores você quer ver o sistema?\n " +
            "Computadores cadastrados 1 à $ultimoId").toInt()

    val dadosSistema = repositorioSistema.visualizar(idComputador)

    JOptionPane.showMessageDialog(null, "Esses foram os dados de sistema recuperados do nosso banco\n" +
            " idRegistro: ${dadosSistema.idComputador}\nSistema Operacional: ${dadosSistema.SO}\n " +
            "Fabricante: ${dadosSistema.fabricante}\n Arquitetura: ${dadosSistema.arquitetura}bits\n " +
            "Tempo Ativo: ${dadosSistema.tempAtividade}\n Permissões: ${dadosSistema.permissoes}")

    /*
       println(sistema)

    //Criação do gerenciador
    val grupoDeDiscos = looca.grupoDeDiscos

    //Obtendo lista de discos a partir do getter
    val discos = grupoDeDiscos.discos

    for (disco in discos) {
        println(disco)
    } */
}