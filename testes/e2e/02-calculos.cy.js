/**
 * Testes E2E - Cálculos Financeiros
 */

describe('Cálculos Financeiros', () => {
    beforeEach(() => {
        cy.visit('/src/index.html');
    });

    describe('Cálculo de Prestação', () => {
        it('deve calcular a prestação corretamente', () => {
            // Preencher campos
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');
            cy.get('#numero-meses').type('12');

            // Clicar em calcular
            cy.get('#botao-calcular').click();

            // Verificar resultado
            cy.get('#resultados').should('be.visible');
            cy.contains('Valor da Prestação').should('be.visible');
        });
    });

    describe('Cálculo de Número de Meses', () => {
        it('deve calcular o número de meses corretamente', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');
            cy.get('#valor-prestacao').type('888.49');

            cy.get('#botao-calcular').click();

            cy.get('#resultados').should('be.visible');
            cy.contains('Número de Meses').should('be.visible');
        });
    });

    describe('Cálculo de Taxa de Juros', () => {
        it('deve calcular a taxa de juros corretamente', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#numero-meses').type('12');
            cy.get('#valor-prestacao').type('888.49');

            cy.get('#botao-calcular').click();

            cy.get('#resultados').should('be.visible');
            cy.contains('Taxa de Juros Mensal').should('be.visible');
        });
    });

    describe('Cálculo de Valor Financiado', () => {
        it('deve calcular o valor financiado corretamente', () => {
            cy.get('#taxa-juros').type('1');
            cy.get('#numero-meses').type('12');
            cy.get('#valor-prestacao').type('888.49');

            cy.get('#botao-calcular').click();

            cy.get('#resultados').should('be.visible');
            cy.contains('Valor Financiado').should('be.visible');
        });
    });
});
