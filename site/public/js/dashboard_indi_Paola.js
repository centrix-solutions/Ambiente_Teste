var idEmpresa = Number(sessionStorage.getItem('Empresa'));
var idMaquina = Number(sessionStorage.getItem('idComputador'));

window.onload = buscarComponentes(idMaquina, idEmpresa)
window.onload = obterDadosGraficos()
window.onload = obterDadosGraficoCpu(idMaquina, chartId)
window.onload = obterDadosGraficoRam(idMaquina,chartId)
window.onload = buscarCpu(idMaquina,idEmpresa)
window.onload = buscarRam(idMaquina,idEmpresa)

function buscarComponentes(idMaquina, idEmpresa) {
    fetch("/medidas/buscarComponentes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idMaquinaServer: idMaquina,
            idEmpresaServer: idEmpresa
        })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro na requisição.');
            }
        })
        .then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            for (var i = 0; i < resposta.length; i++) {
                var registroId = resposta[i].idComponente;
                var registroValor = resposta[i].valor;
                vetoridComponentes.push(registroId);
                vetorValor.push(registroValor);
            }
            console.log(vetoridComponentes);
            console.log(vetorValor);
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function obterDadosGraficos() {
    obterDadosGrafico(idMaquina, 'graficoCpu');
    obterDadosGraficoRAM(idMaquina, 'graficoRam');
}

function obterDadosGraficoCpu(idMaquina, chartId) {

    const labels = [];
    const data = [];

    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Uso',
                data: data,
                fill: false,
                borderColor: '#845ED7',
                backgroundColor: '#845ED7',
                tension: 0.1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'white',
                        lineWidth: 0.1,
                        borderDash: [1, 1]
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'white',
                        lineWidth: 0.1,
                        borderDash: [1, 1]
                    },
                    ticks: {
                        callback: (value) => value + '%',
                        color: 'white'
                    }
                }
            },
            layout: {
                padding: {
                    left: 0
                }
            }
        }
    };

    const myChart = new Chart(document.getElementById(chartId), config);

    function atualizarGrafico() {
        fetch(`/medidas/tempo-real/${idMaquina}`, { cache: 'no-store' })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Nenhum dado encontrado ou erro na API');
                }
            })
            .then((novoRegistro) => {
                const momento = novoRegistro[0].momento_grafico;
                if (momento !== labels[labels.length - 1]) {
                    labels.shift();
                    labels.push(momento);
                    data.shift();
                    data.push(novoRegistro[0].cpu);
                    myChart.update();
                }
                setTimeout(atualizarGrafico, 4000);
            })
            .catch((error) => {
                console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
                setTimeout(atualizarGrafico, 4000);
            });
    }

    fetch(`/medidas/ultimas/${idMaquina}`, { cache: 'no-store' })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro na requisição.');
            }
        })
        .then((resposta) => {
            resposta.reverse();
            for (const registro of resposta) {
                labels.push(registro.momento_grafico);
                data.push(registro.cpu);
            }
            myChart.update();
            setTimeout(atualizarGrafico, 4000);
        })
        .catch((error) => {
            console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
        });

}

function obterDadosGraficoRam(idMaquina, chartId) {

    const labels = [];
    const data = [];

    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Uso',
                data: data,
                fill: false,
                borderColor: '#845ED7',
                backgroundColor: '#845ED7',
                tension: 0.1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'white',
                        lineWidth: 0.1,
                        borderDash: [1, 1]
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'white',
                        lineWidth: 0.1,
                        borderDash: [1, 1]
                    },
                    ticks: {
                        callback: (value) => value + '%',
                        color: 'white'
                    }
                }
            },
            layout: {
                padding: {
                    left: 0
                }
            }
        }
    };

    const myChart = new Chart(document.getElementById(chartId), config);

    function atualizarGraficoRAM() {
        fetch(`/medidas/tempo-real-ram/${idMaquina}`, { cache: 'no-store' })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Nenhum dado encontrado ou erro na API');
                }
            })
            .then((novoRegistro) => {

                const totalRAMGB = vetorValor[2]
                console.log(totalRAMGB)
                const usoRAMGB = novoRegistro[0].ram;

                const usoRAMPercent = (usoRAMGB / totalRAMGB) * 100;

                const momento = novoRegistro[0].momento_grafico;
                if (momento !== labels[labels.length - 1]) {
                    labels.shift();
                    labels.push(momento);
                    data.shift();
                    data.push(usoRAMPercent); 
                    myChart.update();
                }
                setTimeout(atualizarGraficoRAM, 4000);
            })
            .catch((error) => {
                console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
                setTimeout(atualizarGraficoRAM, 4000);
            });
    }

    fetch(`/medidas/ultimas-ram/${idMaquina}`, { cache: 'no-store' })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro na requisição.');
            }
        })
        .then((resposta) => {
            resposta.reverse();
            for (const registro of resposta) {
                labels.push(registro.momento_grafico);
                data.push(registro.ram);
            }
            myChart.update();
            setTimeout(atualizarGraficoRAM, 4000);
        })
        .catch((error) => {
            console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
        });

}

function buscarCpu(idMaquina, idEmpresa) {
    fetch("/medidas/buscarCpu", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idMaquinaServer: idMaquina,
            idEmpresaServer: idEmpresa
        })
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                cpu.innerHTML = `${resposta[0].dado}%`
                barra_cpu.value = Number(resposta[0].dado).toFixed(2)
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function buscarRam(idMaquina, idEmpresa) {
    fetch("/medidas/buscarRam", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idMaquinaServer: idMaquina,
            idEmpresaServer: idEmpresa
        })
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                var ramAtual = resposta[0].dado
                console.log(ramAtual)
                var ramTotal = vetorValor[2]
                console.log(ramTotal)

                porcentagemUsoRam = Number((ramAtual / ramTotal) * 100).toFixed(2)

                ram.innerHTML = `${porcentagemUsoRam}%`
                barra_ram.value = porcentagemUsoRam

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}
