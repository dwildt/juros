/**
 * Testes E2E - Validações de Entrada
 */

describe('Validações', () => {
    beforeEach(() => {
        cy.visit('/src/index.html');
    });

    describe('Validações Gerais', () => {
        it('deve mostrar erro quando menos de 3 campos estão preenchidos', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');

            cy.get('#botao-calcular').click();

            cy.contains('Preencha pelo menos 3 campos').should('be.visible');
        });

        it('deve mostrar erro quando todos os campos estão preenchidos', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');
            cy.get('#numero-meses').type('12');
            cy.get('#valor-prestacao').type('888.49');

            cy.get('#botao-calcular').click();

            cy.contains('Deixe um campo vazio').should('be.visible');
        });
    });

    describe('Validação - Valor Financiado', () => {
        it('deve mostrar erro quando valor financiado não é um número', () => {
            cy.get('#valor-financiado').type('abc');
            cy.get('#taxa-juros').type('1');
            cy.get('#numero-meses').type('12');

            cy.get('#botao-calcular').click();

            cy.contains('Valor financiado deve ser um número válido').should('be.visible');
        });

        it('deve mostrar erro quando valor financiado é zero', () => {
            cy.get('#valor-financiado').type('0');
            cy.get('#taxa-juros').type('1');
            cy.get('#numero-meses').type('12');

            cy.get('#botao-calcular').click();

            cy.contains('Valor financiado deve ser maior que zero').should('be.visible');
        });

        it('deve mostrar erro quando valor financiado é negativo', () => {
            cy.get('#valor-financiado').type('-1000');
            cy.get('#taxa-juros').type('1');
            cy.get('#numero-meses').type('12');

            cy.get('#botao-calcular').click();

            cy.contains('Valor financiado deve ser maior que zero').should('be.visible');
        });
    });

    describe('Validação - Taxa de Juros', () => {
        it('deve mostrar erro quando taxa de juros não é um número', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('xyz');
            cy.get('#numero-meses').type('12');

            cy.get('#botao-calcular').click();

            cy.contains('Taxa de juros deve ser um número válido').should('be.visible');
        });

        it('deve mostrar erro quando taxa de juros é negativa', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('-5');
            cy.get('#numero-meses').type('12');

            cy.get('#botao-calcular').click();

            cy.contains('Taxa de juros não pode ser negativa').should('be.visible');
        });

        it('deve mostrar erro quando taxa de juros é maior que 100%', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('150');
            cy.get('#numero-meses').type('12');

            cy.get('#botao-calcular').click();

            cy.contains('Taxa de juros muito alta').should('be.visible');
        });
    });

    describe('Validação - Número de Meses', () => {
        it('deve mostrar erro quando número de meses não é um número', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');
            cy.get('#numero-meses').type('aaa');

            cy.get('#botao-calcular').click();

            cy.contains('Número de meses deve ser um número válido').should('be.visible');
        });

        it('deve mostrar erro quando número de meses é zero', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');
            cy.get('#numero-meses').type('0');

            cy.get('#botao-calcular').click();

            cy.contains('Número de meses deve ser maior que zero').should('be.visible');
        });

        it('deve mostrar erro quando número de meses é negativo', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');
            cy.get('#numero-meses').type('-5');

            cy.get('#botao-calcular').click();

            cy.contains('Número de meses deve ser maior que zero').should('be.visible');
        });

        it('deve mostrar erro quando número de meses é muito alto (> 600)', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');
            cy.get('#numero-meses').type('700');

            cy.get('#botao-calcular').click();

            cy.contains('Número de meses muito alto').should('be.visible');
        });
    });

    describe('Validação - Valor da Prestação', () => {
        it('deve mostrar erro quando valor da prestação não é um número', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');
            cy.get('#valor-prestacao').type('def');

            cy.get('#botao-calcular').click();

            cy.contains('Valor da prestação deve ser um número válido').should('be.visible');
        });

        it('deve mostrar erro quando valor da prestação é zero', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');
            cy.get('#valor-prestacao').type('0');

            cy.get('#botao-calcular').click();

            cy.contains('Valor da prestação deve ser maior que zero').should('be.visible');
        });

        it('deve mostrar erro quando valor da prestação é negativo', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');
            cy.get('#valor-prestacao').type('-100');

            cy.get('#botao-calcular').click();

            cy.contains('Valor da prestação deve ser maior que zero').should('be.visible');
        });
    });
});
