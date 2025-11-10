/**
 * Testes E2E - Calculadora de Financiamento
 */

describe('Calculadora de Financiamento', () => {
    beforeEach(() => {
        cy.visit('/src/index.html');
    });

    describe('Carregamento da Página', () => {
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
            cy.get('#toggle-modo-escuro').should('be.visible');
        });
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

    describe('Validações', () => {
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

    describe('Validação - Edge Cases', () => {
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

    describe('Troca de Temas', () => {
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
