/**
 * Testes Unitários - Funções de Formatação
 */

import { describe, test, expect } from '@jest/globals';
import * as formatacao from '../../src/utils/formatacao.js';

describe('Formatação', () => {
    describe('formatarMoeda', () => {
        test('deve formatar valores monetários corretamente', () => {
            expect(formatacao.formatarMoeda(1234.56)).toBe('R$ 1.234,56');
            expect(formatacao.formatarMoeda(10000)).toBe('R$ 10.000,00');
            expect(formatacao.formatarMoeda(0.99)).toBe('R$ 0,99');
        });

        test('deve formatar sem símbolo quando solicitado', () => {
            expect(formatacao.formatarMoeda(1234.56, false)).toBe('1.234,56');
        });

        test('deve lidar com valores inválidos', () => {
            expect(formatacao.formatarMoeda(NaN)).toBe('R$ 0,00');
            expect(formatacao.formatarMoeda(undefined)).toBe('R$ 0,00');
        });
    });

    describe('formatarNumero', () => {
        test('deve formatar números corretamente', () => {
            expect(formatacao.formatarNumero(1234.56)).toBe('1.234,56');
            expect(formatacao.formatarNumero(1234.5678, 4)).toBe('1.234,5678');
            expect(formatacao.formatarNumero(10, 0)).toBe('10');
        });

        test('deve lidar com valores inválidos', () => {
            expect(formatacao.formatarNumero(NaN)).toBe('0,00');
            expect(formatacao.formatarNumero('texto')).toBe('0,00');
            expect(formatacao.formatarNumero(NaN, 0)).toBe('0');
        });
    });

    describe('formatarPercentual', () => {
        test('deve formatar percentuais a partir de decimal', () => {
            expect(formatacao.formatarPercentual(0.015)).toBe('1,50%');
            expect(formatacao.formatarPercentual(0.1)).toBe('10,00%');
            expect(formatacao.formatarPercentual(0.5)).toBe('50,00%');
        });

        test('deve formatar percentuais já em porcentagem', () => {
            expect(formatacao.formatarPercentual(1.5, true)).toBe('1,50%');
            expect(formatacao.formatarPercentual(10, true)).toBe('10,00%');
        });

        test('deve respeitar casas decimais', () => {
            expect(formatacao.formatarPercentual(0.12345, false, 4)).toBe('12,3450%');
        });

        test('deve lidar com valores inválidos', () => {
            expect(formatacao.formatarPercentual(NaN)).toBe('0,00%');
            expect(formatacao.formatarPercentual('texto')).toBe('0,00%');
            expect(formatacao.formatarPercentual(NaN, false, 0)).toBe('0%');
        });
    });

    describe('formatarMeses', () => {
        test('deve formatar meses simples corretamente', () => {
            expect(formatacao.formatarMeses(1)).toBe('1 mês');
            expect(formatacao.formatarMeses(6)).toBe('6 meses');
            expect(formatacao.formatarMeses(11)).toBe('11 meses');
        });

        test('deve formatar meses com conversão para anos', () => {
            expect(formatacao.formatarMeses(12)).toBe('12 meses (1 ano)');
            expect(formatacao.formatarMeses(24)).toBe('24 meses (2 anos)');
            expect(formatacao.formatarMeses(36)).toBe('36 meses (3 anos)');
        });

        test('deve formatar meses com anos e meses restantes', () => {
            expect(formatacao.formatarMeses(13)).toBe('13 meses (1 ano e 1 mês)');
            expect(formatacao.formatarMeses(14)).toBe('14 meses (1 ano e 2 meses)');
            expect(formatacao.formatarMeses(25)).toBe('25 meses (2 anos e 1 mês)');
        });

        test('deve arredondar valores decimais', () => {
            expect(formatacao.formatarMeses(12.6)).toBe('13 meses (1 ano e 1 mês)');
        });

        test('deve lidar com valores inválidos', () => {
            expect(formatacao.formatarMeses(NaN)).toBe('0 meses');
            expect(formatacao.formatarMeses(-5)).toBe('0 meses');
            expect(formatacao.formatarMeses('texto')).toBe('0 meses');
        });
    });

    describe('desformatarMoeda', () => {
        test('deve remover formatação de moeda corretamente', () => {
            expect(formatacao.desformatarMoeda('R$ 1.234,56')).toBe(1234.56);
            expect(formatacao.desformatarMoeda('1.234,56')).toBe(1234.56);
            expect(formatacao.desformatarMoeda('1234,56')).toBe(1234.56);
        });

        test('deve lidar com valores inválidos', () => {
            expect(formatacao.desformatarMoeda('abc')).toBeNull();
            expect(formatacao.desformatarMoeda('')).toBeNull();
            expect(formatacao.desformatarMoeda(123)).toBeNull();
        });
    });

    describe('desformatarPercentual', () => {
        test('deve remover formatação de percentual corretamente', () => {
            expect(formatacao.desformatarPercentual('1,5%')).toBeCloseTo(0.015, 4);
            expect(formatacao.desformatarPercentual('10%')).toBeCloseTo(0.1, 4);
            expect(formatacao.desformatarPercentual('50%')).toBeCloseTo(0.5, 4);
        });

        test('deve lidar com valores inválidos', () => {
            expect(formatacao.desformatarPercentual('abc')).toBeNull();
            expect(formatacao.desformatarPercentual(123)).toBeNull();
        });
    });

    describe('truncarNumero', () => {
        test('deve truncar números corretamente', () => {
            expect(formatacao.truncarNumero(1.234567, 2)).toBe(1.23);
            expect(formatacao.truncarNumero(1.999, 2)).toBe(1.99);
            expect(formatacao.truncarNumero(10.5678, 3)).toBe(10.567);
        });
    });

    describe('arredondarNumero', () => {
        test('deve arredondar números corretamente', () => {
            expect(formatacao.arredondarNumero(1.234567, 2)).toBe(1.23);
            expect(formatacao.arredondarNumero(1.235, 2)).toBe(1.24);
            expect(formatacao.arredondarNumero(1.999, 2)).toBe(2.0);
        });
    });

    describe('formatarInputEmTempoReal', () => {
        test('deve limitar moeda a 2 casas decimais', () => {
            expect(formatacao.formatarInputEmTempoReal('1234.56', 'moeda')).toBe('1234,56');
            expect(formatacao.formatarInputEmTempoReal('1234,56', 'moeda')).toBe('1234,56');
            expect(formatacao.formatarInputEmTempoReal('1234.567', 'moeda')).toBe('1234,56');
            expect(formatacao.formatarInputEmTempoReal('1234.5678', 'moeda')).toBe('1234,56');
        });

        test('deve limitar percentual a 4 casas decimais', () => {
            expect(formatacao.formatarInputEmTempoReal('1.5', 'percentual')).toBe('1,5');
            expect(formatacao.formatarInputEmTempoReal('1.5678', 'percentual')).toBe('1,5678');
            expect(formatacao.formatarInputEmTempoReal('1.56789', 'percentual')).toBe('1,5678');
        });

        test('deve remover casas decimais para números inteiros', () => {
            expect(formatacao.formatarInputEmTempoReal('1234', 'numero')).toBe('1234');
            expect(formatacao.formatarInputEmTempoReal('1234.56', 'numero')).toBe('1234');
            expect(formatacao.formatarInputEmTempoReal('1234,56', 'numero')).toBe('1234');
        });

        test('deve retornar string vazia para valores inválidos', () => {
            expect(formatacao.formatarInputEmTempoReal('')).toBe('');
            expect(formatacao.formatarInputEmTempoReal('abc')).toBe('');
        });

        test('deve lidar com pontos e vírgulas duplicados', () => {
            // Pontos duplicados: primeiro ponto é mantido, resto vira parte decimal
            expect(formatacao.formatarInputEmTempoReal('1.2.3.4.5', 'numero')).toBe('1');
            // Vírgulas são convertidas para pontos, então 1,2,3,4 vira 1.234 -> limita a 2 decimais -> 1,23
            expect(formatacao.formatarInputEmTempoReal('1,2,3,4', 'moeda')).toBe('1,23');
        });

        test('deve usar casas decimais padrão para tipo desconhecido', () => {
            expect(formatacao.formatarInputEmTempoReal('123.45', 'invalido')).toBe('123,45');
            expect(formatacao.formatarInputEmTempoReal('123.456', 'invalido')).toBe('123,45');
        });

        test('deve remover caracteres não numéricos', () => {
            // R$ 1.234,56 -> remove R$ e espaço -> 1.234,56 -> converte , para . -> 1.234.56
            // -> primeiro . mantido, resto concatenado -> 1.23456 -> limita a 2 decimais -> 1,23
            expect(formatacao.formatarInputEmTempoReal('R$ 1.234,56', 'moeda')).toBe('1,23');
            expect(formatacao.formatarInputEmTempoReal('1.5%', 'percentual')).toBe('1,5');
            // Teste simples sem formatação prévia
            expect(formatacao.formatarInputEmTempoReal('R$ 100', 'moeda')).toBe('100');
        });
    });
});
