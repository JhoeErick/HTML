// Configuração e funções relacionadas à API do ViaCEP

const URL_BASE_API = 'https://viacep.com.br/ws';

/**
 * Busca o endereço na API do ViaCEP
 * @param {string} cep - CEP para consulta
 * @returns {Promise<Object>} Dados do endereço
 * @throws {Error} Erro caso o CEP não seja encontrado ou ocorra falha na requisição
 */
async function buscarEndereco(cep) {
    try {
        const resposta = await fetch(`${URL_BASE_API}/${cep}/json/`);
        const dados = await resposta.json();
        
        if (dados.erro) {
            throw new Error('CEP não encontrado');
        }
        
        return dados;
    } catch (erro) {
        if (erro.message === 'CEP não encontrado') {
            throw erro;
        }
        throw new Error('Erro ao buscar o CEP. Tente novamente.');
    }
}

/**
 * Busca CEPs por logradouro
 * @param {string} uf - Estado (UF)
 * @param {string} cidade - Cidade
 * @param {string} logradouro - Nome da rua
 * @returns {Promise<Array>} Lista de endereços encontrados
 */
async function buscarCepsPorLogradouro(uf, cidade, logradouro) {
    try {
        if (!uf || !cidade || !logradouro) {
            throw new Error('Todos os campos são obrigatórios');
        }

        const resposta = await fetch(`${URL_BASE_API}/${uf}/${cidade}/${logradouro}/json/`);
        const dados = await resposta.json();

        if (Array.isArray(dados) && dados.length === 0) {
            throw new Error('Nenhum endereço encontrado');
        }

        if (!Array.isArray(dados)) {
            throw new Error('Formato de resposta inválido');
        }

        return dados;
    } catch (erro) {
        if (erro.message === 'Nenhum endereço encontrado') {
            throw erro;
        }
        throw new Error('Erro ao buscar endereços. Verifique os dados e tente novamente.');
    }
}