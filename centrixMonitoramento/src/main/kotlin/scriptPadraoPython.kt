import java.io.File

object scriptPadraoPython {

    fun criarScript(tempo: Int, idMaquinaDado: Int, idEmpresaDado: Int){

        val codigoPythonDefault = """
        import psutil
        import time
        from mysql.connector import connect

        cnx = connect(user='root', password='38762', host='localhost', database='centrix')

        while(True):

            CPU = round(psutil.cpu_percent(), 2)

            RAM = round(psutil.virtual_memory().used / (1024**3), 3)
            
            DISK = round(psutil.disk_usage('/').used / (1024**3), 3)

            bd = cnx.cursor()

            #CPU
            dados_CPU_PC = [CPU, 1, 1, $idMaquinaDado, $idEmpresaDado]

            add_leitura_CPU = ("INSERT INTO Monitoramento"
                               "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                               "VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")

            bd.execute(add_leitura_CPU, dados_CPU_PC)
            
            #DISK
            dados_DISK_PC = [DISK, 3, 2, $idMaquinaDado, $idEmpresaDado]

            add_leitura_DISK = ("INSERT INTO Monitoramento"
                                "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                                "VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")
            
            bd.execute(add_leitura_DISK, dados_DISK_PC)
            
            #RAM
            dados_RAM_PC = [RAM, 2, 3, $idMaquinaDado, $idEmpresaDado]

            add_leitura_RAM = ("INSERT INTO Monitoramento"
                               "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                               "VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")

            bd.execute(add_leitura_RAM, dados_RAM_PC)


            cnx.commit()

            time.sleep($tempo)
    """.trimIndent()

        val nomeArquivoPyDefault = "centrixMonitoramento.py"

        File(nomeArquivoPyDefault).writeText(codigoPythonDefault)
        Thread.sleep(9 * 1000L)
        Runtime.getRuntime().exec("python $nomeArquivoPyDefault")
    }
}