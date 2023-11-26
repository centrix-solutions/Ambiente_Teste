let ctx2 = 0;
let dadosDataStacked = [];
let dadosPerigoStacked = [];
let dadosAtencaoStacked = [];

// AQUI VOU RECUPERAR PARA O GRÁFICO BARRA-EMPILHADA
function obterDadosGraficoStacked(canvaId) {
    if (ctx2 !== 0) {
        ctx2.destroy();
    }
    
    const labels2 = [
        ` 01/11 - 07/11`,
        ' 08/11 - 14/11',
        ' 15/11 - 21/11',
        ' 22/11 - 30/11'
    ]

    const data2 = {
        labels: labels2,
        datasets: [{
                label: 'Perigo',
                data: dadosPerigoStacked,
                backgroundColor: [
                    'rgb(96, 64, 155)'
                ],
                borderWidth: 1,
                borderRadius: 10,
                order: 2
            },
            {
                label: 'Atenção',
                data: dadosAtencaoStacked,
                backgroundColor: [
                    'rgb(159, 131, 221)'
                ],
                borderWidth: 1,
                yAxisID: 'atencao',
                borderRadius: 10,
                order: 1,
                barPercentage: 0.8
            }
        ]
    };

    // config2
    const config2 = {
        type: 'bar',
        data: data2,
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    beginAtZero: true,
                    stacked: true,
                },
                atencao: {
                    beginAtZero: true,
                    position: 'right',
                    type: 'linear',
                    grid: {
                        display: false
                    }
                }
            }
        }
    };
    ctx2 = new Chart(
        document.getElementById(`${canvaId}`),
        config2
    );
  
    atualizarGraficoStacked();

    // BANCO RECUPERAÇÃO
    function atualizarGraficoStacked() {
        fetch(`/rede/alertaMes`, {
                cache: 'no-store'
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Nenhum dado encontrado ou erro na API');
                }
            })
            .then(novoRegistro => {
                if (dadosPerigoStacked.AlertasPerigo !== novoRegistro.AlertasPerigo) {
                    dadosPerigoStacked.AlertasPerigo = novoRegistro.AlertasPerigo;
                    ctx2.data.datasets[0].data[0] = novoRegistro.AlertasPerigo;
                } else if (dadosAtencaoStacked.AlertasAtencao !== novoRegistro.AlertasAtencao) {
                    dadosAtencaoStacked.AlertasAtencao = novoRegistro.AlertasAtencao;
                    ctx2.data.datasets[0].data[0] = novoRegistro.AlertasAtencao;
                }
                setTimeout(atualizarGraficoStacked, 4000);
            })
            .catch(error => {
                console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
                setTimeout(atualizarGraficoStacked, 4000);
            });

        fetch(`/rede/alertaMes`, {
                cache: 'no-store'
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erro na requisição.');
                }
            })
            .then((resposta) => {
                var i = 0
                for (const registro of resposta) {
                    if (dadosPerigoStacked.length < 4 && registro.AlertasPerigo !=  dadosPerigoStacked[i] ) {
                        dadosPerigoStacked.push(registro.AlertasPerigo);
                        ctx2.update();
                    }
                    if (dadosAtencaoStacked.length < 4 && registro.AlertasAtencao !=  dadosAtencaoStacked[i] ) {
                        dadosAtencaoStacked.push(registro.AlertasAtencao);
                        ctx2.update();
                    }
                    i++
                }
            })
            .catch((error) => {
                console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
            });
    }
}

var dados = [];
let ctx = 0;

// AQUI VOU RECUPERAR PARA O GRÁFICO MEIA-LUA
function obterDadosGraficoMeiaLua(fkAndarDeTrabalho, canvaId) {
    if (dados.length > 0) {
        dados = []
    }

    if (fkAndarDeTrabalho > 0) {
        const data = {
            labels: ['Perigo', 'Atenção', 'Normal'],
            datasets: [{
                label: 'Últimos alertas do andar ',
                data: dados,
                backgroundColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 167, 34, 1)',
                    'rgba(39, 36, 62, 1)'
                ],
                cutout: '80%',
                circumference: 180,
                rotation: 270
            }]
        };

        // config
        const config = {
            type: 'doughnut',
            data,
            options: {
                aspectRatio: 2,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        };

        if (ctx !== 0) {
            ctx.destroy();
        }

        ctx = new Chart(
            document.getElementById(`${canvaId}`),
            config
        );

    }
}
