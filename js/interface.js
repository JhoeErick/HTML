// Definindo os elementos da interface do usuário (UI)
const elementos = {
    campoCep: document.getElementById('campoCep'),  // Campo de entrada para o CEP
    campoUf: document.getElementById('campoUf'),  // Campo de entrada para o estado (UF)
    campoCidade: document.getElementById('campoCidade'),  // Campo de entrada para a cidade
    campoLogradouro: document.getElementById('campoLogradouro'),  // Campo de entrada para o logradouro (rua)
    carregando: document.getElementById('carregando'),  // Elemento que indica que a requisição está carregando
    erro: document.getElementById('erro'),  // Elemento onde a mensagem de erro será exibida
    resultado: document.getElementById('resultado'),  // Elemento onde os dados do endereço serão exibidos
    listaEnderecos: document.getElementById('listaEnderecos')  // Elemento para exibir a lista de endereços encontrados
};

/**
 * Controla a visibilidade dos elementos da interface (carregando, erro, resultado)
 * @param {boolean} carregando - Estado de carregamento
 * @param {boolean} erro - Estado de erro
 * @param {boolean} resultado - Estado do resultado
 */
function alternarElementos(carregando = false, erro = false, resultado = false) {
    // Exibe ou oculta os elementos de carregamento, erro e resultado com base nos parâmetros
    elementos.carregando.classList.toggle('oculto', !carregando);
    elementos.erro.classList.toggle('oculto', !erro);
    elementos.resultado.classList.toggle('oculto', !resultado);
}

/**
 * Exibe mensagem de erro na interface
 * @param {string} mensagem - Mensagem de erro para exibir
 */
function mostrarErro(mensagem) {
    elementos.erro.textContent = mensagem;  // Exibe a mensagem de erro
    alternarElementos(false, true, false);  // Mostra o elemento de erro e esconde os outros
}

/**
 * Exibe os dados do endereço na interface
 * @param {Object} dados - Dados do endereço retornados pela API
 */
function mostrarResultado(dados) {
    // Formata e exibe os dados do endereço no formato correto
    const campos = {
        'cep': formatarCep(dados.cep.replace('-', '')),  // Formata o CEP
        'logradouro': dados.logradouro || 'Não informado',  // Exibe o logradouro, ou "Não informado" se vazio
        'complemento': dados.complemento || 'Não informado',  // Exibe o complemento, ou "Não informado"
        'bairro': dados.bairro || 'Não informado',  // Exibe o bairro, ou "Não informado"
        'cidade': dados.localidade || 'Não informado',  // Exibe a cidade, ou "Não informado"
        'estado': `${dados.uf} - ${dados.estado || dados.uf}`,  // Exibe o estado (UF)
        'regiao': dados.regiao || 'Não informado',  // Exibe a região, ou "Não informado"
        'ddd': dados.ddd || 'Não informado',  // Exibe o DDD, ou "Não informado"
        'ibge': dados.ibge || 'Não informado',  // Exibe o código IBGE, ou "Não informado"
        'siafi': dados.siafi || 'Não informado'  // Exibe o código SIAFI, ou "Não informado"
    };

    // Preenche os elementos da interface com os dados obtidos
    Object.entries(campos).forEach(([chave, valor]) => {
        const elemento = document.getElementById(`resultado-${chave}`);  // Obtém o elemento correspondente
        if (elemento) {
            elemento.textContent = valor;  // Define o conteúdo do elemento
        }
    });

    alternarElementos(false, false, true);  // Mostra o resultado e esconde os outros
}

/**
 * Exibe a lista de endereços encontrados na interface
 * @param {Array} enderecos - Lista de endereços
 */
function mostrarListaEnderecos(enderecos) {
    elementos.listaEnderecos.innerHTML = '';  // Limpa a lista de endereços exibida

    // Cria um cartão de endereço para cada item na lista de endereços
    enderecos.forEach(endereco => {
        const card = document.createElement('div');
        card.className = 'endereco-card';  // Adiciona uma classe para estilo

        // Preenche o cartão com os dados do endereço
        card.innerHTML = `
            <p><strong>CEP:</strong> ${formatarCep(endereco.cep)}</p>
            <p><strong>Logradouro:</strong> ${endereco.logradouro}</p>
            <p><strong>Bairro:</strong> ${endereco.bairro}</p>
            <p><strong>Cidade:</strong> ${endereco.localidade}</p>
            <p><strong>UF:</strong> ${endereco.uf}</p>
        `;
        
        // Adiciona o cartão à lista de endereços
        elementos.listaEnderecos.appendChild(card);
    });

    elementos.listaEnderecos.classList.remove('oculto');  // Exibe a lista de endereços
}
