# Como Usar as Ferramentas de Tradução de Commits

Este guia fornece um passo a passo completo para traduzir as mensagens de commit do repositório do inglês para o português brasileiro.

## 📚 Documentação Disponível

Antes de começar, familiarize-se com os seguintes documentos:

1. **[TRADUCAO_COMMITS.md](TRADUCAO_COMMITS.md)** - Guia completo de tradução com mapeamento de mensagens
2. **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guia de contribuição com padrões de commit
3. **[CONFIGURACAO_TEMPLATE_COMMIT.md](CONFIGURACAO_TEMPLATE_COMMIT.md)** - Como configurar o template de commit
4. **traduzir-commits.sh** - Script automatizado de tradução

## 🚀 Início Rápido

### Opção 1: Tradução Automática (Recomendado)

Se você tem permissão para fazer force push no repositório:

```bash
# 1. Faça backup do repositório
cd ..
git clone https://github.com/dwildt/juros juros-backup

# 2. Execute o script de tradução
cd juros
./traduzir-commits.sh

# 3. Verifique as mudanças
git log --oneline | head -20

# 4. Force push para o remoto
git push --force-with-lease origin main
```

### Opção 2: Apenas Configurar para Commits Futuros

Se você não quer reescrever o histórico, mas quer garantir que commits futuros estejam em português:

```bash
# Configure o template de commit
git config commit.template .gitmessage

# Teste criando um commit
git add .
git commit
# O editor abrirá com o template em português
```

## 📋 O Que Cada Arquivo Faz

### traduzir-commits.sh

Script Bash que usa `git filter-branch` para reescrever o histórico de commits, traduzindo automaticamente as mensagens de inglês para português.

**Características:**
- Interativo: pede confirmação antes de executar
- Seguro: orienta a fazer backup
- Automatizado: traduz todas as mensagens de uma vez
- Preserva prefixos: mantém `docs:`, `feat:`, `ci:`, etc.

**Uso:**
```bash
./traduzir-commits.sh
```

### TRADUCAO_COMMITS.md

Documentação completa sobre tradução de commits.

**Conteúdo:**
- Tabela de mapeamento inglês → português
- 3 opções de tradução (automática, manual, filter-branch)
- Instruções passo a passo
- Avisos importantes
- Diretrizes para commits futuros
- Como reverter mudanças

**Quando usar:**
- Referência para traduções manuais
- Entender o processo de tradução
- Troubleshooting

### CONTRIBUTING.md

Guia completo de contribuição para o projeto.

**Conteúdo:**
- Padrão de commits em português (Conventional Commits)
- Tipos de commit com exemplos
- Regras de estilo de código
- Processo de Pull Request
- Como reportar bugs
- Como sugerir funcionalidades
- Estrutura do projeto

**Quando usar:**
- Antes de fazer sua primeira contribuição
- Para entender os padrões do projeto
- Como referência ao criar commits

### .gitmessage

Template de mensagem de commit em português.

**Características:**
- Lembra os tipos de commit disponíveis
- Mostra exemplos de boas mensagens
- Inclui regras e diretrizes
- Formatado para 72 caracteres

**Quando usar:**
- Configure uma vez: `git config commit.template .gitmessage`
- Use sempre que fizer commits: `git commit` (sem `-m`)

### CONFIGURACAO_TEMPLATE_COMMIT.md

Instruções para configurar o template de commit.

**Conteúdo:**
- Como configurar localmente
- Como configurar globalmente
- Como usar o template
- Como desconfigurar
- Como verificar a configuração

**Quando usar:**
- Setup inicial do ambiente
- Ajudar novos contribuidores

## 🔄 Fluxo de Trabalho Recomendado

### Para o Mantenedor do Repositório

1. **Traduzir histórico existente:**
   ```bash
   ./traduzir-commits.sh
   git push --force-with-lease origin main
   ```

2. **Configurar template:**
   ```bash
   git config commit.template .gitmessage
   ```

3. **Comunicar mudanças:**
   - Avisar colaboradores sobre a reescrita do histórico
   - Pedir para fazerem re-clone ou `git fetch && git reset --hard origin/main`

4. **Atualizar documentação:**
   - Já feito! Os arquivos CONTRIBUTING.md e outros já estão prontos

### Para Colaboradores

