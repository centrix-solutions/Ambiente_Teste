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
            usuarioLogado.fkTurno = user.fkTurno

            println("Bem vindo ${usuarioLogado.nome}")
            break
        } else {
            println("Email ou senha incorretos. Tente novamente.")
        }
    }

    val id = looca.processador.id
    val verificacao = repositorioMaquina.autenticarMaquina(id)

    if (verificacao){
        if (usuarioLogado.fkNivelAcesso == 1) {
            println("Essa máquina já foi cadastrada")
            println("Iniciando o monitoramento ......")
        }
        if (usuarioLogado.fkNivelAcesso > 1){
            while (true) {
                println("Essa máquina já foi cadastrada")
            }
        }
    } else {
        println("Essa máquina não existe na base de dados")
        println("Iniciando o cadastro.....")

        val novaMaquina = Maquina()

        novaMaquina.SO = looca.sistema.sistemaOperacional
        novaMaquina.idCPU = looca.processador.id
        novaMaquina.fkEmpMaq = usuarioLogado.fkEmpFunc

        repositorioMaquina.registrarMaquina(novaMaquina)

        val idMaq = repositorioComponentes.buscarIdMaq(novaMaquina)

        val valores = listOf(100.0,
            looca.grupoDeDiscos.tamanhoTotal.toDouble() / (1024 * 1024),
            looca.memoria.total.toDouble() / (1024 * 1024),
            looca.dispositivosUsbGrupo.totalDispositvosUsbConectados.toDouble())
        val componentes = listOf(1, 2, 3, 5)

        for (i in 0 until valores.size) {
            val valor = valores[i]
            val fkComponente = componentes[i]
            repositorioComponentes.registrarComponente(valor, fkComponente, idMaq, novaMaquina)
        }

        println("Máquina cadastrada com monitoramento padrão.....")
        println("A cada quantos segundos quer obter os dados?")

        val tempo = sn.nextLine().toInt()
        val idMaquinaDado = repositorioComponentes.buscarIdMaq(novaMaquina)
        val idEmpresaDado = novaMaquina.fkEmpMaq

        scriptPadraoPython.criarScript(tempo, idMaquinaDado, idEmpresaDado)
        println("Iniciando o monitoramento....")

        while (true) {
            val dados = listOf(
                looca.processador.uso.toFloat(),
                looca.grupoDeDiscos.tamanhoTotal.toFloat() / (1024 * 1024),
                looca.memoria.emUso.toFloat() / (1024 * 1024),
                looca.dispositivosUsbGrupo.totalDispositvosUsbConectados.toFloat()
            )

            val fkcomponentesMonitorados = listOf(1, 2, 3, 4)
            val fkcomponentesExistentes = listOf(1, 2, 3, 5)

            for (i in dados.indices) {
                val zonaFusoHorario = ZoneId.of("America/Sao_Paulo")
                val data = LocalDate.now()
                val hora = LocalTime.now(zonaFusoHorario)
                val dado = dados[i]
                val fkcompMoni = fkcomponentesMonitorados[i]
                val fkcompExis = fkcomponentesExistentes[i]
                repositorioMonitoramento.registrarDados(data, hora, dado, fkcompMoni, fkcompExis, idMaquinaDado, idEmpresaDado)
            }
            Thread.sleep(tempo * 1000L)
        }



    }

}