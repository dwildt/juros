# Otimização de Workflows GitHub Actions

**Data**: 2025-11-09
**Autor**: Desenvolvimento com Claude Code
**Status**: Implementado

---

## 📋 Contexto

O projeto utilizava dois workflows separados:
- **`ci.yml`**: Validação em Pull Requests e branches não-main
- **`deploy.yml`**: Deploy para GitHub Pages na branch main

### Problema Identificado

1. **Trunk-Based Development**: O projeto usa desenvolvimento direto na `main`
2. **PRs Raros**: PRs criados apenas ocasionalmente (delegação ao GitHub Copilot)
3. **Uso Ineficiente**: `ci.yml` rodava muito pouco (~2-3 vezes/mês)
4. **Falta de E2E no Deploy**: `deploy.yml` não executava testes E2E (Cypress)
5. **Risco**: Código poderia ir para produção sem validação completa

---

## 🎯 Solução Implementada

### Consolidação em Workflow Único

**Arquivo único**: `.github/workflows/deploy.yml`
**Nome**: "CI/CD - Testes e Deploy"

### Estrutura de Jobs

```
┌─────────────────────────────────────────────────┐
│  Trigger: push main OU pull_request            │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  Job 1: quality                                  │
│  - ESLint                                        │
│  - Prettier format check                         │
│  - Testes unitários (Jest)                       │
│  Tempo: ~2 min                                   │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  Job 2: e2e (needs: quality)                    │
│  - Cypress (36 testes E2E)                       │
│  - Upload screenshots (se falhar)                │
│  - Upload vídeos                                 │
│  Tempo: ~3 min                                   │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  Job 3: deploy (needs: [quality, e2e])          │
│  - Condicional: só em push main                  │
│  - Deploy GitHub Pages                           │
│  Tempo: ~1 min                                   │
└─────────────────────────────────────────────────┘
```

---

## 🔀 Lógica Condicional

### Trigger
```yaml
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  workflow_dispatch:
```

### Jobs Condicionais

| Job | Quando Executa | Condicional |
|-----|----------------|-------------|
| `quality` | **SEMPRE** (PR e push main) | Nenhuma |
| `e2e` | **SEMPRE** (PR e push main) | `needs: quality` |
| `deploy` | **APENAS** push na main | `if: github.event_name == 'push' && github.ref == 'refs/heads/main'` |

---

## 📊 Comportamento por Cenário

### Cenário 1: Pull Request (GitHub Copilot)

```
PR criado/atualizado
    ↓
✅ Job 1: quality (lint + format + testes unitários) - ~2 min
    ↓
✅ Job 2: e2e (Cypress 36 testes) - ~3 min
    ↓
⏭️  Job 3: deploy - SKIP (condicional não satisfeita)
    ↓
✅ PR validado, pronto para merge
```

**Resultado**: PR é completamente validado sem fazer deploy

### Cenário 2: Push Direto na Main (Trunk-Based)

```
Push na main
    ↓
✅ Job 1: quality (lint + format + testes unitários) - ~2 min
    ↓
✅ Job 2: e2e (Cypress 36 testes) - ~3 min
    ↓
✅ Job 3: deploy (GitHub Pages) - ~1 min
    ↓
✅ Deploy concluído em produção
```

**Resultado**: Código validado completamente antes do deploy

---

## 💰 Análise de Custo (GitHub Actions)

### Estimativa de Uso Mensal

| Cenário | Frequência | Tempo/Execução | Total/Mês |
|---------|-----------|----------------|-----------|
| **Push na main** | ~25 | 6 min | 150 min |
| **PRs (Copilot)** | ~2-3 | 5 min | 15 min |
| **Total Estimado** | - | - | **~165 min** |

### Comparação com Free Tier

- **Limite GitHub Free**: 2.000 min/mês
- **Uso Estimado**: 165 min/mês
- **Percentual Usado**: **8,25%**
- **Status**: ✅ Bem dentro do limite

### Comparação Antes vs Depois

| Métrica | Antes (2 workflows) | Depois (1 workflow) |
|---------|---------------------|---------------------|
| Workflows | 2 arquivos | 1 arquivo |
| E2E no deploy | ❌ Não | ✅ Sim |
| Validação em PR | ✅ Sim | ✅ Sim |
| Uso/mês | ~70 min | ~165 min |
| % Free tier | 3,5% | 8,25% |
| Segurança | ⚠️ Parcial | ✅ Total |

