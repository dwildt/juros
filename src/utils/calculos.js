/**
 * Funções de Cálculo Financeiro - Sistema Price
 * Cálculos de financiamento com prestações fixas
 */

/**
 * Calcula o valor da prestação mensal de um financiamento
 * Fórmula: P = V * [i * (1 + i)^n] / [(1 + i)^n - 1]
 *
 * @param {number} valorFinanciado - Valor total a ser financiado
 * @param {number} taxaJurosMensal - Taxa de juros mensal em decimal (ex: 0.015 para 1.5%)
 * @param {number} numeroDeMeses - Quantidade de meses do financiamento
 * @returns {number} Valor da prestação mensal
 */
export function calcularPrestacao(valorFinanciado, taxaJurosMensal, numeroDeMeses) {
  if (taxaJurosMensal === 0) {
    return valorFinanciado / numeroDeMeses;
  }

  const fator = Math.pow(1 + taxaJurosMensal, numeroDeMeses);
  const prestacao = valorFinanciado * (taxaJurosMensal * fator) / (fator - 1);

  return prestacao;
}

/**
 * Calcula o número de meses necessários para quitar um financiamento
 * Fórmula: n = log(P / (P - V * i)) / log(1 + i)
 *
 * @param {number} valorFinanciado - Valor total a ser financiado
 * @param {number} taxaJurosMensal - Taxa de juros mensal em decimal
 * @param {number} valorPrestacao - Valor da prestação mensal
 * @returns {number} Número de meses necessários
 */
export function calcularNumeroDeMeses(valorFinanciado, taxaJurosMensal, valorPrestacao) {
  if (taxaJurosMensal === 0) {
    return valorFinanciado / valorPrestacao;
  }

  // Verifica se a prestação é suficiente para pagar pelo menos os juros
  if (valorPrestacao <= valorFinanciado * taxaJurosMensal) {
    throw new Error('Valor da prestação é insuficiente para cobrir os juros');
  }

  const numerador = Math.log(valorPrestacao / (valorPrestacao - valorFinanciado * taxaJurosMensal));
  const denominador = Math.log(1 + taxaJurosMensal);

  return numerador / denominador;
}

/**
 * Calcula a taxa de juros mensal de um financiamento
 * Usa método de Newton-Raphson para aproximação numérica
 *
 * @param {number} valorFinanciado - Valor total a ser financiado
 * @param {number} numeroDeMeses - Quantidade de meses do financiamento
 * @param {number} valorPrestacao - Valor da prestação mensal
 * @param {number} precisao - Precisão desejada (padrão: 0.000001)
 * @param {number} maxIteracoes - Número máximo de iterações (padrão: 100)
 * @returns {number} Taxa de juros mensal em decimal
 */
export function calcularTaxaJuros(valorFinanciado, numeroDeMeses, valorPrestacao, precisao = 0.000001, maxIteracoes = 100) {
  // Chute inicial para a taxa
  let taxa = 0.01; // 1% ao mês

  // Caso especial: sem juros
  if (Math.abs(valorPrestacao * numeroDeMeses - valorFinanciado) < 0.01) {
    return 0;
  }

  for (let i = 0; i < maxIteracoes; i++) {
    const fator = Math.pow(1 + taxa, numeroDeMeses);

    // Função f(taxa) = P - V * [i * (1 + i)^n] / [(1 + i)^n - 1]
    const f = valorPrestacao - valorFinanciado * (taxa * fator) / (fator - 1);

    // Derivada f'(taxa)
    const fLinha = valorFinanciado * fator * (numeroDeMeses * (fator - 1) - taxa * numeroDeMeses * fator - fator + 1) / Math.pow(fator - 1, 2);

    // Nova aproximação
    const novaTaxa = taxa - f / fLinha;

    // Verifica convergência
    if (Math.abs(novaTaxa - taxa) < precisao) {
      return novaTaxa;
    }

    taxa = novaTaxa;
  }

  throw new Error('Não foi possível calcular a taxa de juros com a precisão desejada');
}

/**
 * Calcula o valor que pode ser financiado
 * Fórmula: V = P * [(1 + i)^n - 1] / [i * (1 + i)^n]
 *
 * @param {number} valorPrestacao - Valor da prestação mensal
 * @param {number} taxaJurosMensal - Taxa de juros mensal em decimal
 * @param {number} numeroDeMeses - Quantidade de meses do financiamento
 * @returns {number} Valor que pode ser financiado
 */
export function calcularValorFinanciado(valorPrestacao, taxaJurosMensal, numeroDeMeses) {
  if (taxaJurosMensal === 0) {
    return valorPrestacao * numeroDeMeses;
  }

  const fator = Math.pow(1 + taxaJurosMensal, numeroDeMeses);
  const valorFinanciado = valorPrestacao * (fator - 1) / (taxaJurosMensal * fator);

  return valorFinanciado;
}

/**
 * Calcula o valor total pago ao final do financiamento
 *
 * @param {number} valorPrestacao - Valor da prestação mensal
 * @param {number} numeroDeMeses - Quantidade de meses do financiamento
 * @returns {number} Valor total pago
 */
export function calcularValorTotalPago(valorPrestacao, numeroDeMeses) {
  return valorPrestacao * numeroDeMeses;
}

/**
 * Calcula o total de juros pagos ao longo do financiamento
 *
 * @param {number} valorFinanciado - Valor total financiado
 * @param {number} valorPrestacao - Valor da prestação mensal
 * @param {number} numeroDeMeses - Quantidade de meses do financiamento
 * @returns {number} Total de juros pagos
 */
export function calcularTotalJurosPagos(valorFinanciado, valorPrestacao, numeroDeMeses) {
  const valorTotalPago = calcularValorTotalPago(valorPrestacao, numeroDeMeses);
  return valorTotalPago - valorFinanciado;
}

/**
 * Converte taxa de juros de porcentagem para decimal
 *
 * @param {number} taxaPorcentagem - Taxa em porcentagem (ex: 1.5 para 1.5%)
 * @returns {number} Taxa em decimal (ex: 0.015)
 */
export function converterPorcentagemParaDecimal(taxaPorcentagem) {
  return taxaPorcentagem / 100;
}

/**
 * Converte taxa de juros de decimal para porcentagem
 *
 * @param {number} taxaDecimal - Taxa em decimal (ex: 0.015)
 * @returns {number} Taxa em porcentagem (ex: 1.5)
 */
export function converterDecimalParaPorcentagem(taxaDecimal) {
  return taxaDecimal * 100;
}
