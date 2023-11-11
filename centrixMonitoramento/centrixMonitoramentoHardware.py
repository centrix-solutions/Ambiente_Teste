import psutil
import time
import mssql
from mysql.connector import connect

mysql_cnx = connect(user='root', password='38762', host='localhost', database='centrix')

sql_server_cnx = mssql.connect(server= '44.197.21.59', user='sa', password='centrix', database='centrix')

while(True):

    CPU = round(psutil.cpu_percent(), 2)

    RAM = round(psutil.virtual_memory().used / (1024**3), 3)
    
    DISK = round(psutil.disk_usage('/').used / (1024**3), 3)

    bdLocal_cursor = mysql_cnx.cursor()
    bdServer_cursor = sql_server_cnx.cursor()

    #BD Local 

    #CPU
    dados_CPU_PC = [CPU, 1, 1, 1]

    add_leitura_CPU = ("INSERT INTO Monitoramento"
                       "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                       "VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")

    bdLocal_cursor.execute(add_leitura_CPU, dados_CPU_PC)
    
    #RAM
    dados_RAM_PC = [RAM, 2, 3, 1]

    add_leitura_RAM = ("INSERT INTO Monitoramento"
                       "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                       "VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")
    

    bdLocal_cursor.execute(add_leitura_RAM, dados_RAM_PC)
    
    #DISK
    dados_DISK_PC = [DISK, 3, 2, 1]

    add_leitura_DISK = ("INSERT INTO Monitoramento"
                        "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                        "VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")
    
    bdLocal_cursor.execute(add_leitura_DISK, dados_DISK_PC)
    mysql_cnx.commit()
    
    #BD Server
    
    #CPU
    dados_CPU_PC = [CPU, 1, 1, 1]

    add_leitura_CPU = ("INSERT INTO Monitoramento"
                       "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                       "VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")

    bdServer_cursor.execute(add_leitura_CPU, dados_CPU_PC)
    
    #RAM
    dados_RAM_PC = [RAM, 2, 3, 1]

    add_leitura_RAM = ("INSERT INTO Monitoramento"
                       "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                       "VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")
    

    bdServer_cursor.execute(add_leitura_RAM, dados_RAM_PC)
    
    #DISK
    dados_DISK_PC = [DISK, 3, 2, 1]

    add_leitura_DISK = ("INSERT INTO Monitoramento"
                        "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                        "VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")
    
    bdServer_cursor.execute(add_leitura_DISK, dados_DISK_PC)
    bdServer_cursor.commit()

    time.sleep(10)