# Calculadora de Financiamento

Calculadora de financiamento com prestações fixas (Sistema Price), inspirada na calculadora do Banco Central do Brasil. Desenvolvida em JavaScript Vanilla para funcionar no GitHub Pages.

## Funcionalidades

A calculadora permite calcular qualquer uma das quatro variáveis de um financiamento:

- **Número de Meses (Prazo)**: Descubra em quantos meses você quitará o financiamento
- **Taxa de Juros Mensal**: Calcule a taxa de juros do seu financiamento
- **Valor da Prestação**: Saiba quanto pagará mensalmente
- **Valor Financiado**: Determine o valor total que pode ser financiado

### Recursos Adicionais

- Seletor de temas com 4 cores: Azul, Verde, Laranja e Roxo
- Modo escuro (Dark Mode) para melhor conforto visual
- Interface responsiva e acessível
- Validação de formulários em tempo real
- Formatação automática de valores monetários

## Pré-requisitos

Para executar o projeto localmente, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- npm (geralmente vem com o Node.js)

Para verificar se você já tem instalado:

```bash
node --version
npm --version
```

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/juros.git
cd juros
```

2. Instale as dependências:

```bash
npm install
```

## Como Executar Localmente

### Opção 1: Usando serve (Recomendado)

```bash
npm start
```

O projeto estará disponível em `http://localhost:3000`

### Opção 2: Usando http-server

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

### Opção 3: Usando npx diretamente (sem instalar)

```bash
npx serve .
```

ou

```bash
npx http-server -p 3000
```

## Executar Testes

### Testes Unitários (Jest)

Executar todos os testes:

```bash
npm test
```

Executar testes em modo watch (desenvolvimento):

```bash
npm run test:watch
```

Executar testes com cobertura:

```bash
npm run test:coverage
```

### Testes E2E (Cypress)

Abrir interface do Cypress:

```bash
npm run cypress
```

Executar testes em modo headless:

```bash
npm run cypress:run
```

## Qualidade de Código

### Lint (ESLint)

Verificar problemas no código:

```bash
npm run lint
```

Corrigir problemas automaticamente:

```bash
npm run lint:fix
```

### Formatação (Prettier)

Formatar código:

```bash
npm run format
```

Verificar formatação sem modificar:

```bash
npm run format:check
```

## Estrutura do Projeto

O projeto segue o padrão **Atomic Design** para organização de componentes:

```
juros/
├── src/
│   ├── componentes/
│   │   ├── atomos/          # Botões, inputs, labels, ícones
│   │   ├── moleculas/       # Campos de formulário, cards
│   │   ├── organismos/      # Formulário completo, painel de resultados
│   │   ├── templates/       # Layouts de página
│   │   └── paginas/         # Página principal da calculadora
│   ├── estilos/
│   │   ├── variaveis.css    # Variáveis de tema e cores
│   │   ├── temas/           # Temas: azul, verde, laranja, roxo
│   │   ├── base.css         # Estilos base e reset
│   │   └── dark-mode.css    # Estilos do modo escuro
│   ├── utils/
│   │   ├── calculos.js      # Cálculos financeiros (Sistema Price)
│   │   ├── validacao.js     # Validação de formulários
│   │   └── formatacao.js    # Formatação de moeda e números
│   └── index.html           # Página principal
├── testes/
│   ├── unitarios/           # Testes Jest
│   └── e2e/                 # Testes Cypress
├── documentos/              # Documentação adicional
├── tasks/                   # Histórico de tarefas
├── claude.md                # Configurações do projeto
├── README.md                # Este arquivo
├── package.json             # Dependências e scripts
├── jest.config.js           # Configuração do Jest
└── cypress.config.js        # Configuração do Cypress
```

## Temas e Personalização

A aplicação oferece 4 temas de cores:

- **Azul** (padrão): Tom profissional e confiável
- **Verde**: Tom natural e positivo
- **Laranja**: Tom vibrante e energético
- **Roxo**: Tom criativo e moderno

Cada tema possui modo claro e escuro, totalizando 8 combinações visuais.

## Tecnologias Utilizadas

- **JavaScript Vanilla**: Sem frameworks, máxima compatibilidade
- **HTML5**: Marcação semântica
- **CSS3**: Variáveis CSS, Grid, Flexbox
- **Jest**: Testes unitários
- **Cypress**: Testes end-to-end
- **ESLint**: Análise estática de código
- **Prettier**: Formatação automática de código
- **GitHub Pages**: Hospedagem gratuita

## CI/CD e Deploy

### Integração Contínua (CI)

O projeto utiliza GitHub Actions para CI/CD automático:

**Pull Requests e Branches:**
- Executa lint (ESLint)
- Verifica formatação (Prettier)
- Roda testes unitários (Jest) com cobertura
- Executa testes E2E (Cypress)
- Upload de artefatos em caso de falha

**Branch Main:**
- Executa todas as verificações de CI
- Deploy automático para GitHub Pages
- Publicação da aplicação

### Deploy no GitHub Pages

**Configuração Inicial:**

1. Vá em **Settings** > **Pages** do repositório
2. Em **Source**, selecione **GitHub Actions**
3. O deploy será feito automaticamente a cada push na branch `main`

**Deploy Automático:**
- Cada push na `main` dispara o workflow de deploy
- Testes e lint são executados antes do deploy
- Se tudo passar, a aplicação é publicada automaticamente

**Deploy Manual:**
- Acesse a aba **Actions** no GitHub
- Selecione o workflow "Deploy to GitHub Pages"
- Clique em "Run workflow"

**URL da Aplicação:**
`https://seu-usuario.github.io/juros/`

### Badges

Adicione ao README para mostrar status:

```markdown
![CI](https://github.com/seu-usuario/juros/workflows/CI%20-%20Integração%20Contínua/badge.svg)
![Deploy](https://github.com/seu-usuario/juros/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)
```

## Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Padrões de Código

- Nomes de variáveis e funções em português brasileiro
- Comentários e documentação em português
- Seguir convenções do Atomic Design
- Escrever testes para novas funcionalidades
- Manter cobertura de testes acima de 80%
- Executar `npm run lint:fix` antes de commitar
- Executar `npm run format` para formatar o código
- Todos os testes devem passar: `npm test`

## Referências

- [Calculadora do Banco Central](https://www3.bcb.gov.br/CALCIDADAO/publico/exibirFormFinanciamentoPrestacoesFixas.do?method=exibirFormFinanciamentoPrestacoesFixas)
- [Sistema Price - Tabela Price](https://pt.wikipedia.org/wiki/Tabela_Price)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

## Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## Autor

Desenvolvido como parte do desafio #100DaysOfCode

---

Feito com dedicação para aprender e compartilhar conhecimento
