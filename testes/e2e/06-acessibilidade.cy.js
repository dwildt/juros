/**
 * Testes E2E - Acessibilidade e Responsividade
 */

describe('Acessibilidade e Responsividade', () => {
    beforeEach(() => {
        cy.visit('/src/index.html');
    });

    describe('Acessibilidade', () => {
        it('deve ter labels para todos os inputs', () => {
            cy.get('#valor-financiado').should('have.attr', 'aria-describedby');
            cy.get('#taxa-juros').should('have.attr', 'aria-describedby');
            cy.get('#numero-meses').should('have.attr', 'aria-describedby');
            cy.get('#valor-prestacao').should('have.attr', 'aria-describedby');
        });

        it('deve permitir navegação por teclado', () => {
            cy.get('body').tab();
            cy.focused().should('have.attr', 'data-cor');

            cy.focused().tab();
            cy.focused().should('have.id', 'toggle-modo-escuro');
        });
    });

    describe('Responsividade', () => {
        it('deve funcionar em mobile', () => {
            cy.viewport('iphone-x');
            cy.get('#valor-financiado').should('be.visible');
            cy.get('#botao-calcular').should('be.visible');
        });

        it('deve funcionar em tablet', () => {
            cy.viewport('ipad-2');
            cy.get('#valor-financiado').should('be.visible');
            cy.get('#botao-calcular').should('be.visible');
        });

        it('deve funcionar em desktop', () => {
            cy.viewport(1920, 1080);
            cy.get('#valor-financiado').should('be.visible');
            cy.get('#botao-calcular').should('be.visible');
        });
    });
});
