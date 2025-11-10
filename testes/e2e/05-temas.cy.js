/**
 * Testes E2E - Sistema de Temas
 */

describe('Sistema de Temas', () => {
    beforeEach(() => {
        cy.visit('/src/index.html');
    });

    describe('Troca de Cores', () => {
        it('deve alternar entre as cores de tema', () => {
            // Tema azul (padrão)
            cy.get('html').should('have.attr', 'data-tema-cor', 'azul');

            // Clicar em verde
            cy.get('[data-cor="verde"]').click();
            cy.get('html').should('have.attr', 'data-tema-cor', 'verde');

            // Clicar em laranja
            cy.get('[data-cor="laranja"]').click();
            cy.get('html').should('have.attr', 'data-tema-cor', 'laranja');

            // Clicar em roxo
            cy.get('[data-cor="roxo"]').click();
            cy.get('html').should('have.attr', 'data-tema-cor', 'roxo');
        });
    });

    describe('Modo Escuro', () => {
        it('deve alternar modo escuro', () => {
            // Verificar modo claro inicial
            cy.get('html').should('have.attr', 'data-tema-modo', 'claro');

            // Ativar modo escuro
            cy.get('#toggle-modo-escuro').click();
            cy.get('html').should('have.attr', 'data-tema-modo', 'escuro');

            // Desativar modo escuro
            cy.get('#toggle-modo-escuro').click();
            cy.get('html').should('have.attr', 'data-tema-modo', 'claro');
        });
    });

    describe('Persistência de Tema', () => {
        it('deve manter tema após recarregar página', () => {
            // Trocar para tema verde e modo escuro
            cy.get('[data-cor="verde"]').click();
            cy.get('#toggle-modo-escuro').click();

            // Recarregar página
            cy.reload();

            // Verificar se tema foi mantido
            cy.get('html').should('have.attr', 'data-tema-cor', 'verde');
            cy.get('html').should('have.attr', 'data-tema-modo', 'escuro');
        });
    });
});
