/**
 * Testes Unitários - Calculadora
 */

import { describe, test, expect, beforeEach } from '@jest/globals';
import { Calculadora } from '../../src/componentes/organismos/calculadora.js';

describe('Calculadora', () => {
    let formulario;
    let calculadora;

    beforeEach(() => {
        // Cria um formulário HTML de teste com estrutura completa
        document.body.innerHTML = `
            <form id="formulario-calculadora">
                <div class="campo-formulario">
                    <input type="text" id="valor-financiado" />
                    <span class="texto-ajuda"></span>
                </div>
                <div class="campo-formulario">
                    <input type="text" id="taxa-juros" />
                    <span class="texto-ajuda"></span>
                </div>
                <div class="campo-formulario">
                    <input type="text" id="numero-meses" />
                    <span class="texto-ajuda"></span>
                </div>
                <div class="campo-formulario">
                    <input type="text" id="valor-prestacao" />
                    <span class="texto-ajuda"></span>
                </div>
                <button id="botao-calcular">Calcular</button>
                <button id="botao-limpar">Limpar</button>
                <div id="erro-geral"></div>
            </form>
            <div id="resultados"></div>
        `;

        formulario = document.querySelector('#formulario-calculadora');
        calculadora = new Calculadora(formulario);
    });

    describe('construtor', () => {
        test('deve inicializar corretamente', () => {
            expect(calculadora.formulario).toBe(formulario);
            expect(calculadora.campos.valorFinanciado).toBeTruthy();
            expect(calculadora.campos.taxaJuros).toBeTruthy();
            expect(calculadora.campos.numeroDeMeses).toBeTruthy();
            expect(calculadora.campos.valorPrestacao).toBeTruthy();
            expect(calculadora.botaoCalcular).toBeTruthy();
            expect(calculadora.botaoLimpar).toBeTruthy();
        });
    });

    describe('obterValoresCampos', () => {
        test('deve obter valores dos campos corretamente', () => {
            calculadora.campos.valorFinanciado.value = '10000';
            calculadora.campos.taxaJuros.value = '1.5';
            calculadora.campos.numeroDeMeses.value = '24';
            calculadora.campos.valorPrestacao.value = '';

            const valores = calculadora.obterValoresCampos();

            expect(valores.valorFinanciado).toBe(10000);
            expect(valores.taxaJuros).toBe(1.5);
            expect(valores.numeroDeMeses).toBe(24);
            expect(valores.valorPrestacao).toBeNull();
        });

        test('deve manter valor original para valores inválidos e null para vazios', () => {
            calculadora.campos.valorFinanciado.value = 'abc';
            calculadora.campos.taxaJuros.value = '';

            const valores = calculadora.obterValoresCampos();

            expect(valores.valorFinanciado).toBe('abc');
            expect(valores.taxaJuros).toBeNull();
        });
    });

    describe('limpar', () => {
        test('deve limpar todos os campos', () => {
            calculadora.campos.valorFinanciado.value = '10000';
            calculadora.campos.taxaJuros.value = '1.5';
            calculadora.campos.numeroDeMeses.value = '24';
            calculadora.campos.valorPrestacao.value = '500';

            calculadora.limpar();

            expect(calculadora.campos.valorFinanciado.value).toBe('');
            expect(calculadora.campos.taxaJuros.value).toBe('');
            expect(calculadora.campos.numeroDeMeses.value).toBe('');
            expect(calculadora.campos.valorPrestacao.value).toBe('');
        });
    });

    describe('mostrarErroGeral', () => {
        test('deve mostrar mensagem de erro geral', () => {
            const mensagem = 'Erro de teste';
            calculadora.mostrarErroGeral(mensagem);

            const erroGeral = document.querySelector('#erro-geral');
            expect(erroGeral.textContent).toBe(mensagem);
            expect(erroGeral.style.display).toBe('block');
        });
    });

    describe('limparTodosErros', () => {
        test('deve limpar mensagem de erro geral', () => {
            const erroGeral = document.querySelector('#erro-geral');
            erroGeral.textContent = 'Erro de teste';
            erroGeral.style.display = 'block';

            calculadora.limparTodosErros();

            expect(erroGeral.textContent).toBe('');
            expect(erroGeral.style.display).toBe('none');
        });
    });

    describe('mostrarErro', () => {
        test('deve mostrar mensagem de erro em campo específico', () => {
            const campo = calculadora.campos.valorFinanciado;
            const mensagem = 'Valor inválido';

            calculadora.mostrarErro(campo, mensagem);

            expect(campo.classList.contains('input--erro')).toBe(true);
            const campoFormulario = campo.closest('.campo-formulario');
            expect(campoFormulario.classList.contains('campo-formulario--erro')).toBe(true);
        });
    });

    describe('limparErro', () => {
        test('deve limpar mensagem de erro de campo específico', () => {
            const campo = calculadora.campos.valorFinanciado;
            const campoFormulario = campo.closest('.campo-formulario');
            campo.classList.add('input--erro');
            campoFormulario.classList.add('campo-formulario--erro');

            calculadora.limparErro(campo);

            expect(campo.classList.contains('input--erro')).toBe(false);
            expect(campoFormulario.classList.contains('campo-formulario--erro')).toBe(false);
        });
    });

    describe('validarEntradas', () => {
        test('deve retornar false quando menos de 3 campos preenchidos', () => {
            const valores = {
                valorFinanciado: 10000,
                taxaJuros: null,
                numeroDeMeses: null,
                valorPrestacao: null
            };

            const resultado = calculadora.validarEntradas(valores);

            expect(resultado).toBe(false);
        });

        test('deve retornar false quando valores inválidos', () => {
            const valores = {
                valorFinanciado: -100,
                taxaJuros: 1.5,
                numeroDeMeses: 24,
                valorPrestacao: null
            };

            const resultado = calculadora.validarEntradas(valores);

            expect(resultado).toBe(false);
        });

        test('deve retornar true quando valores válidos', () => {
            const valores = {
                valorFinanciado: 10000,
                taxaJuros: 1.5,
                numeroDeMeses: 24,
                valorPrestacao: null
            };

            const resultado = calculadora.validarEntradas(valores);

            expect(resultado).toBe(true);
        });
    });

    describe('calcular', () => {
        test('deve calcular prestação corretamente', () => {
            calculadora.campos.valorFinanciado.value = '10000';
            calculadora.campos.taxaJuros.value = '1';
            calculadora.campos.numeroDeMeses.value = '12';
            calculadora.campos.valorPrestacao.value = '';

            calculadora.calcular();

            const resultados = document.querySelector('#resultados');
            expect(resultados.style.display).toBe('block');
        });

        test('deve mostrar erro quando todos campos preenchidos', () => {
            calculadora.campos.valorFinanciado.value = '10000';
            calculadora.campos.taxaJuros.value = '1.5';
            calculadora.campos.numeroDeMeses.value = '24';
            calculadora.campos.valorPrestacao.value = '500';

            calculadora.calcular();

            const erroGeral = document.querySelector('#erro-geral');
            expect(erroGeral.textContent).toBe('Deixe um campo vazio para ser calculado');
        });

        test('deve mostrar erro quando menos de 3 campos preenchidos', () => {
            calculadora.campos.valorFinanciado.value = '10000';
            calculadora.campos.taxaJuros.value = '';
            calculadora.campos.numeroDeMeses.value = '';
            calculadora.campos.valorPrestacao.value = '';

            calculadora.calcular();

            const erroGeral = document.querySelector('#erro-geral');
            expect(erroGeral.style.display).toBe('block');
        });
    });

    describe('limparResultados', () => {
        test('deve limpar área de resultados', () => {
            const resultados = document.querySelector('#resultados');
            resultados.innerHTML = '<div>Resultado teste</div>';
            resultados.style.display = 'block';

            calculadora.limparResultados();

            expect(resultados.innerHTML).toBe('');
            expect(resultados.style.display).toBe('none');
        });
    });
});
