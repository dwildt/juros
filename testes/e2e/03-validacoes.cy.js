/**
 * Testes E2E - Validações de Entrada
 */

describe('Validações', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    describe('Validações Gerais', () => {
        it('deve mostrar erro quando menos de 3 campos estão preenchidos', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');

            cy.get('#botao-calcular').click();

            cy.contains('Preencha pelo menos 3 campos para calcular o quarto').should('be.visible');
        });

        it('deve mostrar erro quando todos os campos estão preenchidos', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');
            cy.get('#numero-meses').type('12');
            cy.get('#valor-prestacao').type('888.49');

            cy.get('#botao-calcular').click();

            cy.contains('Deixe um campo vazio para ser calculado').should('be.visible');
        });
    });

    describe('Validação - Valor Financiado', () => {
        it('deve prevenir digitação de caracteres não numéricos', () => {
            cy.get('#valor-financiado').type('abc123def');
            // A formatação em tempo real remove letras, mantendo apenas números
            cy.get('#valor-financiado').should('have.value', '123');
        });

        it('deve mostrar erro quando valor financiado é zero', () => {
            cy.get('#valor-financiado').type('0');
            cy.get('#taxa-juros').type('1');
            cy.get('#numero-meses').type('12');

            cy.get('#botao-calcular').click();

            cy.contains('Valor financiado deve ser maior que zero').should('be.visible');
        });

        it('deve aceitar valores positivos válidos', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');
            cy.get('#numero-meses').type('12');

            cy.get('#botao-calcular').click();

            // Não deve mostrar erro de validação
            cy.contains('deve ser').should('not.exist');
            cy.contains('não pode').should('not.exist');
        });
    });

    describe('Validação - Taxa de Juros', () => {
        it('deve prevenir digitação de caracteres não numéricos', () => {
            cy.get('#taxa-juros').type('xyz5.5abc');
            // A formatação em tempo real remove letras
            cy.get('#taxa-juros').should('have.value', '5,5');
        });

        it('deve mostrar erro quando taxa de juros é maior que 100%', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('150');
            cy.get('#numero-meses').type('12');

            cy.get('#botao-calcular').click();

            cy.contains('Taxa de juros muito alta (máximo 100%)').should('be.visible');
        });

        it('deve aceitar taxas válidas', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1,5');
            cy.get('#numero-meses').type('12');

            cy.get('#botao-calcular').click();

            // Não deve mostrar erro de validação de taxa
            cy.get('#resultados').should('be.visible');
            // Verifica que o cálculo foi feito sem erros
            cy.contains('Resultado do Cálculo').should('be.visible');
        });
    });

    describe('Validação - Número de Meses', () => {
        it('deve prevenir digitação de caracteres não numéricos', () => {
            cy.get('#numero-meses').type('aaa24bbb');
            // A formatação em tempo real remove letras
            cy.get('#numero-meses').should('have.value', '24');
        });

        it('deve mostrar erro quando número de meses é zero', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');
            cy.get('#numero-meses').type('0');

            cy.get('#botao-calcular').click();

            cy.contains('Número de meses deve ser maior que zero').should('be.visible');
        });

        it('deve mostrar erro quando número de meses é muito alto (> 600)', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');
            cy.get('#numero-meses').type('700');

            cy.get('#botao-calcular').click();

            cy.contains('Número de meses muito alto (máximo 600 meses / 50 anos)').should(
                'be.visible'
            );
        });
    });

    describe('Validação - Valor da Prestação', () => {
        it('deve prevenir digitação de caracteres não numéricos', () => {
            cy.get('#valor-prestacao').type('def500abc');
            // A formatação em tempo real remove letras
            cy.get('#valor-prestacao').should('have.value', '500');
        });

        it('deve mostrar erro quando valor da prestação é zero', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');
            cy.get('#valor-prestacao').type('0');

            cy.get('#botao-calcular').click();

            cy.contains('Valor da prestação deve ser maior que zero').should('be.visible');
        });

        it('deve aceitar valores válidos', () => {
            cy.get('#valor-financiado').type('10000');
            cy.get('#taxa-juros').type('1');
            cy.get('#valor-prestacao').type('900');

            cy.get('#botao-calcular').click();

            // Não deve mostrar erro de validação
            cy.contains('deve ser').should('not.exist');
        });
    });
});
