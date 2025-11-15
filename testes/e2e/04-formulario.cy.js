/**
 * Testes E2E - Funcionalidades do Formulário
 */

describe('Funcionalidades do Formulário', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    describe('Botão Limpar', () => {
        it('deve limpar todos os campos quando clicar em limpar', () => {
            // Preencher campos
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');
            cy.get('#numero-meses').type('12');

            // Clicar em limpar
            cy.get('#botao-limpar').click();

            // Verificar se campos foram limpos
            cy.get('#valor-financiado').should('have.value', '');
            cy.get('#taxa-juros').should('have.value', '');
            cy.get('#numero-meses').should('have.value', '');
            cy.get('#valor-prestacao').should('have.value', '');
        });

        it('deve limpar os resultados quando clicar em limpar', () => {
            // Fazer um cálculo
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');
            cy.get('#numero-meses').type('12');
            cy.get('#botao-calcular').click();

            // Verificar que há resultados
            cy.get('#resultados').should('be.visible');

            // Limpar
            cy.get('#botao-limpar').click();

            // Verificar que resultados foram ocultados
            cy.get('#resultados').should('not.be.visible');
        });
    });

    describe('Edge Cases', () => {
        it('deve calcular com taxa de juros zero', () => {
            cy.get('#valor-financiado').type('12000');
            cy.get('#taxa-juros').type('0');
            cy.get('#numero-meses').type('12');

            cy.get('#botao-calcular').click();

            cy.get('#resultados').should('be.visible');
            cy.contains('R$ 1.000,00').should('be.visible');
        });

        it('deve aceitar valores com vírgula como separador decimal', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1,5');
            cy.get('#numero-meses').type('12');

            cy.get('#botao-calcular').click();

            cy.get('#resultados').should('be.visible');
        });

        it('deve calcular meses com valores decimais arredondados', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');
            cy.get('#valor-prestacao').type('850');

            cy.get('#botao-calcular').click();

            cy.get('#resultados').should('be.visible');
            cy.contains('meses').should('be.visible');
        });
    });
});
