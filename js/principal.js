// Lógica principal da aplicação

/**
 * Inicializa a aplicação configurando os eventos necessários
 */
function inicializarAplicacao() {
    // Configura o evento de input para formatar o CEP (remover qualquer caractere não numérico)
    elementos.campoCep.addEventListener('input', (e) => {
        e.target.value = limparCep(e.target.value);  // Chama a função para limpar o CEP enquanto o usuário digita
    });

    // Configura o evento de input para formatar a UF (transforma em maiúsculas)
    elementos.campoUf.addEventListener('input', (e) => {
        e.target.value = e.target.value.toUpperCase();  // Converte o valor da UF para maiúsculas automaticamente
    });
}

/**
 * Função principal para buscar o CEP
 */
async function buscarCep() {
    const cep = elementos.campoCep.value;  // Obtém o valor do campo CEP

    // Valida se o CEP está correto (deve ter 8 dígitos)
    if (!cepEhValido(cep)) {
        mostrarErro('Por favor, digite um CEP válido com 8 dígitos');
        return;
    }

    alternarElementos(true, false, false);  // Exibe o carregamento e oculta os outros elementos

    try {
        // Chama a função que consulta o CEP na API
        const dados = await buscarEndereco(cep);
        mostrarResultado(dados);  // Exibe os dados do endereço encontrados
    } catch (erro) {
        mostrarErro(erro.message);  // Exibe a mensagem de erro se a consulta falhar
    }
}

/**
 * Função para buscar endereços por logradouro
 */
async function buscarPorLogradouro() {
    const uf = elementos.campoUf.value.trim();  // Obtém e limpa o valor da UF
    const cidade = elementos.campoCidade.value.trim();  // Obtém e limpa o valor da cidade
    const logradouro = elementos.campoLogradouro.value.trim();  // Obtém e limpa o valor do logradouro

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!uf || !cidade || !logradouro) {
        mostrarErro('Todos os campos são obrigatórios');
        return;
    }

    // Verifica se a UF tem exatamente 2 caracteres
    if (uf.length !== 2) {
        mostrarErro('UF deve conter 2 letras');
        return;
    }

    alternarElementos(true, false, false);  // Exibe o carregamento e oculta os outros elementos
    elementos.listaEnderecos.classList.add('oculto');  // Esconde a lista de endereços, se houver

    try {
        // Chama a função que busca os CEPs pelo logradouro na API
        const enderecos = await buscarCepsPorLogradouro(uf, cidade, logradouro);
        mostrarListaEnderecos(enderecos);  // Exibe a lista de endereços encontrados
    } catch (erro) {
        mostrarErro(erro.message);  // Exibe a mensagem de erro se a consulta falhar
    }
}

/**
 * Alterna entre as abas de busca
 * @param {string} abaId - ID da aba a ser exibida
 */
function alternarAba(abaId) {
    const abas = document.querySelectorAll('.tab-content');  // Obtém todas as abas
    const botoes = document.querySelectorAll('.tab-button');  // Obtém todos os botões das abas
    
    // Esconde todas as abas
    abas.forEach(aba => {
        aba.classList.add('oculto');
    });
    
    // Remove a classe "active" de todos os botões
    botoes.forEach(botao => {
        botao.classList.remove('active');
    });
    
    // Exibe a aba selecionada
    document.getElementById(abaId).classList.remove('oculto');
    // Marca o botão da aba selecionada como ativo
    document.querySelector(`[onclick="alternarAba('${abaId}')"]`).classList.add('active');
    
    // Limpa os resultados anteriores
    elementos.erro.classList.add('oculto');
    elementos.resultado.classList.add('oculto');
    elementos.listaEnderecos.classList.add('oculto');
}

// Inicializa a aplicação quando o documento estiver carregado
inicializarAplicacao();
