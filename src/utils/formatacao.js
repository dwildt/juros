/**
 * Funções de Formatação
 * Formatação de valores monetários, números e percentuais
 */

/**
 * Formata um valor como moeda brasileira (R$)
 *
 * @param {number} valor - Valor a ser formatado
 * @param {boolean} incluirSimbolo - Se deve incluir o símbolo R$ (padrão: true)
 * @returns {string} Valor formatado como moeda
 */
export function formatarMoeda(valor, incluirSimbolo = true) {
    if (typeof valor !== 'number' || isNaN(valor)) {
        return incluirSimbolo ? 'R$ 0,00' : '0,00';
    }

    const valorFormatado = valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return incluirSimbolo ? `R$ ${valorFormatado}` : valorFormatado;
}

/**
 * Formata um número com casas decimais
 *
 * @param {number} numero - Número a ser formatado
 * @param {number} casasDecimais - Número de casas decimais (padrão: 2)
 * @returns {string} Número formatado
 */
export function formatarNumero(numero, casasDecimais = 2) {
    if (typeof numero !== 'number' || isNaN(numero)) {
        return '0' + (casasDecimais > 0 ? ',' + '0'.repeat(casasDecimais) : '');
    }

    return numero.toLocaleString('pt-BR', {
        minimumFractionDigits: casasDecimais,
        maximumFractionDigits: casasDecimais
    });
}

/**
 * Formata um valor como percentual
 *
 * @param {number} valor - Valor a ser formatado (em decimal ou já em percentual)
 * @param {boolean} jaPorcentagem - Se o valor já está em porcentagem (padrão: false)
 * @param {number} casasDecimais - Número de casas decimais (padrão: 2)
 * @returns {string} Valor formatado como percentual
 */
export function formatarPercentual(valor, jaPorcentagem = false, casasDecimais = 2) {
    if (typeof valor !== 'number' || isNaN(valor)) {
        return '0' + (casasDecimais > 0 ? ',' + '0'.repeat(casasDecimais) : '') + '%';
    }

    const valorPercentual = jaPorcentagem ? valor : valor * 100;

    return formatarNumero(valorPercentual, casasDecimais) + '%';
}

/**
 * Formata número de meses para exibição amigável
 * Exemplo: 24 meses = "24 meses (2 anos)"
 *
 * @param {number} meses - Número de meses
 * @returns {string} Número de meses formatado
 */
export function formatarMeses(meses) {
    if (typeof meses !== 'number' || isNaN(meses) || meses < 0) {
        return '0 meses';
    }

    // Arredonda para o inteiro mais próximo
    const mesesInteiro = Math.round(meses);

    if (mesesInteiro === 1) {
        return '1 mês';
    }

    let texto = `${formatarNumero(mesesInteiro, 0)} meses`;

    // Adiciona conversão para anos se for múltiplo de 12
    if (mesesInteiro >= 12) {
        const anos = Math.floor(mesesInteiro / 12);
        const mesesRestantes = mesesInteiro % 12;

        if (mesesRestantes === 0) {
            texto += ` (${anos} ${anos === 1 ? 'ano' : 'anos'})`;
        } else {
            texto += ` (${anos} ${anos === 1 ? 'ano' : 'anos'} e ${mesesRestantes} ${mesesRestantes === 1 ? 'mês' : 'meses'})`;
        }
    }

    return texto;
}

/**
 * Remove formatação de moeda e converte para número
 *
 * @param {string} textoMoeda - Texto com valor monetário formatado
 * @returns {number|null} Valor numérico ou null se inválido
 */
export function desformatarMoeda(textoMoeda) {
    if (typeof textoMoeda !== 'string') {
        return null;
    }

    // Remove R$, espaços, pontos de milhar e substitui vírgula por ponto
    const textoLimpo = textoMoeda
        .replace(/R\$/g, '')
        .replace(/\s/g, '')
        .replace(/\./g, '')
        .replace(',', '.');

    const numero = parseFloat(textoLimpo);

    return isNaN(numero) ? null : numero;
}

