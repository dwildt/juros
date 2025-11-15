/**
 * Testes E2E - Carregamento da Página
 */

describe('Carregamento da Página', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('deve carregar a página com sucesso', () => {
        cy.contains('Calculadora de Financiamento').should('be.visible');
    });

    it('deve exibir todos os campos do formulário', () => {
        cy.get('#valor-financiado').should('be.visible');
        cy.get('#taxa-juros').should('be.visible');
        cy.get('#numero-meses').should('be.visible');
        cy.get('#valor-prestacao').should('be.visible');
    });

    it('deve exibir os botões de ação', () => {
        cy.get('#botao-calcular').should('be.visible').and('contain', 'Calcular');
        cy.get('#botao-limpar').should('be.visible').and('contain', 'Limpar');
    });

    it('deve exibir o seletor de temas', () => {
        cy.get('[data-cor="azul"]').should('be.visible');
        cy.get('[data-cor="verde"]').should('be.visible');
        cy.get('[data-cor="laranja"]').should('be.visible');
        cy.get('[data-cor="roxo"]').should('be.visible');
        cy.get('#toggle-modo-escuro').should('exist');
    });
});
