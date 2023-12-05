function toggleInfo(id) {
    var conteudoInfo = document.getElementById(id);
    if (conteudoInfo.style.display === 'none') {
        conteudoInfo.style.display = 'block';
        document.getElementById('seta').innerHTML = '&#9650;';  // Seta para cima
    } else {
        conteudoInfo.style.display = 'none';
        document.getElementById('seta').innerHTML = '&#9660;';  // Seta para baixo
    }
}
async function listarProcessos(pesquisa) {
    var idEmpresa = sessionStorage.Empresa;
    var idAndar = (andares.value).split('-')[1];
    var filtro = chkFiltro.checked;
    if (idAndar == 0 || idAndar == undefined) idAndar = null;
    try {
        var resposta = await fetch("/processos/listarProcessos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idEmpresaServer: idEmpresa,
                idAndarServer: idAndar,
                filtroServer: filtro,
                pesquisaServer: pesquisa
            })
        });
        if (resposta.ok) {
            var respostaJson = await resposta.json();
            console.log('JSON PROCESSOS: ', respostaJson);
            var listaComputadores = document.getElementById('listaComputadores');
            listaComputadores.innerHTML = "";
            var arrayIdComputador = [];
            var arrayDadoCabecalho = [];

            var tituloProcessosDiferentes = [];
            var dadosProcessosDiferentes = [];

            for (let i = 0; i < respostaJson.length; i++) {
                if (arrayIdComputador.indexOf(respostaJson[i].idMaquina) == -1) {
                    arrayIdComputador.push(respostaJson[i].idMaquina);
                    var vetor = [];
                    vetor.push(respostaJson[i].Id_do_dispositivo);
                    vetor.push(respostaJson[i].email);
                    arrayDadoCabecalho.push(vetor);
                }                    
            }
            arrayIdComputador.forEach(i => {
                var divComputador = document.createElement('div');
                divComputador.className = 'computador';
                
                var divCabecalho = document.createElement('div');
                var spanComputador = document.createElement('span');
                var spanPessoa = document.createElement('span');
                var spanSeta = document.createElement('span');
                divCabecalho.className = 'cabecalho';
                divCabecalho.id = `computador-${i}`;
                divCabecalho.addEventListener('click', function () {
                    var idMaquina = (this.id).split('-')[1];
                    toggleInfo(`conteudoInfoProcessos-${idMaquina}`);
                });
                var posicao = arrayIdComputador.indexOf(i);
                spanComputador.innerHTML = arrayDadoCabecalho[posicao][0];
                spanPessoa.innerHTML = arrayDadoCabecalho[posicao][1];
                spanSeta.innerHTML = "&#9660;";
                
                var divConteudo = document.createElement('div');
                var divDeletar = document.createElement('div');
                var buttonDeletar = document.createElement('button');
                
                divConteudo.className = "conteudo";
                divConteudo.id = `conteudoInfoProcessos-${i}`;
                
                respostaJson.forEach(a => {
                    if (a.fkMaqProc == i) {
                        var divCheckBox = document.createElement('div');
                        var checkBoxProcesso = document.createElement('input');
                        var labelProcesso = document.createElement('label');
                        
                        labelProcesso.innerHTML = a.titulo;
                        checkBoxProcesso.type = "checkbox";
                        checkBoxProcesso.name = "checkComputador";
                        labelProcesso.for = "checkComputador";
                        
                        divCheckBox.appendChild(checkBoxProcesso);
                        divCheckBox.appendChild(labelProcesso);
                        divConteudo.appendChild(divCheckBox);

                        if (tituloProcessosDiferentes.indexOf(a.titulo) == -1) {
                            tituloProcessosDiferentes.push(a.titulo);
                            var array = [arrayDadoCabecalho[posicao][0], arrayDadoCabecalho[posicao][1]];
                            dadosProcessosDiferentes.push(array);
                        }
                    }
                });
                divDeletar.className = "div-btn-deletar";
                buttonDeletar.className = "btn-deletar";
                buttonDeletar.innerHTML = "Deletar Processos";
                
                divCabecalho.appendChild(spanComputador);
                divCabecalho.appendChild(spanPessoa);
                divCabecalho.appendChild(spanSeta);
                
                divDeletar.appendChild(buttonDeletar);
                divConteudo.appendChild(divDeletar);
                
                divComputador.appendChild(divCabecalho);
                divComputador.appendChild(divConteudo);

                listaComputadores.appendChild(divComputador);
            });
            processosDiferentes(tituloProcessosDiferentes, dadosProcessosDiferentes);
        }
    } catch (erro) {
        console.log("Erro Processos: ", erro);
    }
}
function processosDiferentes(titulos, dados) {
    var listaProcessosDiferentes = document.getElementById('listaProcessosDiferentes');
    for (let i = 0; i < titulos.length; i++) {
        var divComputador = document.createElement('div');
        divComputador.className = "computador preto";

        var divCabecalho = document.createElement('div');
        
        divCabecalho.className = 'cabecalho';
        divCabecalho.id = `processoDiferente-${i}`;
        divCabecalho.addEventListener('click', function () {
            var idTitulo = (this.id).split('-')[1];
            toggleInfo(`conteudoInfoProcessosDiferentes-${idTitulo}`);
        });

        var spanTitulo = document.createElement('span');
        var spanSeta = document.createElement('span');
        spanTitulo.innerHTML = titulos[i];
        spanSeta.innerHTML = "&#9660;";

        divCabecalho.appendChild(spanTitulo);
        divCabecalho.appendChild(spanSeta);

        var divConteudo = document.createElement('div');
        divConteudo.className = "conteudo";
        divConteudo.id = `conteudoInfoProcessosDiferentes-${i}`;

        var divInfo = document.createElement('div');
        var spanComputador = document.createElement('span');
        var spanPessoa = document.createElement('span');
        spanComputador.innerHTML = dados[i][0];
        spanPessoa.innerHTML = dados[i][1];

        divInfo.appendChild(spanComputador);
        divInfo.appendChild(spanPessoa);

        var divCopia = document.createElement('div');
        var divBalao = document.createElement('div');
        divBalao.classList.add('balao');
        divBalao.classList.add('hidden');
        divBalao.innerHTML = `id copiado: ${dados[i][0]}`;
        divBalao.id = `${dados[i][0]}-${i}`;
        var spanCopia = document.createElement('span');
        spanCopia.innerHTML = "Copiar id do computador";
        var iIcone = document.createElement('i');
        iIcone.className = "material-icons cursor";
        iIcone.innerHTML = "content_copy";
        iIcone.name = `${dados[i][0]}-${i}`;
        iIcone.addEventListener('click', function () {
            var Id_do_dispositivo = (this.name).split('-')[0];
            navigator.clipboard.writeText(Id_do_dispositivo);
            
            var idBalao = (this.name).split('-')[1];
            var balao = document.getElementById(`${Id_do_dispositivo}-${idBalao}`);
            console.log(balao)
            balao.classList.remove('hidden');
            balao.style.opacity = 1;
            setTimeout(function() {
                balao.style.opacity = 0;
                balao.classList.add('hidden');
            }, 3000);
        });

        divCopia.appendChild(spanCopia);
        divCopia.appendChild(iIcone);
        
        divConteudo.appendChild(divBalao);
        divConteudo.appendChild(divInfo);
        divConteudo.appendChild(divCopia);

        divComputador.appendChild(divCabecalho);
        divComputador.appendChild(divConteudo);

        listaProcessosDiferentes.appendChild(divComputador);
    }
}

setTimeout(() => {
    listarProcessos();
    var andares = document.getElementById('andares');
    andares.addEventListener("change", function () {
        listarProcessos();
    });
    var filtro = document.getElementById('chkFiltro');
    filtro.addEventListener("change", function () {
        listarProcessos();
    });
    var input = document.getElementById('inputPesquisa');
    input.addEventListener("input", function () {
        var input = document.getElementById('inputPesquisa');
        var pesquisa = input.value;
        listarProcessos(pesquisa);
    });
}, 1000);