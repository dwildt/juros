/**
 * Funções de Validação
 * Validação de entradas do formulário
 */

/**
 * Verifica se um valor é um número válido
 *
 * @param {any} valor - Valor a ser validado
 * @returns {boolean} True se for um número válido
 */
export function ehNumeroValido(valor) {
    return typeof valor === 'number' && !isNaN(valor) && isFinite(valor);
}

/**
 * Verifica se um valor é um número positivo
 *
 * @param {any} valor - Valor a ser validado
 * @returns {boolean} True se for um número positivo
 */
export function ehNumeroPositivo(valor) {
    return ehNumeroValido(valor) && valor > 0;
}

/**
 * Verifica se um valor é um número não-negativo (>= 0)
 *
 * @param {any} valor - Valor a ser validado
 * @returns {boolean} True se for um número não-negativo
 */
export function ehNumeroNaoNegativo(valor) {
    return ehNumeroValido(valor) && valor >= 0;
}

/**
 * Conta o número de casas decimais de um número
 *
 * @param {number} numero - Número a ser analisado
 * @returns {number} Número de casas decimais
 */
export function contarCasasDecimais(numero) {
    if (!ehNumeroValido(numero)) {
        return 0;
    }

    // Converte para string e analisa a parte decimal
    const numeroStr = numero.toString();

    // Se tem notação científica, precisa tratar diferente
    if (numeroStr.includes('e') || numeroStr.includes('E')) {
        // Para números muito grandes ou pequenos em notação científica
        const partes = numeroStr.split(/[eE]/);
        const mantissa = partes[0];
        const expoente = parseInt(partes[1], 10);

        // Conta decimais na mantissa
        const decimaisMantissa = mantissa.includes('.') ? mantissa.split('.')[1].length : 0;

        // Ajusta pelo expoente
        return Math.max(0, decimaisMantissa - expoente);
    }

    // Para números normais
    if (numeroStr.includes('.')) {
        return numeroStr.split('.')[1].length;
    }

    return 0;
}

/**
 * Valida o valor financiado
 *
 * @param {any} valor - Valor a ser validado
 * @returns {Object} Objeto com status de validação e mensagem de erro
 */
export function validarValorFinanciado(valor) {
    if (!ehNumeroValido(valor)) {
        return {
            valido: false,
            mensagem: 'Valor financiado deve ser um número válido'
        };
    }

    if (!ehNumeroPositivo(valor)) {
        return {
            valido: false,
            mensagem: 'Valor financiado deve ser maior que zero'
        };
    }

    // Limite máximo: 1 bilhão
    if (valor > 1000000000) {
        return {
            valido: false,
            mensagem: 'Valor financiado muito alto (máximo R$ 1.000.000.000,00)'
        };
    }

    // Validar máximo de 2 casas decimais
    const casasDecimais = contarCasasDecimais(valor);
    if (casasDecimais > 2) {
        return {
            valido: false,
            mensagem: 'Valor financiado deve ter no máximo 2 casas decimais'
        };
    }

    return {
        valido: true,
        mensagem: ''
    };
}

/**
 * Valida a taxa de juros
 *
 * @param {any} taxa - Taxa a ser validada (em porcentagem ou decimal)
 * @returns {Object} Objeto com status de validação e mensagem de erro
 */
export function validarTaxaJuros(taxa) {
    if (!ehNumeroValido(taxa)) {
        return {
            valido: false,
            mensagem: 'Taxa de juros deve ser um número válido'
        };
    }

    if (!ehNumeroNaoNegativo(taxa)) {
        return {
            valido: false,
            mensagem: 'Taxa de juros não pode ser negativa'
        };
    }

    // Assumindo taxa em porcentagem
    if (taxa > 100) {
        return {
            valido: false,
            mensagem: 'Taxa de juros muito alta (máximo 100%)'
        };
    }

    // Validar máximo de 4 casas decimais
    const casasDecimais = contarCasasDecimais(taxa);
    if (casasDecimais > 4) {
        return {
            valido: false,
            mensagem: 'Taxa de juros deve ter no máximo 4 casas decimais'
        };
    }

    return {
        valido: true,
        mensagem: ''
    };
}

/**
 * Valida o número de meses
 *
 * @param {any} meses - Número de meses a ser validado
 * @returns {Object} Objeto com status de validação e mensagem de erro
 */
