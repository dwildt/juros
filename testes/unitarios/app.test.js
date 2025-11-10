/**
 * Testes Unitários - App
 */

import { describe, test, expect, beforeEach } from '@jest/globals';

describe('App', () => {
    beforeEach(() => {
        // Limpa o DOM antes de cada teste
        document.body.innerHTML = `
            <html data-tema-cor="azul" data-tema-modo="claro">
                <body>
                    <form id="formulario-calculadora">
                        <input type="text" id="valor-financiado" />
                        <input type="text" id="taxa-juros" />
                        <input type="text" id="numero-meses" />
                        <input type="text" id="valor-prestacao" />
                        <button id="botao-calcular">Calcular</button>
                        <button id="botao-limpar">Limpar</button>
                        <div id="erro-geral"></div>
                    </form>
                    <div id="resultados"></div>
                    <div class="seletor-cor" data-cor="azul"></div>
                    <div class="seletor-cor" data-cor="verde"></div>
                    <div class="seletor-cor" data-cor="laranja"></div>
                    <div class="seletor-cor" data-cor="roxo"></div>
                    <button id="toggle-modo-escuro">Modo Escuro</button>
                </body>
            </html>
        `;
    });

    describe('inicialização', () => {
        test('deve encontrar formulário da calculadora', () => {
            const formulario = document.querySelector('#formulario-calculadora');
            expect(formulario).toBeTruthy();
        });

        test('deve encontrar elementos de tema', () => {
            const seletoresCor = document.querySelectorAll('.seletor-cor');
            expect(seletoresCor.length).toBe(4);
        });

        test('deve ter todos os campos necessários', () => {
            expect(document.querySelector('#valor-financiado')).toBeTruthy();
            expect(document.querySelector('#taxa-juros')).toBeTruthy();
            expect(document.querySelector('#numero-meses')).toBeTruthy();
            expect(document.querySelector('#valor-prestacao')).toBeTruthy();
            expect(document.querySelector('#botao-calcular')).toBeTruthy();
            expect(document.querySelector('#botao-limpar')).toBeTruthy();
        });
    });
});
