// Funções e elementos relacionados à interface do usuário

const elementos = {
    campoCep: document.getElementById('campoCep'),
    campoUf: document.getElementById('campoUf'),
    campoCidade: document.getElementById('campoCidade'),
    campoLogradouro: document.getElementById('campoLogradouro'),
    carregando: document.getElementById('carregando'),
    erro: document.getElementById('erro'),
    resultado: document.getElementById('resultado'),
    listaEnderecos: document.getElementById('listaEnderecos')
};

/**
 * Controla a visibilidade dos elementos da interface
 * @param {boolean} carregando - Estado de carregamento
 * @param {boolean} erro - Estado de erro
 * @param {boolean} resultado - Estado do resultado
 */
function alternarElementos(carregando = false, erro = false, resultado = false) {
    elementos.carregando.classList.toggle('oculto', !carregando);
    elementos.erro.classList.toggle('oculto', !erro);
    elementos.resultado.classList.toggle('oculto', !resultado);
}

/**
 * Exibe mensagem de erro na interface
 * @param {string} mensagem - Mensagem de erro para exibir
 */
function mostrarErro(mensagem) {
    elementos.erro.textContent = mensagem;
    alternarElementos(false, true, false);
}

/**
 * Exibe os dados do endereço na interface
 * @param {Object} dados - Dados do endereço retornados pela API
 */
function mostrarResultado(dados) {
    const campos = {
        'cep': formatarCep(dados.cep.replace('-', '')),
        'logradouro': dados.logradouro || 'Não informado',
        'complemento': dados.complemento || 'Não informado',
        'bairro': dados.bairro || 'Não informado',
        'cidade': dados.localidade || 'Não informado',
        'estado': `${dados.uf} - ${dados.estado || dados.uf}`,
        'regiao': dados.regiao || 'Não informado',
        'ddd': dados.ddd || 'Não informado',
        'ibge': dados.ibge || 'Não informado',
        'siafi': dados.siafi || 'Não informado'
    };

    Object.entries(campos).forEach(([chave, valor]) => {
        const elemento = document.getElementById(`resultado-${chave}`);
        if (elemento) {
            elemento.textContent = valor;
        }
    });

    alternarElementos(false, false, true);
}

/**
 * Exibe a lista de endereços encontrados
 * @param {Array} enderecos - Lista de endereços
 */
function mostrarListaEnderecos(enderecos) {
    elementos.listaEnderecos.innerHTML = '';
    
    enderecos.forEach(endereco => {
        const card = document.createElement('div');
        card.className = 'endereco-card';
        
        card.innerHTML = `
            <p><strong>CEP:</strong> ${formatarCep(endereco.cep)}</p>
            <p><strong>Logradouro:</strong> ${endereco.logradouro}</p>
            <p><strong>Bairro:</strong> ${endereco.bairro}</p>
            <p><strong>Cidade:</strong> ${endereco.localidade}</p>
            <p><strong>UF:</strong> ${endereco.uf}</p>
        `;
        
        elementos.listaEnderecos.appendChild(card);
    });
    
    elementos.listaEnderecos.classList.remove('oculto');
}