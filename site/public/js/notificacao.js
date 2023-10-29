async function enviarAlerta() {
    var idFuncionario = 1;
    var nomeFuncionario = sessionStorage.nomeFuncionario;
    try {
        var resposta = await fetch("/notificacao/enviarAlerta", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idFuncionarioServer: idFuncionario,
                nomeFuncionarioServer: nomeFuncionario
            })
        });
        if (resposta.ok) {
            var respostaJson = await resposta.json();
            console.log('JSON: ', respostaJson);
            alert('Alerta enviado!');
        }
    } catch (erro) {
        console.log("Erro: ", erro);
    }
}
async function verificarAlerta(){
    var idFuncionario = 1;
    try {
        var resposta = await fetch("/notificacao/verificarAlerta", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idFuncionarioServer: idFuncionario,
            })
        });
        if (resposta.ok) {
            var respostaJson = await resposta.json();
            console.log('JSON: ', respostaJson);
        }
    } catch (erro) {
        console.log("Erro: ", erro);
    }
}