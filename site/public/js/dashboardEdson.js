// WORD CLOUD
var lista = []

function montarWordCloud(canvaId) {
    fetch(`/dashEdson/wordCloud`, {
            cache: 'no-store'
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro na requisição.');
            }
        }).then((resposta) => {
            for (registro in resposta) {
                var listaRegistro = {
                    text: resposta[registro].palavra,
                    size: resposta[registro].total
                }
                lista.push(listaRegistro)
            }
            plotarWordCloud(canvaId)
        })
        .catch((error) => {
            console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
        });
}

function plotarWordCloud(canvaId) {
    var cores = ['#81B7E7', '#4B3753']
    WordCloud(document.getElementById(canvaId), {
        list: lista.map(word => [word.text, word.size]), 
        gridSize: 12,
        fontWeight: 800,
        fontFamily: 'Arial',
        color: function(word, weight, fontSize, distance, theta) {
            // Aqui você pode fazer o mapeamento da quantidade para uma cor específica
            var corIndex = Math.min(Math.floor(weight / 10), cores.length - 1);
            return cores[corIndex];
        },
        backgroundColor: 'white',
        weightFactor: 3,
    }).start();
}
// WORD CLOUD

// KPIS

function mostrarKPIS(){
    fetch(`/dashEdson/kpiAtual`, {
        cache: 'no-store'
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erro na requisição.');
        }
    }).then((resposta) => {
        sessionStorage.setItem('KPImesAtual', resposta[0].mesAtual)
    })
    .catch((error) => {
        console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
    });

    fetch(`/dashEdson/kpiPassado`, {
        cache: 'no-store'
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erro na requisição.');
        }
    }).then((resposta) => {
        sessionStorage.setItem('KPImesPassado', resposta[0].mesPassado)
    })
    .catch((error) => {
        console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
    });
}