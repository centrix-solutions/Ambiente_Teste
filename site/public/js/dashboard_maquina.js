var idEmpresa = sessionStorage.getItem('Empresa')
var vetoridComponentes = []
var vetorValor = []

window.onload = function () {

    idMaquina = 1
    console.log(idEmpresa)
    buscarComponentes(idMaquina, idEmpresa)
    obterDadosGraficos();
    buscarDadosMonitoramento(idMaquina, idEmpresa)
}

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
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (var i = 0; i < resposta.length; i++) {

                    var registroId = resposta[i].idComponente
                    var registroValor = resposta[i].valor

                    vetoridComponentes.push(registroId);
                    vetorValor.push(registroValor);
                }
                console.log(vetoridComponentes);
                console.log(vetorValor);

                sessionStorage.vetoridComponentes = vetoridComponentes;
                sessionStorage.vetorValor = vetorValor;

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function obterDadosGraficos() {
    obterDadosGrafico(1, 'grafico_cpu');
    obterDadosGrafico(2, 'grafico_ram');
}

function obterDadosGrafico(idMaquina, chartId) {
    fetch(`/medidas/ultimas/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                plotarGrafico(resposta, chartId);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGrafico(resposta, chartId) {
    const labels = [];
    const dados = {
        labels: labels,
        datasets: [{
            label: 'Uso',
            data: [],
            fill: false,
            borderColor: ['#845ED7'],
            backgroundColor: ['#845ED7'],
            tension: 0.1
        }]
    };

    for (let i = 0; i < resposta.length; i++) {
        const registro = resposta[i];
        labels.push(registro.momento_grafico);
        dados.datasets[0].data.push(registro.cpu);
    }

    const config = {
        type: 'line',
        data: dados,
        options: {
            plugins: {
                legend: {
                    display: false,
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
                    max: 100,
                    ticks: {
                        callback: function (value) {
                            return value + '%';
                        },
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

    const myChart = new Chart(
        document.getElementById(chartId),
        config
    );

    setTimeout(() => atualizarGrafico(1, dados, myChart, chartId), 4000);
}

function atualizarGrafico(idMaquina, dados, myChart, chartId) {
    fetch(`/medidas/tempo-real/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.");
                } else {
                    dados.labels.shift();
                    dados.labels.push(novoRegistro[0].momento_grafico);
                    dados.datasets[0].data.shift();
                    dados.datasets[0].data.push(novoRegistro[0].cpu);
                    myChart.update();
                }
                proximaAtualizacao = setTimeout(() => {
                    atualizarGrafico(idMaquina, dados, myChart, chartId);
                }, 4000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacao = setTimeout(() => {
                atualizarGrafico(idMaquina, dados, myChart, chartId);
            }, 4000);
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function buscarDadosMonitoramento(idMaquina, idEmpresa) {

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

                    cpu.innerHTML = `${resposta[0].dado.toFixed(2)}%`
                    barra_cpu.value = resposta[0].dado.toFixed(2)
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
                    var ramTotal = vetorValor[2]
                    ramTotal = ramTotal / 1024;

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

    function buscarDisco(idMaquina, idEmpresa) {
        fetch("/medidas/buscarDisco", {
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

                    var discoAtual = resposta[0].dado
                    var discoTotal = vetorValor[1]
                    discoTotal = discoTotal / 1024;

                    console.log(discoAtual)
                    console.log(discoTotal)
                    porcentagemUsoDisco = Number((discoAtual / discoTotal) * 100).toFixed(2)

                    disco.innerHTML = `${porcentagemUsoDisco}%`
                    barra_disco.value = porcentagemUsoDisco


                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados: ${error.message}`);
            });
    }
    function buscarUsb(idMaquina, idEmpresa) {
        fetch("/medidas/buscarUsb", {
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

                    usb.innerHTML = `Quantidade: ${resposta[0].dado}`

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados: ${error.message}`);
            });
    }
    function buscarJanelas(idMaquina, idEmpresa) {
        fetch("/medidas/buscarJanelas", {
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

                    janelas.innerHTML = ` ${resposta[0].dado}`

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados: ${error.message}`);
            });
    }
    function buscarProcessos(idMaquina, idEmpresa) {
        fetch("/medidas/buscarProcessos", {
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

                    processos.innerHTML = ` ${resposta[0].dado}`

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados: ${error.message}`);
            });
    }

    function buscarLogin(idMaquina, idEmpresa) {
        fetch("/medidas/buscarLogin", {
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

                    console.log(resposta[0])
                    nome_funcionario.innerHTML = resposta[0].NomeFuncionario
                    numero_maquina.innerHTML = idMaquina
                    atividade.innerHTML = resposta[0].Atividade
                    inicio_turno.innerHTML = resposta[0].HoraInicioTurno

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados: ${error.message}`);
            });
    }

    buscarCpu(idMaquina, idEmpresa)
    buscarRam(idMaquina, idEmpresa)
    buscarDisco(idMaquina, idEmpresa)
    buscarUsb(idMaquina, idEmpresa)
    buscarLogin(idMaquina, idEmpresa)
    buscarJanelas(idMaquina, idEmpresa)
    buscarProcessos(idMaquina, idEmpresa)
}


setInterval(function () {
    buscarDadosMonitoramento(idMaquina, idEmpresa);
}, 2000); 