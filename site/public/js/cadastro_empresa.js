function formatarCNPJ(cnpj_input) {
    // Busca tudo oq não for número com a expressão /\D/g e remove com ''
    var cnpj = cnpj_input.value.replace(/\D/g, '');

    if (cnpj.length >= 2) {
        cnpj = cnpj.substring(0, 2) + '.' + cnpj.substring(2)
    }
    if (cnpj.length >= 6) {
        cnpj = cnpj.substring(0, 6) + '.' + cnpj.substring(6)
    }
    if (cnpj.length >= 10) {
        cnpj = cnpj.substring(0, 10) + '/' + cnpj.substring(10)
    }
    if (cnpj.length >= 15) {
        cnpj = cnpj.substring(0, 15) + '-' + cnpj.substring(15)
    }


    cnpj_input.value = cnpj
}

function continuarEndereco() {

    document.getElementById('cadastroEmpresa').style.display = 'none'
    document.getElementById('cadastroEndereco').style.display = ''
    document.getElementById('imagemEsquerda').style.display = ''

}
function voltarEmpresa() {

    document.getElementById('cadastroEmpresa').style.display = ''
    document.getElementById('cadastroEndereco').style.display = 'none'
    document.getElementById('imagemEsquerda').style.display = ''

}

function formatarCEP(cep_input) {
    var cep = cep_input.value.replace(/\D/g, '')

    if (cep.length >= 5) {
        cep = cep.substring(0, 5) + '-' + cep.substring(5)
    }

    cep_input.value = cep;
}
function ApiCEP() {
    var cep = cep_input.value;
    var url = `https://viacep.com.br/ws/${cep}/json/`
    if (cep.length >= 8) {
        fetch(url)
            .then(
                function (resposta) {
                    console.log("Funcionou");
                    console.log("Resposta:", resposta);
                    resposta.json()
                        .then(
                            function (respostaJson) {
                                console.log("JSON: ", respostaJson);
                                rua_input.value = respostaJson.logradouro;
                                estado_input.value = respostaJson.uf;
                                bairro_input.value = respostaJson.bairro;
                                cidade_input.value = respostaJson.localidade;
                            }
                        )
                }
            )
            .catch(
                function (erro) {
                    console.log("ERRO!")
                    console.log(erro)
                }
            )
    }
}

function continuarFuncionario() {

    document.getElementById('cadastroEmpresa').style.display = 'none'
    document.getElementById('cadastroEndereco').style.display = 'none'
    document.getElementById('cadastroFuncionario').style.display = ''
    document.getElementById('imagemEsquerda').style.display = ''

}
function voltarEndereco() {

    document.getElementById('cadastroEmpresa').style.display = 'none'
    document.getElementById('cadastroEndereco').style.display = ''
    document.getElementById('cadastroFuncionario').style.display = 'none'
    document.getElementById('imagemEsquerda').style.display = ''

}



function continuarResumo() {


    document.getElementById('cadastroEmpresa').style.display = 'none'
    document.getElementById('cadastroEndereco').style.display = 'none'
    document.getElementById('cadastroFuncionario').style.display = 'none'
    document.getElementById('resumo').style.display = ''
    document.getElementById('imagemEsquerda').style.display = 'none'

    nomeFantasia_valor.innerHTML = nome_fantasia_input.value
    razaoSocial_valor.innerHTML = razao_social_input.value
    apelidoInterno_valor.innerHTML = apelido_interno_input.value
    CNPJ_valor.innerHTML = cnpj_input.value
    inicio_valor.innerHTML = horario_inicio_input.value
    fim_valor.innerHTML = horario_fim_input.value
    periodo_valor.innerHTML = periodo_input.value

    if (tipo_empresa_input.value == 1) {
        tipoEmpresa_valor.innerHTML = "Sede"
    }
    if (tipo_empresa_input.value == 2) {
        tipoEmpresa_valor.innerHTML = "Filial"
    }

    CEP_valor.innerHTML = cep_input.value
    estado_valor.innerHTML = estado_input.value
    cidade_valor.innerHTML = cidade_input.value
    bairro_valor.innerHTML = bairro_input.value
    rua_valor.innerHTML = rua_input.value
    numero_valor.innerHTML = numero_input.value

    nomeResponsavel_valor.innerHTML = funcionario_nome_imput.value
    emailResponsavel_valor.innerHTML = funcionario_email_input.value


}

function voltarFuncionario() {

    document.getElementById('cadastroEmpresa').style.display = 'none'
    document.getElementById('cadastroEndereco').style.display = 'none'
    document.getElementById('cadastroFuncionario').style.display = ''
    document.getElementById('resumo').style.display = 'none'
    document.getElementById('imagemEsquerda').style.display = ''

}

function cadastrar() {

    cadastrarEmpresa()
                .then(() => buscarFk(cnpjVar))
                .then((fkEmpresaVar) => {
                    return cadastrarEndereco(fkEmpresaVar[0].fkEmpresa);
                })
                .then(() => buscarFk(cnpjVar))
                .then((fkEmpresaVar) => {
                    return cadastrarFuncionario(fkEmpresaVar[0].fkEmpresa);
                })
                .then(() => {
                    window.location = 'login.html';
                })
                .catch((error) => {
                    console.error(error);
                });

    
}

function cadastrarEmpresa() {
    var nomeFantasiaVar = nome_fantasia_input.value
    var razaoSocialVar = razao_social_input.value
    var apelidoInternoVar = apelido_interno_input.value
    var cnpjVar = cnpj_input.value
    var responsavelLegalVar = funcionario_nome_imput.value
    var sedeVar = tipo_empresa_input.value

    return fetch("/empresa/cadastrarEmpresa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeFantasiaServer: nomeFantasiaVar,
            razaoSocialServer: razaoSocialVar,
            apelidoInternoServer: apelidoInternoVar,
            cnpjServer: cnpjVar,
            responsavelLegalServer: responsavelLegalVar,
            sedeServer: sedeVar,
        })
    });
}

function buscarFk(cnpjVar) {
    return fetch("/empresa/buscarFk", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cnpjServer: cnpjVar,
        }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Nenhum dado encontrado ou erro na API');
            }
        })
        .then(function (fkEmpresaVar) {
            return fkEmpresaVar;
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function cadastrarEndereco(fkEmpresaVar) {

    var ruaVar = rua_input.value;
    var bairroVar = bairro_input.value;
    var cidadeVar = cidade_input.value;
    var estadoVar = estado_input.value;
    var numeroVar = numero_input.value;
    var CEPVar = cep_input.value;
    
    return fetch("/empresa/cadastrarEndereco", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ruaServer: ruaVar,
            bairroServer: bairroVar,
            cidadeServer: cidadeVar,
            estadoServer: estadoVar,
            numeroServer: numeroVar,
            CEPServer: CEPVar,
            fkEmpresaServer: fkEmpresaVar,
        })
    });
}