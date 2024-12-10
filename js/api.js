// Definindo a URL base da API do ViaCEP
const URL_BASE_API = 'https://viacep.com.br/ws';

/**
 * Função para buscar o endereço a partir do CEP
 * @param {string} cep - CEP para consulta
 * @returns {Promise<Object>} - Dados do endereço encontrados
 * @throws {Error} - Caso o CEP não seja encontrado ou haja erro na requisição
 */
async function buscarEndereco(cep) {
    try {
        // Fazendo a requisição para a API ViaCEP com o CEP fornecido
        const resposta = await fetch(`${URL_BASE_API}/${cep}/json/`);
        const dados = await resposta.json();  // Convertendo a resposta em JSON
        
        // Verificando se o CEP retornou erro
        if (dados.erro) {
            throw new Error('CEP não encontrado');
        }
        
        return dados;  // Retornando os dados do endereço encontrado
    } catch (erro) {
        // Tratamento de erro: caso o CEP não seja encontrado ou outro erro ocorra
        if (erro.message === 'CEP não encontrado') {
            throw erro;  // Lançando o erro se o CEP não for encontrado
        }
        throw new Error('Erro ao buscar o CEP. Tente novamente.');  // Outro tipo de erro
    }
}

/**
 * Função para buscar CEPs a partir de um logradouro (rua, cidade e estado)
 * @param {string} uf - Sigla do estado (UF)
 * @param {string} cidade - Nome da cidade
 * @param {string} logradouro - Nome da rua ou logradouro
 * @returns {Promise<Array>} - Lista de endereços encontrados
 */
async function buscarCepsPorLogradouro(uf, cidade, logradouro) {
    try {
        // Verificando se todos os campos obrigatórios foram preenchidos
        if (!uf || !cidade || !logradouro) {
            throw new Error('Todos os campos são obrigatórios');
        }

        // Fazendo a requisição para a API ViaCEP com estado, cidade e logradouro
        const resposta = await fetch(`${URL_BASE_API}/${uf}/${cidade}/${logradouro}/json/`);
        const dados = await resposta.json();  // Convertendo a resposta em JSON

        // Verificando se a resposta contém uma lista de endereços válidos
        if (Array.isArray(dados) && dados.length === 0) {
            throw new Error('Nenhum endereço encontrado');
        }

        // Verificando se o formato da resposta é válido
        if (!Array.isArray(dados)) {
            throw new Error('Formato de resposta inválido');
        }

        return dados;  // Retornando a lista de endereços encontrados
    } catch (erro) {
        // Tratamento de erro: caso nenhum endereço seja encontrado ou haja erro no formato
        if (erro.message === 'Nenhum endereço encontrado') {
            throw erro;  // Lançando o erro se nenhum endereço for encontrado
        }
        throw new Error('Erro ao buscar endereços. Verifique os dados e tente novamente.');  // Outro tipo de erro
    }
}
