function toggleInfo() {
    var conteudoInfo = document.getElementById('conteudoInfo');

    if (conteudoInfo.style.display === 'none') {
        conteudoInfo.style.display = 'block';
        document.getElementById('seta').innerHTML = '&#9650;';  // Seta para cima
    } else {
        conteudoInfo.style.display = 'none';
        document.getElementById('seta').innerHTML = '&#9660;';  // Seta para baixo
    }
}
async function listarProcessos() {
    var idEmpresa = sessionStorage.Empresa;
    var idAndar = null;
    chkFiltro.checked = false;
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
                filtroServer: filtro
            })
        });
        if (resposta.ok) {
            var respostaJson = await resposta.json();
            console.log('JSON PROCESSOS: ', respostaJson);
        }
    } catch (erro) {
        console.log("Erro Processos: ", erro);
    }
}

setInterval(() => {
    listarProcessos();
}, 5000);