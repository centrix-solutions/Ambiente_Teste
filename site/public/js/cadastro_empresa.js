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

function continuar1() {

    document.getElementById('parte1').style.display = 'none'
    document.getElementById('parte2').style.display = ''

}
function voltar1() {

    document.getElementById('parte1').style.display = ''
    document.getElementById('parte2').style.display = 'none'


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

function continuar2() {

    document.getElementById('parte1').style.display = 'none'
    document.getElementById('parte2').style.display = 'none'
    document.getElementById('parte3').style.display = ''

}
function voltar2() {

    document.getElementById('parte1').style.display = 'none'
    document.getElementById('parte2').style.display = ''
    document.getElementById('parte3').style.display = 'none'

}



function continuar3() {


    document.getElementById('parte1').style.display = 'none'
    document.getElementById('parte2').style.display = 'none'
    document.getElementById('parte3').style.display = 'none'
    document.getElementById('parte4').style.display = ''

    nomeFantasia_valor.innerHTML = nome_fantasia_input.value
    razaoSocial_valor.innerHTML = razao_social_input.value
    apelidoInterno_valor.innerHTML = apelido_interno_input.value
    CNPJ_valor.innerHTML = cnpj_input.value
    inicio_valor.innerHTML = horario_inicio_input.value
    fim_valor.innerHTML = horario_fim_input.value
    periodo_valor.innerHTML = periodo
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