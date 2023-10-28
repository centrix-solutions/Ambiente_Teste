var idEmpresa = sessionStorage.getItem('Empresa')
    window.onload = resetarToken;

    //criar logica pra so o admim poder cadastrar se nao da um alerta
    // pega do session storage o nivel de acesso de quem ta logado

    function gerarToken() {
        const caracteres = '0123456789';
        let token = '';
        for (let i = 0; i < 8; i++) {
            const aleatorizar = Math.floor(Math.random() * caracteres.length);
            token += caracteres.charAt(aleatorizar);
        }
        return token;
    }

    function resetarToken() {

        var tokenVar = gerarToken();

        document.getElementById('divToken').innerText = 'Token: ' + tokenVar;
    }

    

    function cadastrarFuncionario() {

        var nomeVar = nome_imput.value
        var emailVar = email_input.value
        var senhaVar = tokenVar
        var idEmpresaVar = idEmpresa
        var nivelAcessoVar = acesso_input.value

        return fetch("/funcionarios/cadastrarFuncionario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: nomeVar,
                emailServer: emailVar,
                senhaServer: senhaVar,
                fkEmpresaServer: idEmpresaVar,
                nivelAcessoServer: nivelAcessoVar
            })
        });
    }