---

## ✅ Benefícios da Mudança

### 1. Segurança Aumentada
- ✅ Todo código (PR e push) validado com E2E antes de produção
- ✅ 36 testes E2E (incluindo validações de mensagens de erro)
- ✅ Deploy bloqueado se algum teste falhar

### 2. Simplicidade
- ✅ Um único arquivo de workflow para gerenciar
- ✅ Menos redundância de configuração
- ✅ Manutenção mais fácil

### 3. Flexibilidade
- ✅ Funciona para trunk-based development
- ✅ Funciona para PRs ocasionais
- ✅ Condicional inteligente para deploy

### 4. Custo Eficiente
- ✅ Bem dentro do free tier (8,25%)
- ✅ Espaço para crescimento (91,75% disponível)
- ✅ Sem desperdício (ci.yml rodava pouco)

### 5. Feedback Rápido
- ✅ PRs do Copilot validados antes do merge
- ✅ Problemas detectados antes de produção
- ✅ Screenshots e vídeos em caso de falha

---

## 🔍 Validação de Testes E2E

### Testes Executados (36 testes em 6 arquivos)

| Arquivo | Testes | Cobertura |
|---------|--------|-----------|
| `01-carregamento.cy.js` | 4 | Carregamento da página |
| `02-calculos.cy.js` | 4 | Cálculos financeiros |
| `03-validacoes.cy.js` | 15 | Validações de entrada |
| `04-formulario.cy.js` | 5 | Funcionalidades de formulário |
| `05-temas.cy.js` | 3 | Sistema de temas |
| `06-acessibilidade.cy.js` | 5 | Acessibilidade e responsividade |

### Mensagens de Erro Testadas
- ✅ 15 mensagens de erro validadas (100% de cobertura)
- ✅ Valores inválidos (texto em campos numéricos)
- ✅ Valores negativos e zero
- ✅ Limites superiores (taxa > 100%, meses > 600)

---

## 📝 Arquivos Modificados

### Deletados
- ❌ `.github/workflows/ci.yml`

### Modificados
- ✏️ `.github/workflows/deploy.yml`
  - Adicionado trigger para `pull_request`
  - Reestruturado em 3 jobs: `quality`, `e2e`, `deploy`
  - Adicionado job E2E completo com Cypress
  - Adicionado condicional para deploy apenas em push main

### Criados
- ✅ `tasks/otimizacao-workflows.md` (este documento)

---

## 🚀 Como Usar

### Executar Workflow Manualmente
```bash
# Via GitHub UI
Actions → CI/CD - Testes e Deploy → Run workflow
```

### Testar em PR
```bash
# Criar branch
git checkout -b test/validar-workflow

# Fazer mudança
echo "teste" >> README.md
git add README.md
git commit -m "test: validar workflow"
git push origin test/validar-workflow

# Criar PR no GitHub
# Workflow rodará quality + e2e (sem deploy)
```

### Deploy Direto (Trunk-Based)
```bash
# Na branch main
git add .
git commit -m "feat: nova funcionalidade"
git push origin main

# Workflow rodará quality + e2e + deploy
```

---

## 🔄 Manutenção Futura

### Se Aumentar Frequência de PRs

Se no futuro houver mais PRs (ex: múltiplos desenvolvedores), considere:

**Opção 1**: Manter estrutura atual (recomendado)
- Funciona bem mesmo com muitos PRs
- Valida tudo antes do merge

**Opção 2**: Reativar workflow separado de CI
- Criar novo `ci.yml` específico para PRs
- Manter `deploy.yml` apenas para main
- Útil se houver muitos PRs simultâneos

### Otimizações Possíveis

1. **Cache de dependências**: Adicionar cache do npm
2. **Paralelização**: Rodar `quality` e `e2e` em paralelo (se possível)
3. **Seletividade de testes**: Rodar apenas testes relacionados às mudanças

---

## 📚 Referências

- [GitHub Actions - Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Cypress GitHub Action](https://github.com/cypress-io/github-action)
- [GitHub Pages Deployment](https://github.com/actions/deploy-pages)

---

## ✏️ Changelog

### 2025-11-09 - Implementação Inicial
- Removido `ci.yml`
- Atualizado `deploy.yml` com jobs condicionais
- Adicionado job E2E completo
- Documentação criada
