# Tradução de Mensagens de Commit

## Objetivo

Este documento fornece instruções para traduzir as mensagens de commit do repositório que estão em inglês para português brasileiro, mantendo os prefixos convencionais (`docs:`, `feat:`, `ci:`, `ui:`, etc.).

## Mapeamento de Traduções

Abaixo está o mapeamento completo das mensagens que precisam ser traduzidas:

| Mensagem Original (Inglês) | Tradução (Português) |
|----------------------------|----------------------|
| `Initial plan` | `Plano inicial` |
| `ui: adding validation to fields` | `ui: adicionando validação aos campos` |
| `tests: adding more e2e tests to increase coverage and organizing into small set os tests` | `tests: adicionando mais testes e2e para aumentar cobertura e organizando em pequenos conjuntos de testes` |
| `docs: adding github info and sponsor ref` | `docs: adicionando informações do github e referência de patrocinador` |
| `ci: adding github pages configuration` | `ci: adicionando configuração do github pages` |
| `chore: formatting issues after lint` | `chore: problemas de formatação após lint` |
| `docs: lint and format configuration` | `docs: configuração de lint e formatação` |
| `ci: add lint` | `ci: adicionar lint` |
| `initial commit` | `commit inicial` |
| `Initial commit` | `Commit inicial` |

## Opções para Traduzir

### Opção 1: Usando o Script Automático (Recomendado)

1. **Faça backup do seu repositório:**
   ```bash
   git clone https://github.com/dwildt/juros juros-backup
   ```

2. **Execute o script de tradução:**
   ```bash
   cd juros
   ./traduzir-commits.sh
   ```

3. **Verifique as mudanças:**
   ```bash
   git log --oneline
   ```

4. **Force push para o repositório remoto:**
   ```bash
   git push --force-with-lease origin main
   ```

   ⚠️ **Atenção:** Este comando reescreverá o histórico. Todos os colaboradores precisarão fazer re-clone do repositório.

### Opção 2: Rebase Interativo Manual

Se preferir traduzir manualmente ou apenas alguns commits específicos:

1. **Inicie o rebase interativo:**
   ```bash
   git rebase -i --root
   ```

2. **Marque os commits para reword:**
   - Mude `pick` para `reword` nos commits que deseja traduzir
   - Salve e feche o editor

3. **Traduza cada mensagem:**
   - O Git abrirá o editor para cada commit marcado
   - Traduza a mensagem mantendo o prefixo
   - Salve e continue

4. **Force push:**
   ```bash
   git push --force-with-lease origin main
   ```

### Opção 3: Filter-Branch Manual

Para maior controle sobre o processo:

```bash
git filter-branch --msg-filter '
    msg=$(cat)
    # Adicione suas traduções aqui
    echo "$msg" | sed "s/Initial plan/Plano inicial/g" | \
    sed "s/ui: adding validation to fields/ui: adicionando validação aos campos/g" | \
    # ... adicione mais traduções conforme necessário
    cat
' -- --all
```

## Verificação Pós-Tradução

Após traduzir, execute os seguintes comandos para verificar:

```bash
# Ver todas as mensagens de commit
git log --oneline --all

# Verificar que não há mensagens em inglês restantes
git log --oneline --all | grep -E "(adding|configuration|issues|commit)"
```

Se o grep retornar resultados, ainda há mensagens em inglês que podem precisar de tradução.

## Avisos Importantes

⚠️ **IMPORTANTE - Leia antes de executar:**

1. **Backup Obrigatório**: Sempre faça backup antes de reescrever o histórico
2. **Force Push Necessário**: Será necessário usar `--force-with-lease` ou `--force`
3. **Impacto em Colaboradores**: Todos os colaboradores precisarão:
   ```bash
   git fetch origin
   git reset --hard origin/main
   ```
4. **Pull Requests Abertos**: PRs abertos precisarão ser recriados
5. **Não Execute em Repositórios Compartilhados**: Se houver outros colaboradores ativos, coordene com eles primeiro

## Diretrizes para Commits Futuros

Para evitar mensagens em inglês no futuro, consulte:
- [CONTRIBUTING.md](CONTRIBUTING.md) - Diretrizes de contribuição
- `.gitmessage` - Template de mensagem de commit

### Padrão de Mensagens de Commit

```
<tipo>: <descrição em português>

[corpo opcional em português]

[rodapé opcional]
```

**Tipos válidos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Tarefas de manutenção
- `ci`: Integração contínua
- `ui`: Interface do usuário

**Exemplos:**
```
feat: adicionar cálculo de juros compostos
fix: corrigir validação de campos numéricos
docs: atualizar README com instruções de instalação
test: adicionar testes para calculadora de prestações
```

## Reverter Mudanças

Se precisar reverter as traduções:

```bash
# Restaurar do backup
git fetch origin
git reset --hard origin/main

# Ou, se tiver o hash do commit anterior
git reset --hard <hash-commit-anterior>
```

## Suporte

Se encontrar problemas ao traduzir os commits:
1. Verifique se fez backup
2. Consulte a [documentação do Git](https://git-scm.com/docs)
3. Abra uma issue no repositório

---

**Última atualização:** 2025-11-14
