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
    });
  });

  describe('desformatarPercentual', () => {
    test('deve remover formatação de percentual corretamente', () => {
      expect(formatacao.desformatarPercentual('1,5%')).toBeCloseTo(0.015, 4);
      expect(formatacao.desformatarPercentual('10%')).toBeCloseTo(0.1, 4);
      expect(formatacao.desformatarPercentual('50%')).toBeCloseTo(0.5, 4);
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
});