1. **Após a reescrita do histórico:**
   ```bash
   git fetch origin
   git reset --hard origin/main
   ```

2. **Configurar template:**
   ```bash
   git config commit.template .gitmessage
   ```

3. **Fazer commits em português:**
   ```bash
   git add .
   git commit  # Usa o template
   # OU
   git commit -m "feat: adicionar nova funcionalidade"
   ```

## ⚠️ Avisos Importantes

### Antes de Traduzir o Histórico

- ✅ **SEMPRE** faça backup do repositório
- ✅ **COORDENE** com outros colaboradores
- ✅ **VERIFIQUE** se não há PRs abertos importantes
- ✅ **DOCUMENTE** a mudança (já feito neste PR)

### Após Traduzir o Histórico

- ⚠️ Todos os colaboradores precisarão **re-clonar** ou **resetar** seu repositório local
- ⚠️ Pull Requests abertos precisarão ser **recriados**
- ⚠️ Branches antigas precisarão ser **rebaseadas** ou **recriadas**
- ⚠️ Histórico do GitHub (issues, PRs) com referências a commits usarão os **novos hashes**

### Se Algo Der Errado

```bash
# Restaurar do backup
cd ../juros-backup
git push --force origin main

# Ou, se souber o hash do commit anterior
git reset --hard <hash-antes-da-tradução>
git push --force origin main
```

## 📊 Commits Que Serão Traduzidos

| Hash (antes) | Mensagem Original | Mensagem Traduzida |
|--------------|-------------------|-------------------|
| `2c17826` | Initial plan | Plano inicial |
| `d5f4733` | ui: adding validation to fields | ui: adicionando validação aos campos |
| `2bffe02` | tests: adding more e2e tests... | tests: adicionando mais testes e2e... |
| `be1bb20` | docs: adding github info and sponsor ref | docs: adicionando informações do github... |
| `16a1cbe` | ci: adding github pages configuration | ci: adicionando configuração do github pages |
| `3376a79` | chore: formatting issues after lint | chore: problemas de formatação após lint |
| `a569908` | docs: lint and format configuration | docs: configuração de lint e formatação |
| `03bb454` | ci: add lint | ci: adicionar lint |
| `f76b1d1` | initial commit | commit inicial |
| `5b94441` | Initial commit | Commit inicial |

## 🎯 Resultado Esperado

Após executar o script de tradução:

**Antes:**
```
2c17826 Initial plan
d5f4733 ui: adding validation to fields
be1bb20 docs: adding github info and sponsor ref
```

**Depois:**
```
a1b2c3d Plano inicial
e4f5g6h ui: adicionando validação aos campos
i7j8k9l docs: adicionando informações do github e referência de patrocinador
```

*Nota: Os hashes mudarão porque o histórico foi reescrito*

## 🔍 Verificação

Após traduzir, verifique se todas as mensagens estão em português:

```bash
# Ver todas as mensagens
git log --oneline --all

# Procurar por palavras em inglês comuns
git log --oneline --all | grep -iE "adding|initial|configuration|issues"

# Se o grep retornar resultados vazios, está tudo traduzido! ✅
```

## 💡 Dicas

1. **Use o template**: Configure `git config commit.template .gitmessage` para lembrar do padrão
2. **Seja consistente**: Use sempre o verbo no infinitivo
3. **Seja claro**: Prefira `feat: adicionar validação de CPF` a `feat: melhorias`
4. **Consulte exemplos**: Veja CONTRIBUTING.md para mais exemplos
5. **Execute validações**: Sempre rode `npm run format && npm run lint && npm test` antes de commitar

## 📞 Suporte

Se tiver problemas ou dúvidas:
1. Consulte [TRADUCAO_COMMITS.md](TRADUCAO_COMMITS.md) para detalhes técnicos
2. Veja [CONTRIBUTING.md](CONTRIBUTING.md) para padrões de commit
3. Abra uma issue no repositório

## 📚 Referências

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Filter-Branch](https://git-scm.com/docs/git-filter-branch)
- [Git Rebase](https://git-scm.com/docs/git-rebase)
- [CONTRIBUTING.md](CONTRIBUTING.md)

---

**Última atualização:** 2025-11-14

Desenvolvido para manter o repositório consistente com padrões em português brasileiro.
