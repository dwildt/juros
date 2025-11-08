# Calculadora de Financiamento - Configurações do Projeto

## Visão Geral
Calculadora de financiamento com prestações fixas, inspirada na calculadora do Banco Central do Brasil. Desenvolvida em JavaScript Vanilla para funcionar no GitHub Pages.

## Stack Tecnológico
- **Frontend**: JavaScript Vanilla, HTML5, CSS3
- **Testes Unitários**: Jest
- **Testes E2E**: Cypress
- **Deploy**: GitHub Pages
- **Servidor Local**: npx serve / npx http-server

## Arquitetura - Atomic Design

### Estrutura de Componentes
```
src/
├── componentes/
│   ├── atomos/          # Elementos básicos (botão, input, label, ícone)
│   ├── moleculas/       # Combinações simples (campo-formulario, cartao-resultado)
│   ├── organismos/      # Componentes complexos (formulario-calculadora, painel-resultados)
│   ├── templates/       # Layouts de página
│   └── paginas/         # Páginas completas
├── estilos/
│   ├── variaveis.css    # Variáveis de tema e cores
│   ├── temas/           # Temas específicos (azul, verde, laranja, roxo)
│   ├── base.css         # Estilos base e reset
│   └── dark-mode.css    # Estilos do modo escuro
├── utils/
│   ├── calculos.js      # Funções de cálculo financeiro
│   ├── validacao.js     # Validação de formulários
│   └── formatacao.js    # Formatação de números e moeda
└── index.html

testes/
├── unitarios/           # Testes Jest
│   ├── calculos.test.js
│   ├── validacao.test.js
│   └── formatacao.test.js
└── e2e/                 # Testes Cypress
    └── calculadora.cy.js

documentos/              # Documentação adicional
tasks/                   # Histórico de tarefas e prompts
```

## Sistema de Temas

### Cores Base
- **Azul**: `#0066CC` (primária), `#004C99` (escura), `#3385D6` (clara)
- **Verde**: `#00A86B` (primária), `#007A4D` (escura), `#33B685` (clara)
- **Laranja**: `#FF8C00` (primária), `#CC7000` (escura), `#FFA333` (clara)
- **Roxo**: `#7B3294` (primária), `#5A2470` (escura), `#9552A8` (clara)

### Modo Escuro
- Fundo: `#1E1E1E`
- Texto: `#E0E0E0`
- Superfície: `#2D2D2D`
- Contraste preservado para acessibilidade

## Funcionalidades da Calculadora

### Cálculos Disponíveis
1. **Calcular Número de Meses (Prazo)**
   - Entrada: valor financiado, taxa de juros, valor da prestação
   - Saída: número de meses necessários

2. **Calcular Taxa de Juros Mensal**
   - Entrada: valor financiado, número de meses, valor da prestação
   - Saída: taxa de juros mensal (%)

3. **Calcular Valor da Prestação**
   - Entrada: valor financiado, taxa de juros, número de meses
   - Saída: valor da prestação fixa

4. **Calcular Valor Financiado Total**
   - Entrada: valor da prestação, taxa de juros, número de meses
   - Saída: valor total financiado

### Fórmulas Utilizadas
- Sistema de Amortização: Tabela Price (prestações fixas)
- Fórmula da prestação: `P = V * [i * (1 + i)^n] / [(1 + i)^n - 1]`
  - P = valor da prestação
  - V = valor financiado
  - i = taxa de juros mensal (decimal)
  - n = número de meses

## Convenções de Código

### Nomenclatura (Português Brasileiro)
```javascript
// Variáveis
const valorFinanciado = 10000;
const taxaJurosMensal = 0.015;
const numeroDeMeses = 24;

// Funções
function calcularPrestacao(valor, taxa, meses) { }
function validarCampoNumerico(valor) { }
function formatarMoeda(valor) { }

// Classes
class CalculadoraFinanciamento { }
class GerenciadorTemas { }
```

### Comentários e Documentação
```javascript
/**
 * Calcula o valor da prestação mensal de um financiamento
 * @param {number} valorFinanciado - Valor total a ser financiado
 * @param {number} taxaJurosMensal - Taxa de juros mensal em decimal (ex: 0.015 para 1.5%)
 * @param {number} numeroDeMeses - Quantidade de meses do financiamento
 * @returns {number} Valor da prestação mensal
 */
```

## Qualidade de Código

### ESLint
Configuração para análise estática de código JavaScript:
- Regras padrão do ESLint
- Plugin para Jest (testes unitários)
- Plugin para Cypress (testes E2E)
- Integração com Prettier para evitar conflitos
- Regras personalizadas para o projeto

### Prettier
Formatação automática e consistente:
- Single quotes para strings
- Semicolons obrigatórios
- Tab width: 2 espaços
- Line ending: LF (Unix)
- Trailing comma: none
- Print width: 100 caracteres

### Scripts de Qualidade
```bash
npm run lint          # Verificar problemas
npm run lint:fix      # Corrigir automaticamente
npm run format        # Formatar código
npm run format:check  # Verificar formatação
```

## Configuração de Testes

### Jest (Testes Unitários)
```json
{
  "testEnvironment": "jsdom",
  "collectCoverage": true,
  "coverageDirectory": "cobertura",
  "testMatch": ["**/testes/unitarios/**/*.test.js"]
}
```

### Cypress (Testes E2E)
```javascript
{
  "baseUrl": "http://localhost:3000",
  "e2e": {
    "specPattern": "testes/e2e/**/*.cy.js"
  }
}
```

## Scripts NPM

```json
{
  "scripts": {
    "start": "npx serve .",
    "dev": "npx http-server -p 3000",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "cypress": "cypress open",
    "cypress:run": "cypress run"
  }
}
```

## Boas Práticas

### Acessibilidade
- Labels em todos os inputs
- Atributos ARIA adequados
- Contraste mínimo de 4.5:1
- Navegação por teclado
- Mensagens de erro descritivas

### Performance
- CSS e JS minificados para produção
- Lazy loading quando aplicável
- Otimização de imagens
- Cache de cálculos quando possível

### Compatibilidade
- Navegadores modernos (últimas 2 versões)
- Mobile-first design
- Progressive Enhancement

## Referências
- Calculadora do Banco Central: https://www3.bcb.gov.br/CALCIDADAO/
- Atomic Design: https://bradfrost.com/blog/post/atomic-web-design/
- Sistema Price: Matemática Financeira padrão
