import speedtest as st
import time
from mysql.connector import connect
import pymssql

cnx = connect(user='aluno', password='sptech', host='localhost', database='centrix')
speed_test = st.Speedtest()

sql_server_cnx = pymssql.connect(server='44.197.21.59', database='centrix', user='sa', password='centrix');

while(True):
    download = speed_test.download()
    download_mbs = round(download / (10**6), 2)
    
    upload = speed_test.upload()
    upload_mbs = round(upload / (10**6), 2)
    
    bd = cnx.cursor()
    bdServer_cursor = sql_server_cnx.cursor()
    
    #DOWNLOAD
    dados_DOWNLOAD_PC = [download_mbs, 4, 5, 1, 1]

    add_leitura_DOWNLOAD = ("INSERT INTO Monitoramento"
                       "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                       "VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")
    

    bd.execute(add_leitura_DOWNLOAD, dados_DOWNLOAD_PC)
    bdServer_cursor.execute(add_leitura_DOWNLOAD, dados_DOWNLOAD_PC)
    
    #UPLOAD
    dados_UPLOAD_PC = [upload_mbs, 5, 6, 1, 1]

    add_leitura_UPLOAD = ("INSERT INTO Monitoramento"
                       "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                       "VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")
    

    bd.execute(add_leitura_UPLOAD, dados_UPLOAD_PC)
    bdServer_cursor.execute(add_leitura_UPLOAD, dados_UPLOAD_PC)
    
    cnx.commit()
    bdServer_cursor.commit()
bdServer_cursor.close()

    time.sleep(20)