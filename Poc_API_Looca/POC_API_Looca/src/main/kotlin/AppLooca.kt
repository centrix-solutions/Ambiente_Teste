import com.github.britooo.looca.api.core.Looca


fun main(){
    val looca = Looca()

    val sistema: com.github.britooo.looca.api.group.sistema.Sistema = looca.sistema

    println(sistema)

    //Criação do gerenciador
    val grupoDeDiscos = looca.grupoDeDiscos

    //Obtendo lista de discos a partir do getter
    val discos = grupoDeDiscos.discos

    for (disco in discos) {
        println(disco)
    }
}