export function validarNumeroDeMeses(meses) {
    if (!ehNumeroValido(meses)) {
        return {
            valido: false,
            mensagem: 'Número de meses deve ser um número válido'
        };
    }

    if (!ehNumeroPositivo(meses)) {
        return {
            valido: false,
            mensagem: 'Número de meses deve ser maior que zero'
        };
    }

    if (meses > 600) {
        return {
            valido: false,
            mensagem: 'Número de meses muito alto (máximo 600 meses / 50 anos)'
        };
    }

    if (meses < 1) {
        return {
            valido: false,
            mensagem: 'Número de meses deve ser pelo menos 1'
        };
    }

    // Validar que é um número inteiro (0 casas decimais)
    if (!Number.isInteger(meses)) {
        return {
            valido: false,
            mensagem: 'Número de meses deve ser um número inteiro'
        };
    }

    return {
        valido: true,
        mensagem: ''
    };
}

/**
 * Valida o valor da prestação
 *
 * @param {any} prestacao - Valor da prestação a ser validado
 * @returns {Object} Objeto com status de validação e mensagem de erro
 */
export function validarValorPrestacao(prestacao) {
    if (!ehNumeroValido(prestacao)) {
        return {
            valido: false,
            mensagem: 'Valor da prestação deve ser um número válido'
        };
    }

    if (!ehNumeroPositivo(prestacao)) {
        return {
            valido: false,
            mensagem: 'Valor da prestação deve ser maior que zero'
        };
    }

    // Limite máximo: 1 bilhão
    if (prestacao > 1000000000) {
        return {
            valido: false,
            mensagem: 'Valor da prestação muito alto (máximo R$ 1.000.000.000,00)'
        };
    }

    // Validar máximo de 2 casas decimais
    const casasDecimais = contarCasasDecimais(prestacao);
    if (casasDecimais > 2) {
        return {
            valido: false,
            mensagem: 'Valor da prestação deve ter no máximo 2 casas decimais'
        };
    }

    return {
        valido: true,
        mensagem: ''
    };
}

/**
 * Valida um campo de texto que representa um número
 *
 * @param {string} texto - Texto a ser validado
 * @returns {Object} Objeto com status de validação, valor numérico e mensagem
 */
export function validarCampoNumerico(texto) {
    if (!texto || texto.trim() === '') {
        return {
            valido: false,
            valor: null,
            mensagem: 'Campo obrigatório'
        };
    }

    // Remove espaços e substitui vírgula por ponto
    const textoLimpo = texto.trim().replace(',', '.');

    const numero = parseFloat(textoLimpo);

    if (isNaN(numero) || !isFinite(numero)) {
        return {
            valido: false,
            valor: null,
            mensagem: 'Valor inválido'
        };
    }

    return {
        valido: true,
        valor: numero,
        mensagem: ''
    };
}

/**
 * Valida se pelo menos 3 campos estão preenchidos
 * (necessário para calcular o quarto campo)
 *
 * @param {Object} campos - Objeto com os 4 campos
 * @returns {Object} Objeto com status de validação e mensagem
 */
export function validarCamposPreenchidos(campos) {
    const { valorFinanciado, taxaJuros, numeroDeMeses, valorPrestacao } = campos;

    const camposPreenchidos = [
        valorFinanciado !== null && valorFinanciado !== '',
        taxaJuros !== null && taxaJuros !== '',
        numeroDeMeses !== null && numeroDeMeses !== '',
        valorPrestacao !== null && valorPrestacao !== ''
    ].filter(Boolean).length;

    if (camposPreenchidos < 3) {
        return {
            valido: false,
            mensagem: 'Preencha pelo menos 3 campos para calcular o quarto'
        };
    }

    if (camposPreenchidos === 4) {
        return {
            valido: false,
            mensagem: 'Deixe um campo vazio para ser calculado'
        };
    }

    return {
        valido: true,
        mensagem: ''
    };
}

/**
 * Identifica qual campo deve ser calculado
 *
 * @param {Object} campos - Objeto com os 4 campos
 * @returns {string|null} Nome do campo a ser calculado ou null
 */
export function identificarCampoParaCalcular(campos) {
    const { valorFinanciado, taxaJuros, numeroDeMeses, valorPrestacao } = campos;

    if (valorFinanciado === null || valorFinanciado === '') return 'valorFinanciado';
    if (taxaJuros === null || taxaJuros === '') return 'taxaJuros';
    if (numeroDeMeses === null || numeroDeMeses === '') return 'numeroDeMeses';
    if (valorPrestacao === null || valorPrestacao === '') return 'valorPrestacao';

    return null;
}
