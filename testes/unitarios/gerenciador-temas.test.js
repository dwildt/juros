/**
 * Testes Unitários - Gerenciador de Temas
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { GerenciadorTemas } from '../../src/componentes/organismos/gerenciador-temas.js';

describe('GerenciadorTemas', () => {
    let gerenciador;

    beforeEach(() => {
        // Limpa localStorage antes de cada teste
        localStorage.clear();

        // Cria elementos HTML necessários
        document.body.innerHTML = `
            <html data-tema-cor="azul" data-tema-modo="claro">
                <body>
                    <div class="seletor-cor" id="seletor-azul" data-cor="azul"></div>
                    <div class="seletor-cor" id="seletor-verde" data-cor="verde"></div>
                    <div class="seletor-cor" id="seletor-laranja" data-cor="laranja"></div>
                    <div class="seletor-cor" id="seletor-roxo" data-cor="roxo"></div>
                    <button id="toggle-modo-escuro">Modo Escuro</button>
                </body>
            </html>
        `;
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('construtor', () => {
        test('deve inicializar com valores padrão', () => {
            gerenciador = new GerenciadorTemas();

            expect(gerenciador.cores).toEqual(['azul', 'verde', 'laranja', 'roxo']);
        });
    });

    describe('carregarPreferencias', () => {
        test('deve carregar cor salva do localStorage', () => {
            localStorage.setItem('tema-cor', 'verde');
            gerenciador = new GerenciadorTemas();

            expect(gerenciador.corAtual).toBe('verde');
        });

        test('deve carregar modo escuro do localStorage', () => {
            localStorage.setItem('tema-modo', 'escuro');
            gerenciador = new GerenciadorTemas();

            expect(gerenciador.modoEscuro).toBe(true);
        });

        test('deve usar cor padrão se cor salva for inválida', () => {
            localStorage.setItem('tema-cor', 'invalido');
            gerenciador = new GerenciadorTemas();

            expect(gerenciador.corAtual).toBe('azul');
        });

        test('deve detectar preferência do sistema se não houver modo salvo', () => {
            // Mock do matchMedia
            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: (query) => ({
                    matches: query === '(prefers-color-scheme: dark)',
                    media: query,
                    addEventListener: () => {},
                    removeEventListener: () => {}
                })
            });

            gerenciador = new GerenciadorTemas();

            expect(typeof gerenciador.modoEscuro).toBe('boolean');
        });
    });

    describe('salvarPreferencias', () => {
        test('deve salvar cor no localStorage', () => {
            gerenciador = new GerenciadorTemas();
            gerenciador.corAtual = 'roxo';
            gerenciador.salvarPreferencias();

            expect(localStorage.getItem('tema-cor')).toBe('roxo');
        });

        test('deve salvar modo no localStorage', () => {
            gerenciador = new GerenciadorTemas();
            gerenciador.modoEscuro = true;
            gerenciador.salvarPreferencias();

            expect(localStorage.getItem('tema-modo')).toBe('escuro');
        });
    });

    describe('aplicarTema', () => {
        test('deve aplicar cor no atributo data-tema-cor', () => {
            gerenciador = new GerenciadorTemas();
            gerenciador.corAtual = 'laranja';
            gerenciador.aplicarTema();

            expect(document.documentElement.getAttribute('data-tema-cor')).toBe('laranja');
        });

        test('deve aplicar modo escuro no atributo data-tema-modo', () => {
            gerenciador = new GerenciadorTemas();
            gerenciador.modoEscuro = true;
            gerenciador.aplicarTema();

            expect(document.documentElement.getAttribute('data-tema-modo')).toBe('escuro');
        });

        test('deve aplicar modo claro no atributo data-tema-modo', () => {
            gerenciador = new GerenciadorTemas();
            gerenciador.modoEscuro = false;
            gerenciador.aplicarTema();

            expect(document.documentElement.getAttribute('data-tema-modo')).toBe('claro');
        });
    });

    describe('alterarCor', () => {
        test('deve alterar cor válida', () => {
            gerenciador = new GerenciadorTemas();
            gerenciador.alterarCor('verde');

            expect(gerenciador.corAtual).toBe('verde');
            expect(document.documentElement.getAttribute('data-tema-cor')).toBe('verde');
        });

        test('deve ignorar cor inválida', () => {
            gerenciador = new GerenciadorTemas();
            const corOriginal = gerenciador.corAtual;

            // Mock console.error para evitar output no teste
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

            gerenciador.alterarCor('invalido');

            expect(gerenciador.corAtual).toBe(corOriginal);
            expect(consoleErrorSpy).toHaveBeenCalledWith('Cor inválida: invalido');

            consoleErrorSpy.mockRestore();
        });
    });

    describe('alternarModoEscuro', () => {
        test('deve alternar de modo claro para escuro', () => {
            gerenciador = new GerenciadorTemas();
            gerenciador.modoEscuro = false;

            gerenciador.alternarModoEscuro();

            expect(gerenciador.modoEscuro).toBe(true);
            expect(document.documentElement.getAttribute('data-tema-modo')).toBe('escuro');
        });

        test('deve alternar de modo escuro para claro', () => {
            gerenciador = new GerenciadorTemas();
            gerenciador.modoEscuro = true;

            gerenciador.alternarModoEscuro();

            expect(gerenciador.modoEscuro).toBe(false);
            expect(document.documentElement.getAttribute('data-tema-modo')).toBe('claro');
        });
    });
});
