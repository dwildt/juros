/**
 * Testes Unitários - Funções de Cálculo Financeiro
 */

import { describe, test, expect } from '@jest/globals';
import * as calculos from '../../src/utils/calculos.js';

describe('Cálculos Financeiros', () => {
    describe('calcularPrestacao', () => {
        test('deve calcular corretamente a prestação com juros', () => {
            const valorFinanciado = 10000;
            const taxaJuros = 0.01; // 1% ao mês
            const meses = 12;

            const prestacao = calculos.calcularPrestacao(valorFinanciado, taxaJuros, meses);

            // Valor esperado aproximado: R$ 888,49
            expect(prestacao).toBeCloseTo(888.49, 2);
        });

        test('deve calcular corretamente a prestação sem juros', () => {
            const valorFinanciado = 12000;
            const taxaJuros = 0;
            const meses = 12;

            const prestacao = calculos.calcularPrestacao(valorFinanciado, taxaJuros, meses);

            expect(prestacao).toBe(1000);
        });

        test('deve calcular corretamente com valores decimais', () => {
            const valorFinanciado = 50000;
            const taxaJuros = 0.015; // 1.5% ao mês
            const meses = 24;

            const prestacao = calculos.calcularPrestacao(valorFinanciado, taxaJuros, meses);

            // Valor esperado aproximado: R$ 2496.21
            expect(prestacao).toBeCloseTo(2496.21, 2);
        });
    });

    describe('calcularNumeroDeMeses', () => {
        test('deve calcular corretamente o número de meses com juros', () => {
            const valorFinanciado = 10000;
            const taxaJuros = 0.01;
            const valorPrestacao = 888.49;

            const meses = calculos.calcularNumeroDeMeses(
                valorFinanciado,
                taxaJuros,
                valorPrestacao
            );

            expect(meses).toBeCloseTo(12, 0);
        });

        test('deve calcular corretamente o número de meses sem juros', () => {
            const valorFinanciado = 12000;
            const taxaJuros = 0;
            const valorPrestacao = 1000;

            const meses = calculos.calcularNumeroDeMeses(
                valorFinanciado,
                taxaJuros,
                valorPrestacao
            );

            expect(meses).toBe(12);
        });

        test('deve lançar erro se prestação for insuficiente', () => {
            const valorFinanciado = 10000;
            const taxaJuros = 0.01;
            const valorPrestacao = 50; // Muito baixo

            expect(() => {
                calculos.calcularNumeroDeMeses(valorFinanciado, taxaJuros, valorPrestacao);
            }).toThrow();
        });
    });

    describe('calcularTaxaJuros', () => {
        test('deve calcular corretamente a taxa de juros', () => {
            const valorFinanciado = 10000;
            const meses = 12;
            const valorPrestacao = 888.49;

            const taxa = calculos.calcularTaxaJuros(valorFinanciado, meses, valorPrestacao);

            // Taxa esperada: 1% ao mês (0.01)
            expect(taxa).toBeCloseTo(0.01, 4);
        });

        test('deve retornar 0 para financiamento sem juros', () => {
            const valorFinanciado = 12000;
            const meses = 12;
            const valorPrestacao = 1000;

            const taxa = calculos.calcularTaxaJuros(valorFinanciado, meses, valorPrestacao);

            expect(taxa).toBeCloseTo(0, 6);
        });
    });

    describe('calcularValorFinanciado', () => {
        test('deve calcular corretamente o valor financiado com juros', () => {
            const valorPrestacao = 888.49;
            const taxaJuros = 0.01;
            const meses = 12;

            const valorFinanciado = calculos.calcularValorFinanciado(
                valorPrestacao,
                taxaJuros,
                meses
            );

            expect(valorFinanciado).toBeCloseTo(10000, 0);
        });

        test('deve calcular corretamente o valor financiado sem juros', () => {
            const valorPrestacao = 1000;
            const taxaJuros = 0;
            const meses = 12;

            const valorFinanciado = calculos.calcularValorFinanciado(
                valorPrestacao,
                taxaJuros,
                meses
            );

            expect(valorFinanciado).toBe(12000);
        });
    });

    describe('calcularValorTotalPago', () => {
        test('deve calcular corretamente o valor total pago', () => {
            const valorPrestacao = 888.49;
            const meses = 12;

            const total = calculos.calcularValorTotalPago(valorPrestacao, meses);

            expect(total).toBeCloseTo(10661.88, 2);
        });
    });

    describe('calcularTotalJurosPagos', () => {
        test('deve calcular corretamente o total de juros pagos', () => {
            const valorFinanciado = 10000;
            const valorPrestacao = 888.49;
            const meses = 12;

            const juros = calculos.calcularTotalJurosPagos(valorFinanciado, valorPrestacao, meses);

            expect(juros).toBeCloseTo(661.88, 2);
        });
    });

    describe('Conversões de taxa', () => {
        test('deve converter porcentagem para decimal corretamente', () => {
            expect(calculos.converterPorcentagemParaDecimal(1.5)).toBe(0.015);
            expect(calculos.converterPorcentagemParaDecimal(10)).toBe(0.1);
            expect(calculos.converterPorcentagemParaDecimal(0.5)).toBe(0.005);
        });

        test('deve converter decimal para porcentagem corretamente', () => {
            expect(calculos.converterDecimalParaPorcentagem(0.015)).toBe(1.5);
            expect(calculos.converterDecimalParaPorcentagem(0.1)).toBe(10);
            expect(calculos.converterDecimalParaPorcentagem(0.005)).toBe(0.5);
        });
    });
});
