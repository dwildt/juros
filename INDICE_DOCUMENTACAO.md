# 📝 Índice de Documentação - Tradução de Commits

Este diretório contém toda a documentação e ferramentas necessárias para traduzir mensagens de commit do inglês para português brasileiro.

## 📚 Documentos Disponíveis

### 1. [GUIA_USO_FERRAMENTAS.md](GUIA_USO_FERRAMENTAS.md) - **COMECE AQUI** 🎯
**Guia completo e resumido de como usar todas as ferramentas**

- Visão geral de todos os documentos
- Início rápido com opções de tradução
- Explicação do que cada arquivo faz
- Fluxo de trabalho recomendado
- Avisos importantes
- Tabela de commits a serem traduzidos
- Dicas e suporte

👉 **Este é o melhor ponto de partida!**

---

### 2. [TRADUCAO_COMMITS.md](TRADUCAO_COMMITS.md)
**Documentação técnica detalhada sobre tradução**

- Mapeamento completo de traduções (inglês → português)
- 3 métodos de tradução:
  - Script automático (recomendado)
  - Rebase interativo manual
  - Filter-branch manual
- Verificação pós-tradução
- Avisos e precauções
- Diretrizes para commits futuros
- Como reverter mudanças

📖 **Use para:** Referência técnica e troubleshooting

---

### 3. [CONTRIBUTING.md](CONTRIBUTING.md)
**Guia completo de contribuição para o projeto**

- Código de conduta
- Como contribuir (passo a passo)
- **Padrão de commits em português** (Conventional Commits)
- Tipos de commit com exemplos
- Regras e boas práticas
- Estilo de código e nomenclatura
- Processo de Pull Request
- Como reportar bugs
- Como sugerir funcionalidades
- Estrutura do projeto

✍️ **Use para:** Aprender os padrões de commit do projeto

---

### 4. [.gitmessage](.gitmessage)
**Template de mensagem de commit em português**

- Template pré-formatado para commits
- Lista de tipos de commit
- Exemplos de boas mensagens
- Regras e diretrizes inline
- Limite de caracteres visual

⚙️ **Use com:** `git config commit.template .gitmessage`

---

### 5. [CONFIGURACAO_TEMPLATE_COMMIT.md](CONFIGURACAO_TEMPLATE_COMMIT.md)
**Instruções para configurar o template**

- Configuração local (apenas este repositório)
- Configuração global (todos os repositórios)
- Como usar o template
- Como desconfigurar
- Como verificar a configuração

🔧 **Use para:** Setup inicial do ambiente

---

### 6. [traduzir-commits.sh](traduzir-commits.sh)
**Script automatizado de tradução**

- Script Bash interativo
- Traduz automaticamente todos os commits
- Pede confirmação antes de executar
- Fornece instruções de próximos passos
- Seguro com avisos de backup

🚀 **Execute:** `./traduzir-commits.sh`

---

## 🎯 Fluxo Recomendado

### Para Traduzir o Histórico

1. **Leia primeiro:** [GUIA_USO_FERRAMENTAS.md](GUIA_USO_FERRAMENTAS.md)
2. **Faça backup** do repositório
3. **Execute:** `./traduzir-commits.sh`
4. **Verifique:** `git log --oneline`
5. **Push:** `git push --force-with-lease origin main`
6. **Consulte:** [TRADUCAO_COMMITS.md](TRADUCAO_COMMITS.md) se houver problemas

### Para Contribuir com Commits em Português

1. **Configure o template:**
   ```bash
   git config commit.template .gitmessage
   ```
   Veja: [CONFIGURACAO_TEMPLATE_COMMIT.md](CONFIGURACAO_TEMPLATE_COMMIT.md)

2. **Leia as diretrizes:**
   [CONTRIBUTING.md](CONTRIBUTING.md) - Seção "Padrão de Commits"

3. **Faça commits:**
   ```bash
   git commit  # Usa o template
   # OU
   git commit -m "feat: adicionar nova funcionalidade"
   ```

## 📋 Quick Reference

### Tipos de Commit (em português)

| Tipo | Uso | Exemplo |
|------|-----|---------|
| `feat` | Nova funcionalidade | `feat: adicionar cálculo de juros` |
| `fix` | Correção de bug | `fix: corrigir validação` |
| `docs` | Documentação | `docs: atualizar README` |
| `style` | Formatação | `style: formatar com prettier` |
| `refactor` | Refatoração | `refactor: simplificar lógica` |
| `test` | Testes | `test: adicionar testes unitários` |
| `chore` | Manutenção | `chore: atualizar dependências` |
| `ci` | CI/CD | `ci: adicionar workflow` |
| `ui` | Interface | `ui: melhorar layout` |
| `perf` | Performance | `perf: otimizar cálculos` |

### Regras Importantes

✅ **FAZER:**
- Usar português brasileiro
- Verbo no infinitivo
- Ser claro e descritivo
- Máximo 72 caracteres na primeira linha

❌ **NÃO FAZER:**
- Usar inglês
- Verbos conjugados (adicionado ❌, adicionar ✅)
- Ser vago
- Terminar com ponto final

## 🔗 Links Úteis

- [Conventional Commits](https://www.conventionalcommits.org/) - Especificação
- [README.md](README.md) - Documentação principal do projeto
- [claude.md](claude.md) - Configurações do projeto

## ❓ Dúvidas?

1. **Início rápido?** → [GUIA_USO_FERRAMENTAS.md](GUIA_USO_FERRAMENTAS.md)
2. **Como traduzir histórico?** → [TRADUCAO_COMMITS.md](TRADUCAO_COMMITS.md)
3. **Padrão de commits?** → [CONTRIBUTING.md](CONTRIBUTING.md)
4. **Configurar template?** → [CONFIGURACAO_TEMPLATE_COMMIT.md](CONFIGURACAO_TEMPLATE_COMMIT.md)
5. **Script não funciona?** → Veja seção "Troubleshooting" em [TRADUCAO_COMMITS.md](TRADUCAO_COMMITS.md)

## 📊 Status

- ✅ Script de tradução testado e funcionando
- ✅ Documentação completa
- ✅ Template de commit configurado
- ✅ Guia de contribuição atualizado
- ✅ Mapeamento de traduções completo
- ✅ Todos os testes passando

---

**Última atualização:** 2025-11-14

**Desenvolvido para manter o repositório consistente com padrões em português brasileiro.**
