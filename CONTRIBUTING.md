# Guia de Contribuição

Obrigado por considerar contribuir com a Calculadora de Financiamento! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Padrão de Commits](#padrão-de-commits)
- [Estilo de Código](#estilo-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Funcionalidades](#sugerir-funcionalidades)

## Código de Conduta

Este projeto adota um código de conduta que esperamos que todos os participantes sigam. Por favor, seja respeitoso e construtivo em todas as interações.

## Como Contribuir

1. **Fork o repositório**
2. **Clone seu fork:**
   ```bash
   git clone https://github.com/seu-usuario/juros.git
   cd juros
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Crie uma branch para sua feature:**
   ```bash
   git checkout -b feat/minha-nova-funcionalidade
   ```

5. **Faça suas alterações seguindo as diretrizes**

6. **Execute os testes e validações:**
   ```bash
   npm run format
   npm run lint
   npm test
   ```

7. **Commit suas mudanças:**
   ```bash
   git add .
   git commit -m "feat: adicionar minha nova funcionalidade"
   ```

8. **Push para seu fork:**
   ```bash
   git push origin feat/minha-nova-funcionalidade
   ```

9. **Abra um Pull Request**

## Padrão de Commits

Este projeto utiliza **Conventional Commits** em **português brasileiro**.

### Formato

```
<tipo>: <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos de Commit

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat: adicionar cálculo de amortização` |
| `fix` | Correção de bug | `fix: corrigir validação de taxa de juros` |
| `docs` | Documentação | `docs: atualizar README com exemplos` |
| `style` | Formatação (sem mudança de código) | `style: formatar código com prettier` |
| `refactor` | Refatoração de código | `refactor: simplificar cálculo de prestação` |
| `test` | Testes | `test: adicionar testes para validação` |
| `chore` | Tarefas de manutenção | `chore: atualizar dependências` |
| `ci` | Integração contínua | `ci: adicionar workflow de testes` |
| `ui` | Interface do usuário | `ui: melhorar layout do formulário` |
| `perf` | Performance | `perf: otimizar cálculos financeiros` |

### Regras Importantes

✅ **FAZER:**
- Escrever mensagens em português brasileiro
- Usar verbo no infinitivo (`adicionar`, `corrigir`, `atualizar`)
- Ser claro e descritivo
- Manter a linha de descrição com até 72 caracteres
- Separar assunto do corpo com linha em branco

❌ **NÃO FAZER:**
- Escrever mensagens em inglês
- Usar verbos conjugados (`adicionado`, `corrigido`)
- Ser vago (`fix: ajustes`, `chore: mudanças`)
- Terminar com ponto final
- Escrever tudo em uma linha se houver múltiplas mudanças

### Exemplos de Boas Mensagens

```bash
# Simples
feat: adicionar modo escuro

# Com corpo explicativo
feat: adicionar validação em tempo real

Implementa validação dos campos de entrada enquanto o usuário
digita, exibindo mensagens de erro instantâneas para melhorar
a experiência do usuário.

# Com breaking change
feat!: alterar estrutura de resposta da API

BREAKING CHANGE: A função calcularPrestacao agora retorna um
objeto com mais propriedades ao invés de apenas o valor numérico.

Antes: calcularPrestacao() => number
Depois: calcularPrestacao() => { valor, juros, amortizacao }

# Múltiplas mudanças relacionadas
refactor: reorganizar estrutura de componentes

- Move componentes para pasta components/
- Renomeia arquivos seguindo padrão kebab-case
- Atualiza imports em todos os arquivos
```

### Exemplos de Más Mensagens

```bash
# ❌ Em inglês
fix: add validation

# ❌ Vago
chore: ajustes

# ❌ Verbo conjugado
feat: adicionado calculadora

# ❌ Muito longo em uma linha
feat: adicionar nova funcionalidade de cálculo de juros compostos com suporte para diferentes períodos de capitalização

# ❌ Com ponto final
docs: atualizar README.

# Correções:
# ✅ fix: adicionar validação
# ✅ chore: formatar código com prettier
# ✅ feat: adicionar calculadora
# ✅ feat: adicionar cálculo de juros compostos
# ✅ docs: atualizar README
```

## Estilo de Código

### Nomenclatura

Todo o código deve usar **português brasileiro**:

```javascript
// ✅ CORRETO
const valorFinanciado = 10000;
const taxaJurosMensal = 0.015;
function calcularPrestacao(valor, taxa, meses) { }

// ❌ INCORRETO
const loanAmount = 10000;
const monthlyRate = 0.015;
function calculatePayment(amount, rate, months) { }
```

### Formatação

O projeto usa **Prettier** e **ESLint**:

```bash
# Formatar código automaticamente
npm run format

# Verificar problemas de lint
npm run lint

# Corrigir problemas automaticamente
npm run lint:fix
```

**Configuração Prettier:**
- Aspas simples
- Ponto e vírgula obrigatório
- Largura de linha: 100 caracteres
- Indentação: 4 espaços
- Trailing comma: none

### Comentários e Documentação

```javascript
/**
 * Calcula o valor da prestação mensal de um financiamento
 * usando o Sistema Price (prestações fixas)
 * 
 * @param {number} valorFinanciado - Valor total a ser financiado em reais
 * @param {number} taxaJurosMensal - Taxa de juros mensal em decimal (ex: 0.015 para 1.5%)
 * @param {number} numeroDeMeses - Quantidade de meses do financiamento
 * @returns {number} Valor da prestação mensal em reais
 * @throws {Error} Se os parâmetros forem inválidos
 * 
 * @example
 * const prestacao = calcularPrestacao(10000, 0.015, 24);
 * console.log(prestacao); // 476.08
 */
function calcularPrestacao(valorFinanciado, taxaJurosMensal, numeroDeMeses) {
    // Validação dos parâmetros
    if (valorFinanciado <= 0 || taxaJurosMensal < 0 || numeroDeMeses <= 0) {
        throw new Error('Parâmetros inválidos');
    }
    
    // Fórmula da Tabela Price
    // P = V * [i * (1 + i)^n] / [(1 + i)^n - 1]
    const fator = Math.pow(1 + taxaJurosMensal, numeroDeMeses);
    const prestacao = valorFinanciado * (taxaJurosMensal * fator) / (fator - 1);
    
    return prestacao;
}
```

## Processo de Pull Request

1. **Certifique-se de que tudo está funcionando:**
   ```bash
   npm run format  # Formatar código
   npm run lint    # Verificar lint
   npm test        # Testes unitários
   npm run cypress:run  # Testes E2E (se aplicável)
   ```

2. **Atualize a documentação** se necessário

3. **Escreva testes** para novas funcionalidades

4. **Crie o PR** com:
   - Título descritivo em português
   - Descrição do que foi feito e por quê
   - Screenshots (para mudanças visuais)
   - Link para issues relacionadas

5. **Aguarde a revisão** e responda aos comentários

### Checklist do PR

- [ ] Código formatado com `npm run format`
- [ ] Sem erros de lint (`npm run lint`)
- [ ] Todos os testes passando (`npm test`)
- [ ] Testes E2E passando (se aplicável)
- [ ] Documentação atualizada
- [ ] Mensagens de commit seguem o padrão
- [ ] Código em português brasileiro
- [ ] Comentários e documentação em português

## Reportar Bugs

Ao reportar bugs, inclua:

1. **Descrição clara** do problema
2. **Passos para reproduzir:**
   - Passo 1
   - Passo 2
   - ...
3. **Comportamento esperado**
4. **Comportamento atual**
5. **Screenshots** (se aplicável)
6. **Ambiente:**
   - Navegador e versão
   - Sistema operacional
   - Versão do Node.js (se relevante)

### Template de Issue para Bug

```markdown
## Descrição do Bug
[Descrição clara e concisa do bug]

## Passos para Reproduzir
1. Vá para '...'
2. Clique em '...'
3. Digite '...'
4. Veja o erro

## Comportamento Esperado
[O que deveria acontecer]

## Comportamento Atual
[O que realmente acontece]

## Screenshots
[Se aplicável, adicione screenshots]

## Ambiente
- Navegador: [ex: Chrome 120]
- OS: [ex: Windows 11]
- Versão Node.js: [ex: 18.0.0]

## Informações Adicionais
[Qualquer outra informação relevante]
```

## Sugerir Funcionalidades

Ao sugerir funcionalidades:

1. **Descreva a funcionalidade** claramente
2. **Explique o problema** que ela resolve
3. **Proponha uma solução** (opcional)
4. **Exemplos de uso** (se aplicável)

### Template de Issue para Funcionalidade

```markdown
## Descrição da Funcionalidade
[Descrição clara e concisa da funcionalidade proposta]

## Problema que Resolve
[Qual problema esta funcionalidade resolve?]

## Solução Proposta
[Como você imagina que funcione?]

## Alternativas Consideradas
[Outras soluções que você considerou]

## Exemplos de Uso
[Exemplos de como seria usado]

## Informações Adicionais
[Qualquer outra informação relevante]
```

## Estrutura do Projeto

```
juros/
├── src/
│   ├── componentes/      # Componentes (Atomic Design)
│   │   ├── atomos/       # Elementos básicos
│   │   ├── moleculas/    # Combinações simples
│   │   ├── organismos/   # Componentes complexos
│   │   ├── templates/    # Layouts
│   │   └── paginas/      # Páginas completas
│   ├── estilos/          # CSS e temas
│   ├── utils/            # Funções utilitárias
│   └── index.html        # Página principal
├── testes/
│   ├── unitarios/        # Testes Jest
│   └── e2e/              # Testes Cypress
├── documentos/           # Documentação
└── tarefas/              # Histórico de tarefas
```

## Recursos Úteis

- [Documentação do Projeto](README.md)
- [Configurações do Projeto](claude.md)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [Sistema Price](https://pt.wikipedia.org/wiki/Tabela_Price)

## Dúvidas?

Se tiver dúvidas sobre como contribuir:
1. Leia a documentação completa no [README.md](README.md)
2. Verifique as [issues abertas](https://github.com/dwildt/juros/issues)
3. Abra uma issue com sua dúvida

---

**Agradecemos sua contribuição! 🎉**

Desenvolvido com dedicação para aprender e compartilhar conhecimento.
