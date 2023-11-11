import speedtest as st
import time
from mysql.connector import connect
from slack_sdk import WebClient

cnx = connect(user='root', password='38762', host='localhost', database='centrix')
speed_test = st.Speedtest()

slack_token = "xoxb-5806834878417-6181633164562-0EX9fmOdmK2bMxTgymgx1Soq"
slack_client = WebClient(token=slack_token)
slack_channel = "#notificação"

limite_download = 5  # Métrica download em Mbps
limite_upload = 2    # Métrica upload em Mbps

while(True):
    download = speed_test.download()
    download_mbs = round(download / (10**6), 2)

    if download_mbs < limite_download:
        mensagem = f"Atenção: Velocidade de download abaixo do limite ({limite_download} Mbps): {download_mbs} Mbps"
        # Envia a notificação para o Slack
        slack_client.chat_postMessage(channel=slack_channel, text=mensagem)

    
    upload = speed_test.upload()
    upload_mbs = round(upload / (10**6), 2)

    if upload_mbs < limite_upload:
        mensagem_upload = f"Atenção: Velocidade de upload abaixo do limite ({limite_upload} Mbps): {upload_mbs} Mbps"
        slack_client.chat_postMessage(channel=slack_channel, text=mensagem_upload)

    bd = cnx.cursor()
        
    #DOWNLOAD
    dados_DOWNLOAD_PC = [download_mbs, 4, 5, 1, 1]

    add_leitura_DOWNLOAD = ("INSERT INTO Monitoramento"
                       "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                       "VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")
    

    bd.execute(add_leitura_DOWNLOAD, dados_DOWNLOAD_PC)
    
    #UPLOAD
    dados_UPLOAD_PC = [upload_mbs, 5, 6, 1, 1]

    add_leitura_UPLOAD = ("INSERT INTO Monitoramento"
                       "(Data_captura, Hora_captura, Dado_Capturado, fkCompMonitorados, fkCompMoniExistentes, fkMaqCompMoni, fkEmpMaqCompMoni)"
                       "VALUES (CURRENT_DATE, CURRENT_TIME, %s, %s, %s, %s, %s)")
    

    bd.execute(add_leitura_UPLOAD, dados_UPLOAD_PC)
    cnx.commit()

    time.sleep(20)