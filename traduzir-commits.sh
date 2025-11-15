#!/bin/bash

# Script para traduzir mensagens de commit do inglês para português
# Este script usa git filter-branch para reescrever o histórico de commits

set -e

echo "=========================================="
echo "Tradução de Mensagens de Commit"
echo "Inglês → Português Brasileiro"
echo "=========================================="
echo ""
echo "⚠️  ATENÇÃO: Este script irá reescrever o histórico do Git!"
echo "⚠️  Certifique-se de fazer backup antes de continuar."
echo "⚠️  Após executar, você precisará fazer force push para atualizar o repositório remoto."
echo ""
read -p "Deseja continuar? (s/N) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo "Operação cancelada."
    exit 1
fi

echo ""
echo "Iniciando tradução das mensagens de commit..."
echo ""

# Suprimir warning do git filter-branch
export FILTER_BRANCH_SQUELCH_WARNING=1

# Função para traduzir mensagens de commit
git filter-branch --msg-filter '
    msg=$(cat)
    
    # Traduzir mensagens específicas (preservando prefixos)
    case "$msg" in
        "Initial plan")
            echo "Plano inicial"
            ;;
        "ui: adding validation to fields")
            echo "ui: adicionando validação aos campos"
            ;;
        "tests: adding more e2e tests to increase coverage and organizing into small set os tests")
            echo "tests: adicionando mais testes e2e para aumentar cobertura e organizando em pequenos conjuntos de testes"
            ;;
        "docs: adding github info and sponsor ref")
            echo "docs: adicionando informações do github e referência de patrocinador"
            ;;
        "ci: adding github pages configuration")
            echo "ci: adicionando configuração do github pages"
            ;;
        "chore: formatting issues after lint")
            echo "chore: problemas de formatação após lint"
            ;;
        "docs: lint and format configuration")
            echo "docs: configuração de lint e formatação"
            ;;
        "ci: add lint")
            echo "ci: adicionar lint"
            ;;
        "initial commit")
            echo "commit inicial"
            ;;
        "Initial commit")
            echo "Commit inicial"
            ;;
        *)
            # Manter mensagem original se não estiver na lista
            echo "$msg"
            ;;
    esac
' -- --all

echo ""
echo "✅ Tradução concluída!"
echo ""
echo "Próximos passos:"
echo "1. Verifique as mudanças com: git log --oneline"
echo "2. Se estiver satisfeito, faça force push: git push --force-with-lease origin <branch>"
echo "3. Se quiser reverter, use: git reset --hard origin/<branch>"
echo ""
echo "⚠️  Lembre-se: Todos os colaboradores precisarão fazer re-clone do repositório!"
echo ""
