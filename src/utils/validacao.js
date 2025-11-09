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
