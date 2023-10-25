import java.io.File

object ScriptPadraoPython {

    var pythonProcess: Process? = null

    fun criarScript(tempo: Int, idMaquinaDado: Int, idEmpresaDado: Int): String {

        val codigoPythonDefault = """
        import psutil
        import time
        from mysql.connector import connect

        cnx = connect(user='aluno', password='sptech', host='localhost', database='centrix')

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
        Thread.sleep(2 * 1000L)

        return nomeArquivoPyDefault
    }

    fun executarScript(arquivo: String) {
        pythonProcess = Runtime.getRuntime().exec("python $arquivo")
    }

    fun pararScript() {
        pythonProcess?.destroy()
    }
    /*fun criarScript(tempo: Int, idMaquinaDado: Int, idEmpresaDado: Int) {

        val codigoBash = """

            if ! command -v python3 &> /dev/null; then
                echo "Python não encontrado. Instalando Python..."
                sudo apt-get update
                sudo apt-get install python3
            fi

            python3 -m ensurepip --default-pip
            python3 -m pip install --upgrade pip

            python3 -m pip install psutil mysql-connector-python

            cat <<EOL > centrixMonitoramento.py
            import psutil
            import time
            from mysql.connector import connect

            cnx = connect(user='aluno', password='sptech', host='localhost', database='centrix')

            while True:
                CPU = round(psutil.cpu_percent(), 2)
                RAM = round(psutil.virtual_memory().used / (1024**3), 3)
                DISK = round(psutil.disk_usage('/').used / (1024**3), 3)

                bd = cnx.cursor()

                # CPU
                dados_CPU_PC = [CPU, 1, 1, $idMaquinaDado, $idEmpresaDado]
                add_leitura_CPU = ("INSERT INTO Monitoramento (Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni) VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")
                bd.execute(add_leitura_CPU, dados_CPU_PC)

                # DISK
                dados_DISK_PC = [DISK, 3, 2, $idMaquinaDado, $idEmpresaDado]
                add_leitura_DISK = ("INSERT INTO Monitoramento (Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni) VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")
                bd.execute(add_leitura_DISK, dados_DISK_PC)

                # RAM
                dados_RAM_PC = [RAM, 2, 3, $idMaquinaDado, $idEmpresaDado]
                add_leitura_RAM = ("INSERT INTO Monitoramento (Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni) VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")
                bd.execute(add_leitura_RAM, dados_RAM_PC)

                cnx.commit()
                time.sleep($tempo)
            EOL

            python3 centrixMonitoramento.py
        """.trimIndent()


        val arquivoInstallScript = "centrixInstall.sh"

        File(arquivoInstallScript).writeText(codigoBash)

        Runtime.getRuntime().exec("chmod +x $arquivoInstallScript")

        Runtime.getRuntime().exec("./$arquivoInstallScript")
    }*/
}