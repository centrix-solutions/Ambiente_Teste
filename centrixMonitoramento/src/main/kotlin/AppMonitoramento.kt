import com.github.britooo.looca.api.core.Looca
import java.time.LocalDate
import java.time.LocalTime
import java.time.ZoneId
import java.util.*

fun main() {

    val looca = Looca()
    val sn = Scanner(System.`in`)
    val usuarioLogado = Usuario()
    val repositorioUser = UsuarioRepositorio()
    val repositorioMaquina = MaquinaRepositorio()
    val repositorioComponentes = ComponentesRepositorio()
    val repositorioMonitoramento = MonitoramentoRepositorio()

    repositorioUser.iniciar()
    repositorioMaquina.iniciar()
    repositorioComponentes.iniciar()
    repositorioMonitoramento.iniciar()

    var idEmpresa:Int = 0;

    println(" ██████╗███████╗███╗   ██╗████████╗██████╗ ██╗██╗  ██╗                   \n" +
            "██╔════╝██╔════╝████╗  ██║╚══██╔══╝██╔══██╗██║╚██╗██╔╝                   \n" +
            "██║     █████╗  ██╔██╗ ██║   ██║   ██████╔╝██║ ╚███╔╝                    \n" +
            "██║     ██╔══╝  ██║╚██╗██║   ██║   ██╔══██╗██║ ██╔██╗                    \n" +
            "╚██████╗███████╗██║ ╚████║   ██║   ██║  ██║██║██╔╝ ██╗                   \n" +
            " ╚═════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝                   \n" +
            "                                                                         \n" +
            "███████╗ ██████╗ ██╗     ██╗   ██╗████████╗██╗ ██████╗ ███╗   ██╗███████╗\n" +
            "██╔════╝██╔═══██╗██║     ██║   ██║╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝\n" +
            "███████╗██║   ██║██║     ██║   ██║   ██║   ██║██║   ██║██╔██╗ ██║███████╗\n" +
            "╚════██║██║   ██║██║     ██║   ██║   ██║   ██║██║   ██║██║╚██╗██║╚════██║\n" +
            "███████║╚██████╔╝███████╗╚██████╔╝   ██║   ██║╚██████╔╝██║ ╚████║███████║\n" +
            "╚══════╝ ╚═════╝ ╚══════╝ ╚═════╝    ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝")

    /* INICIO LOGIN */

    while (true) {
        println("-----login-----")
        println("Digite o seu email:")
        val logarUsuarioEmail = sn.nextLine()
        println("Digite sua senha:")
        val logarUsuarioSenha = sn.nextLine()

        val autenticado = repositorioUser.autenticarLogin(logarUsuarioEmail, logarUsuarioSenha)

        if (autenticado) {
            println("Login bem-sucedido!")
            val user = repositorioUser.logarFuncionario(logarUsuarioEmail, logarUsuarioSenha)

            usuarioLogado.idFuncionario = user.idFuncionario
            usuarioLogado.nome = user.nome
            usuarioLogado.email = user.email
            usuarioLogado.senha = user.senha
            usuarioLogado.fkEmpFunc = user.fkEmpFunc
            usuarioLogado.fkNivelAcesso = user.fkNivelAcesso

            idEmpresa = user.fkEmpFunc;
            println("Bem vindo ${usuarioLogado.nome}")
            break
        } else {
            println("Email ou senha incorretos. Tente novamente.")
        }
    }

    /* FIM LOGIN */

    /* INICIO VERIFICAÇÃO DE MAQUINA EXISTENTE */

    val id = looca.processador.id
    val verificacao = repositorioMaquina.autenticarMaquina(id)
    if (!verificacao){
        println("Essa máquina não existe na base de dados")
        Thread.sleep(1 * 1000L)
        println("Iniciando o cadastro.....")

        val novaMaquina = Maquina()

        novaMaquina.SO = looca.sistema.sistemaOperacional
        novaMaquina.idCPU = looca.processador.id
        novaMaquina.fkEmpMaq = usuarioLogado.fkEmpFunc

        val horaLogin = LocalTime.now()
        repositorioMaquina.registrarMaquina(novaMaquina)

        val idMaq = repositorioComponentes.buscarIdMaq(novaMaquina)

        repositorioUser.registrarLogin(usuarioLogado, idMaq, horaLogin)

        val valores = listOf(
            100.0, //cpu 1
            looca.grupoDeDiscos.tamanhoTotal.toDouble() / (1024 * 1024), //disco 2
            looca.memoria.total.toDouble() / (1024 * 1024), //ram 3
            looca.dispositivosUsbGrupo.totalDispositvosUsbConectados.toDouble(), //usb 4
            0.0, // janelas do sistema 7
            0.0 // processos 8
        )
        val componentes = listOf(1, 2, 3, 4, 7, 8)

        for (i in 0 until valores.size) {
            val valor = valores[i]
            val fkComponente = componentes[i]
            repositorioComponentes.registrarComponente(valor, fkComponente, idMaq, novaMaquina)
        }

        println("Máquina cadastrada com monitoramento padrão.....")
        Thread.sleep(2 * 1000L)
    } else println("Essa máquina já foi cadastrada");

    /* FIM VERIFICAÇÃO DE MAQUINA EXISTENTE */

    /* INICIO BUSCA DE DADOS, COMPONENTES E IDS */

    val idMaquina:Int = repositorioComponentes.buscarIdMaqPorId(id);

    val componentesExistentes:MutableList<String> = mutableListOf();
    val fkcomponentesMonitorados:MutableList<Int> = mutableListOf();
    val componentes:List<Int> = repositorioComponentes.buscarComponetesMaq(idMaquina);
    val nomeComponentes:List<String> = listOf("Cpu", "Disco", "Ram", "Usb", "Taxa Download", "Taxa Upload", "Janelas do Sistema", "Processos");
    componentes.forEach{
        componentesExistentes.add(nomeComponentes[it - 1]);
        when (it){
            4 -> fkcomponentesMonitorados.add(repositorioComponentes.buscarIdComp(idEmpresa,idMaquina,it));
            7 -> fkcomponentesMonitorados.add(repositorioComponentes.buscarIdComp(idEmpresa,idMaquina,it));
            8 -> fkcomponentesMonitorados.add(repositorioComponentes.buscarIdComp(idEmpresa,idMaquina,it));
        }
    }

    /* FIM BUSCA DE DADOS, COMPONENTES E IDS */

    /* INICIO MONITORAMENTO */

    if (usuarioLogado.fkNivelAcesso > 1){
        // colocar os secs aq dentro?
    }
    println("A cada quantos segundos quer obter os dados?")
    val tempo = sn.nextLine().toInt()
    val arquivo = ScriptPadraoPython.criarScript(tempo, idMaquina, idEmpresa)

    println("Iniciando o monitoramento....")

    ScriptPadraoPython.executarScript(arquivo)
        while (true) {

            ScriptPadraoPython.executarScript(arquivo);
            val atividade =  looca.grupoDeJanelas.janelas[3].titulo
            repositorioUser.atualizarAtividade(usuarioLogado, idMaquina, atividade)

            val dados:MutableList<Float> = mutableListOf(
                //looca.processador.uso.toFloat(),
                //looca.memoria.emUso.toFloat() / (1024 * 1024),
                //looca.dispositivosUsbGrupo.totalDispositvosUsbConectados.toFloat(),
                //looca.rede.grupoDeInterfaces.interfaces.get(0).bytesEnviados.toFloat() / (1024 * 1024),
                //looca.rede.grupoDeInterfaces.interfaces.get(0).bytesRecebidos.toFloat() / (1024 * 1024),
                //looca.grupoDeJanelas.totalJanelas.toFloat(),
                //looca.grupoDeProcessos.totalProcessos.toFloat(),
            )

            val fkcomponentesExistentes:MutableList<Int> = mutableListOf();

            if (componentesExistentes.contains("Usb")){
                val usb:Float = looca.dispositivosUsbGrupo.totalDispositvosUsbConectados.toFloat();
                dados.add(usb);
                fkcomponentesExistentes.add(4)
            }
            if (componentesExistentes.contains("Janelas do Sistema")) {
                val janelas:Float = looca.grupoDeJanelas.totalJanelas.toFloat();
                dados.add(janelas);
                fkcomponentesExistentes.add(7);
            }
            if (componentesExistentes.contains("Processos")) {
                val processos:Float = looca.grupoDeProcessos.totalProcessos.toFloat();
                dados.add(processos);
                fkcomponentesExistentes.add(8);
            }
            for (i in dados.indices) {
                val zonaFusoHorario = ZoneId.of("America/Sao_Paulo")
                val data = LocalDate.now()
                val hora = LocalTime.now(zonaFusoHorario)
                val dado = dados[i]
                val fkcompMoni = fkcomponentesMonitorados[i]
                val fkcompExis = fkcomponentesExistentes[i]
                repositorioMonitoramento.registrarDados(data, hora, dado, fkcompMoni, fkcompExis, idMaquina, idEmpresa)
            }
            Thread.sleep(tempo * 1000L)
            ScriptPadraoPython.pararScript()
        }
    /* FIM MONITORAMENTO */
}