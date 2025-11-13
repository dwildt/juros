# Prompt Inicial - Calculadora de Financiamento

## Data
7 de novembro de 2025

## Contexto
Projeto criado como parte do desafio #100DaysOfCode

## Requisitos Iniciais

### Objetivo do Projeto
Criar uma calculadora de financiamento com prestações fixas (Sistema Price), inspirada na calculadora do Banco Central do Brasil, que funcione no GitHub Pages.

### Tecnologias Especificadas

#### Stack Principal
- **JavaScript Vanilla**: Sem uso de frameworks para garantir compatibilidade com GitHub Pages
- **HTML5**: Marcação semântica
- **CSS3**: Estilos modernos com variáveis CSS

#### Testes
- **Jest**: Para testes unitários
- **Cypress**: Para testes end-to-end (E2E)

#### Deploy
- **GitHub Pages**: Hospedagem gratuita e integração com Git

### Funcionalidades Requeridas

#### Calculadora de Financiamento
Baseada na calculadora do Banco Central do Brasil, disponível em:
https://www3.bcb.gov.br/CALCIDADAO/publico/exibirFormFinanciamentoPrestacoesFixas.do?method=exibirFormFinanciamentoPrestacoesFixas

A calculadora deve permitir calcular qualquer uma das 4 variáveis:

1. **Número de Meses (Prazo)**
   - Entrada: valor financiado, taxa de juros mensal, valor da prestação
   - Saída: quantidade de meses necessários para quitar

2. **Taxa de Juros Mensal**
   - Entrada: valor financiado, número de meses, valor da prestação
   - Saída: taxa de juros mensal aplicada

3. **Valor da Prestação**
   - Entrada: valor financiado, taxa de juros mensal, número de meses
   - Saída: valor fixo de cada prestação

4. **Valor Financiado Total**
   - Entrada: valor da prestação, taxa de juros mensal, número de meses
   - Saída: valor total que pode ser financiado

#### Sistema de Temas

**Cores Base (4 opções):**
- Azul
- Verde
- Laranja
- Roxo

**Modos:**
- Modo claro (fundo branco)
- Dark mode (modo escuro)

**Total de combinações:** 8 temas diferentes (4 cores × 2 modos)

### Requisitos de Idioma

**IMPORTANTE:** Todo o projeto deve ser em português brasileiro:
- Nomes de variáveis em português
- Nomes de funções em português
- Comentários em português
- Documentação em português
- Interface do usuário em português

### Estrutura de Arquitetura

**Atomic Design** para organização de componentes:
- **Átomos**: Elementos básicos (botões, inputs, labels, ícones)
- **Moléculas**: Combinações simples (campo de formulário, card de resultado)
- **Organismos**: Componentes complexos (formulário completo, painel de resultados)
- **Templates**: Layouts de página
- **Páginas**: Página completa da calculadora

### Servidor Local
Para execução local, usar **npx** sem necessidade de instalação global:
- `npx serve .`
- `npx http-server -p 3000`

### Documentação Requerida

#### README.md
Deve conter:
- Descrição do projeto
- Pré-requisitos (Node.js, npm)
- Como instalar dependências
- Como executar localmente (usando npx)
- Como rodar testes (Jest e Cypress)
- Estrutura do projeto
- Tecnologias utilizadas
- Como fazer deploy

#### claude.md
Arquivo de configuração do projeto com:
- Visão geral do projeto
- Stack tecnológico
- Arquitetura (Atomic Design)
- Sistema de temas
- Funcionalidades da calculadora
- Convenções de código (português brasileiro)
- Configuração de testes
- Scripts NPM
- Boas práticas

#### tasks/prompt-inicial.md
Este arquivo - documentando todo o contexto inicial da criação do projeto.

## Análise da Calculadora de Referência

### Interface da Calculadora do BC
- Formulário com 4 campos de entrada
- Cada campo pode ser deixado em branco para ser calculado
- Botões: "Calcular", "Limpar", "Metodologia"
- Breadcrumb de navegação
- Área de resultados mostrando valores calculados
- Exemplos práticos com 4 cenários

### Cálculos Utilizados
Sistema de Amortização: **Tabela Price** (prestações fixas)

**Fórmula principal:**
```
P = V * [i * (1 + i)^n] / [(1 + i)^n - 1]
```

Onde:
- P = valor da prestação
- V = valor financiado
- i = taxa de juros mensal (em decimal, ex: 0.015 para 1.5%)
- n = número de meses

## Decisões de Design

### Estrutura de Pastas
```
juros/
├── src/
│   ├── componentes/
│   │   ├── atomos/
│   │   ├── moleculas/
│   │   ├── organismos/
│   │   ├── templates/
│   │   └── paginas/
│   ├── estilos/
│   │   ├── variaveis.css
│   │   ├── temas/
│   │   ├── base.css
│   │   └── dark-mode.css
│   ├── utils/
│   │   ├── calculos.js
│   │   ├── validacao.js
│   │   └── formatacao.js
│   └── index.html
├── testes/
│   ├── unitarios/
│   └── e2e/
├── documentos/
├── tasks/
├── claude.md
├── README.md
├── package.json
├── jest.config.js
└── cypress.config.js
```

### Convenções de Nomenclatura

**Variáveis em português:**
```javascript
const valorFinanciado = 10000;
const taxaJurosMensal = 0.015;
const numeroDeMeses = 24;
```

**Funções em português:**
```javascript
function calcularPrestacao(valor, taxa, meses) { }
function validarCampoNumerico(valor) { }
function formatarMoeda(valor) { }
```

**Classes em português:**
```javascript
class CalculadoraFinanciamento { }
class GerenciadorTemas { }
```

## Próximos Passos Sugeridos

1. Criar estrutura básica de pastas
2. Configurar package.json com dependências
3. Configurar Jest e Cypress
4. Criar arquivos base de HTML/CSS
5. Implementar sistema de temas
6. Desenvolver componentes atômicos
7. Implementar lógica de cálculos financeiros
8. Criar testes unitários
9. Criar testes E2E
10. Configurar GitHub Pages

## Referências

- Calculadora do Banco Central: https://www3.bcb.gov.br/CALCIDADAO/
- Atomic Design: https://bradfrost.com/blog/post/atomic-web-design/
- Sistema Price: Matemática Financeira (Prestações Fixas)
- Jest: https://jestjs.io/
- Cypress: https://www.cypress.io/

## Notas Adicionais

- Projeto deve ser totalmente funcional sem necessidade de build
- JavaScript puro (ES6+) sem transpilação
- CSS moderno com variáveis e grid/flexbox
- Acessibilidade (WCAG 2.1)
- Responsividade (mobile-first)
- Performance otimizada para GitHub Pages