/**
 * Remove formatação de percentual e converte para decimal
 *
 * @param {string} textoPercentual - Texto com percentual formatado
 * @returns {number|null} Valor em decimal ou null se inválido
 */
export function desformatarPercentual(textoPercentual) {
    if (typeof textoPercentual !== 'string') {
        return null;
    }

    // Remove %, espaços e substitui vírgula por ponto
    const textoLimpo = textoPercentual.replace(/%/g, '').replace(/\s/g, '').replace(',', '.');

    const numero = parseFloat(textoLimpo);

    return isNaN(numero) ? null : numero / 100;
}

/**
 * Formata um input em tempo real enquanto o usuário digita
 * Restringe casas decimais conforme o tipo:
 * - moeda: 2 decimais
 * - percentual: 4 decimais
 * - numero: 0 decimais (inteiro)
 *
 * @param {string} valor - Valor atual do input
 * @param {string} tipo - Tipo de formatação ('moeda', 'percentual', 'numero')
 * @param {number} maxDecimais - Máximo de casas decimais permitidas (opcional)
 * @returns {string} Valor formatado
 */
export function formatarInputEmTempoReal(valor, tipo = 'moeda', maxDecimais = null) {
    if (!valor) return '';

    // Remove tudo exceto números, vírgula e ponto
    let valorLimpo = valor.replace(/[^\d.,]/g, '');

    // Se não há números, retorna vazio
    if (!valorLimpo) return '';

    // Substitui todas as vírgulas por pontos
    valorLimpo = valorLimpo.replace(/,/g, '.');

    // Remove pontos duplicados - mantém apenas o primeiro
    let partes = valorLimpo.split('.');
    if (partes.length > 2) {
        valorLimpo = partes[0] + '.' + partes.slice(1).join('');
    }

    // Determina o número máximo de casas decimais baseado no tipo
    let casasDecimais = maxDecimais;
    if (casasDecimais === null) {
        switch (tipo) {
            case 'moeda':
                casasDecimais = 2;
                break;
            case 'percentual':
                casasDecimais = 4;
                break;
            case 'numero':
                casasDecimais = 0;
                break;
            default:
                casasDecimais = 2;
        }
    }

    // Restringe casas decimais
    // Recalcula partes após processar pontos duplicados
    partes = valorLimpo.split('.');

    if (casasDecimais === 0) {
        // Para números inteiros, remove qualquer parte decimal
        valorLimpo = partes[0];
    } else if (partes.length === 2) {
        // Limita casas decimais após o ponto
        const parteInteira = partes[0];
        const parteDecimal = partes[1].slice(0, casasDecimais);
        valorLimpo = parteInteira + '.' + parteDecimal;
    }

    // Retorna o valor limpo sem formatação para permitir edição contínua
    // A formatação completa (R$, %, etc) será aplicada apenas no blur
    return valorLimpo.replace('.', ',');
}

/**
 * Trunca um número para um determinado número de casas decimais
 * sem arredondar
 *
 * @param {number} numero - Número a ser truncado
 * @param {number} casasDecimais - Número de casas decimais
 * @returns {number} Número truncado
 */
export function truncarNumero(numero, casasDecimais = 2) {
    const multiplicador = Math.pow(10, casasDecimais);
    return Math.trunc(numero * multiplicador) / multiplicador;
}

/**
 * Arredonda um número para um determinado número de casas decimais
 *
 * @param {number} numero - Número a ser arredondado
 * @param {number} casasDecimais - Número de casas decimais
 * @returns {number} Número arredondado
 */
export function arredondarNumero(numero, casasDecimais = 2) {
    const multiplicador = Math.pow(10, casasDecimais);
    return Math.round(numero * multiplicador) / multiplicador;
}
