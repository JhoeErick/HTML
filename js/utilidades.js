// Funções utilitárias para manipulação de CEP

/**
 * Formata o CEP adicionando hífen (ex: 12345-678)
 * @param {string} cep - CEP sem formatação
 * @returns {string} CEP formatado
 */
const formatarCep = (cep) => {
    // Usa uma expressão regular para inserir um hífen entre o 5º e o 6º dígito do CEP
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
};

/**
 * Verifica se o CEP é válido (8 dígitos numéricos)
 * @param {string} cep - CEP para validação
 * @returns {boolean} Verdadeiro se o CEP for válido
 */
const cepEhValido = (cep) => {
    // A expressão regular verifica se o CEP tem exatamente 8 dígitos numéricos
    return /^\d{8}$/.test(cep);
};

/**
 * Remove caracteres não numéricos do CEP
 * @param {string} cep - CEP com possível formatação
 * @returns {string} Apenas os números do CEP
 */
const limparCep = (cep) => {
    // Remove qualquer caractere que não seja número (como hífens ou espaços)
    return cep.replace(/\D/g, '');
};
