/**
 * Testes Unitários - Funções de Validação
 */

import { describe, test, expect } from '@jest/globals';
import * as validacao from '../../src/utils/validacao.js';

describe('Validação', () => {
  describe('ehNumeroValido', () => {
    test('deve validar números válidos', () => {
      expect(validacao.ehNumeroValido(10)).toBe(true);
      expect(validacao.ehNumeroValido(0)).toBe(true);
      expect(validacao.ehNumeroValido(-5)).toBe(true);
      expect(validacao.ehNumeroValido(3.14)).toBe(true);
    });

    test('deve rejeitar valores inválidos', () => {
      expect(validacao.ehNumeroValido(NaN)).toBe(false);
      expect(validacao.ehNumeroValido(Infinity)).toBe(false);
      expect(validacao.ehNumeroValido('10')).toBe(false);
      expect(validacao.ehNumeroValido(null)).toBe(false);
      expect(validacao.ehNumeroValido(undefined)).toBe(false);
    });
  });

  describe('ehNumeroPositivo', () => {
    test('deve validar números positivos', () => {
      expect(validacao.ehNumeroPositivo(10)).toBe(true);
      expect(validacao.ehNumeroPositivo(0.1)).toBe(true);
    });

    test('deve rejeitar zero e negativos', () => {
      expect(validacao.ehNumeroPositivo(0)).toBe(false);
      expect(validacao.ehNumeroPositivo(-5)).toBe(false);
    });
  });

  describe('ehNumeroNaoNegativo', () => {
    test('deve validar números não-negativos', () => {
      expect(validacao.ehNumeroNaoNegativo(10)).toBe(true);
      expect(validacao.ehNumeroNaoNegativo(0)).toBe(true);
    });

    test('deve rejeitar números negativos', () => {
      expect(validacao.ehNumeroNaoNegativo(-5)).toBe(false);
    });
  });

  describe('validarValorFinanciado', () => {
    test('deve validar valores financiados válidos', () => {
      const resultado = validacao.validarValorFinanciado(10000);
      expect(resultado.valido).toBe(true);
    });

    test('deve rejeitar valores inválidos', () => {
      let resultado = validacao.validarValorFinanciado(0);
      expect(resultado.valido).toBe(false);

      resultado = validacao.validarValorFinanciado(-1000);
      expect(resultado.valido).toBe(false);

      resultado = validacao.validarValorFinanciado(NaN);
      expect(resultado.valido).toBe(false);
    });
  });

  describe('validarTaxaJuros', () => {
    test('deve validar taxas de juros válidas', () => {
      let resultado = validacao.validarTaxaJuros(1.5);
      expect(resultado.valido).toBe(true);

      resultado = validacao.validarTaxaJuros(0);
      expect(resultado.valido).toBe(true);

      resultado = validacao.validarTaxaJuros(50);
      expect(resultado.valido).toBe(true);
    });

    test('deve rejeitar taxas inválidas', () => {
      let resultado = validacao.validarTaxaJuros(-1);
      expect(resultado.valido).toBe(false);

      resultado = validacao.validarTaxaJuros(150);
      expect(resultado.valido).toBe(false);

      resultado = validacao.validarTaxaJuros(NaN);
      expect(resultado.valido).toBe(false);
    });
  });

  describe('validarNumeroDeMeses', () => {
    test('deve validar número de meses válidos', () => {
      let resultado = validacao.validarNumeroDeMeses(12);
      expect(resultado.valido).toBe(true);

      resultado = validacao.validarNumeroDeMeses(1);
      expect(resultado.valido).toBe(true);

      resultado = validacao.validarNumeroDeMeses(360);
      expect(resultado.valido).toBe(true);
    });

    test('deve rejeitar número de meses inválidos', () => {
      let resultado = validacao.validarNumeroDeMeses(0);
      expect(resultado.valido).toBe(false);

      resultado = validacao.validarNumeroDeMeses(-12);
      expect(resultado.valido).toBe(false);

      resultado = validacao.validarNumeroDeMeses(700);
      expect(resultado.valido).toBe(false);
    });
  });

  describe('validarValorPrestacao', () => {
    test('deve validar valores de prestação válidos', () => {
      const resultado = validacao.validarValorPrestacao(500);
      expect(resultado.valido).toBe(true);
    });

    test('deve rejeitar valores inválidos', () => {
      let resultado = validacao.validarValorPrestacao(0);
      expect(resultado.valido).toBe(false);

      resultado = validacao.validarValorPrestacao(-100);
      expect(resultado.valido).toBe(false);
    });
  });

  describe('validarCampoNumerico', () => {
    test('deve validar e converter texto numérico válido', () => {
      let resultado = validacao.validarCampoNumerico('1234.56');
      expect(resultado.valido).toBe(true);
      expect(resultado.valor).toBe(1234.56);

      resultado = validacao.validarCampoNumerico('1234,56');
      expect(resultado.valido).toBe(true);
      expect(resultado.valor).toBe(1234.56);

      resultado = validacao.validarCampoNumerico('  100  ');
      expect(resultado.valido).toBe(true);
      expect(resultado.valor).toBe(100);
    });

    test('deve rejeitar texto inválido', () => {
      let resultado = validacao.validarCampoNumerico('');
      expect(resultado.valido).toBe(false);

      resultado = validacao.validarCampoNumerico('abc');
      expect(resultado.valido).toBe(false);

      resultado = validacao.validarCampoNumerico('   ');
      expect(resultado.valido).toBe(false);
    });
  });

  describe('validarCamposPreenchidos', () => {
    test('deve validar quando exatamente 3 campos estão preenchidos', () => {
      const campos = {
        valorFinanciado: 10000,
        taxaJuros: 1.5,
        numeroDeMeses: 12,
        valorPrestacao: null
      };

      const resultado = validacao.validarCamposPreenchidos(campos);
      expect(resultado.valido).toBe(true);
    });

    test('deve rejeitar quando menos de 3 campos estão preenchidos', () => {
      const campos = {
        valorFinanciado: 10000,
        taxaJuros: 1.5,
        numeroDeMeses: null,
        valorPrestacao: null
      };

      const resultado = validacao.validarCamposPreenchidos(campos);
      expect(resultado.valido).toBe(false);
    });

    test('deve rejeitar quando todos os 4 campos estão preenchidos', () => {
      const campos = {
        valorFinanciado: 10000,
        taxaJuros: 1.5,
        numeroDeMeses: 12,
        valorPrestacao: 888
      };

      const resultado = validacao.validarCamposPreenchidos(campos);
      expect(resultado.valido).toBe(false);
    });
  });

  describe('identificarCampoParaCalcular', () => {
    test('deve identificar corretamente qual campo calcular', () => {
      let campos = {
        valorFinanciado: null,
        taxaJuros: 1.5,
        numeroDeMeses: 12,
        valorPrestacao: 888
      };
      expect(validacao.identificarCampoParaCalcular(campos)).toBe('valorFinanciado');

      campos = {
        valorFinanciado: 10000,
        taxaJuros: null,
        numeroDeMeses: 12,
        valorPrestacao: 888
      };
      expect(validacao.identificarCampoParaCalcular(campos)).toBe('taxaJuros');

      campos = {
        valorFinanciado: 10000,
        taxaJuros: 1.5,
        numeroDeMeses: null,
        valorPrestacao: 888
      };
      expect(validacao.identificarCampoParaCalcular(campos)).toBe('numeroDeMeses');

      campos = {
        valorFinanciado: 10000,
        taxaJuros: 1.5,
        numeroDeMeses: 12,
        valorPrestacao: null
      };
      expect(validacao.identificarCampoParaCalcular(campos)).toBe('valorPrestacao');
    });

    test('deve retornar null quando todos os campos estão preenchidos', () => {
      const campos = {
        valorFinanciado: 10000,
        taxaJuros: 1.5,
        numeroDeMeses: 12,
        valorPrestacao: 888
      };

      expect(validacao.identificarCampoParaCalcular(campos)).toBeNull();
    });
  });
});
