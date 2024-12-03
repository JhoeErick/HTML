// Lógica principal da aplicação

/**
 * Inicializa a aplicação configurando os eventos necessários
 */
function inicializarAplicacao() {
    // Configura o evento de input para formatar o CEP
    elementos.campoCep.addEventListener('input', (e) => {
        e.target.value = limparCep(e.target.value);
    });

    // Configura o evento de input para formatar UF
    elementos.campoUf.addEventListener('input', (e) => {
        e.target.value = e.target.value.toUpperCase();
    });
}

/**
 * Função principal para buscar o CEP
 */
async function buscarCep() {
    const cep = elementos.campoCep.value;

    if (!cepEhValido(cep)) {
        mostrarErro('Por favor, digite um CEP válido com 8 dígitos');
        return;
    }

    alternarElementos(true, false, false);

    try {
        const dados = await buscarEndereco(cep);
        mostrarResultado(dados);
    } catch (erro) {
        mostrarErro(erro.message);
    }
}

/**
 * Função para buscar endereços por logradouro
 */
async function buscarPorLogradouro() {
    const uf = elementos.campoUf.value.trim();
    const cidade = elementos.campoCidade.value.trim();
    const logradouro = elementos.campoLogradouro.value.trim();

    if (!uf || !cidade || !logradouro) {
        mostrarErro('Todos os campos são obrigatórios');
        return;
    }

    if (uf.length !== 2) {
        mostrarErro('UF deve conter 2 letras');
        return;
    }

    alternarElementos(true, false, false);
    elementos.listaEnderecos.classList.add('oculto');

    try {
        const enderecos = await buscarCepsPorLogradouro(uf, cidade, logradouro);
        mostrarListaEnderecos(enderecos);
    } catch (erro) {
        mostrarErro(erro.message);
    }
}

/**
 * Alterna entre as abas de busca
 * @param {string} abaId - ID da aba a ser exibida
 */
function alternarAba(abaId) {
    const abas = document.querySelectorAll('.tab-content');
    const botoes = document.querySelectorAll('.tab-button');
    
    abas.forEach(aba => {
        aba.classList.add('oculto');
    });
    
    botoes.forEach(botao => {
        botao.classList.remove('active');
    });
    
    document.getElementById(abaId).classList.remove('oculto');
    document.querySelector(`[onclick="alternarAba('${abaId}')"]`).classList.add('active');
    
    // Limpa resultados anteriores
    elementos.erro.classList.add('oculto');
    elementos.resultado.classList.add('oculto');
    elementos.listaEnderecos.classList.add('oculto');
}

// Inicializa a aplicação quando o documento estiver carregado
inicializarAplicacao();