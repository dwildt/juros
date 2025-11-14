# Configuração do Template de Mensagem de Commit

Este repositório inclui um template de mensagem de commit em português brasileiro para ajudar a manter um padrão consistente.

## Configuração Automática

Execute o seguinte comando na raiz do repositório:

```bash
git config commit.template .gitmessage
```

Isso configurará o template apenas para este repositório.

## Configuração Global

Se você quiser usar este template em todos os seus repositórios:

```bash
git config --global commit.template ~/.gitmessage
cp .gitmessage ~/.gitmessage
```

## Usando o Template

Após configurar, quando você executar `git commit` (sem a flag `-m`), o Git abrirá seu editor com o template pré-preenchido:

```bash
git commit
```

O editor será aberto com:
```
# <tipo>: <descrição curta em português>
# |<----  Máximo 72 caracteres  ---->|

# Corpo da mensagem (opcional)
...
```

## Desconfigurar

Para remover a configuração do template:

```bash
# Apenas para este repositório
git config --unset commit.template

# Para configuração global
git config --global --unset commit.template
```

## Exemplo de Uso

1. Faça suas alterações
2. Adicione ao stage: `git add .`
3. Execute: `git commit`
4. Preencha o template seguindo as diretrizes
5. Salve e feche o editor

## Verificar Configuração

Para verificar se o template está configurado:

```bash
# Configuração local
git config commit.template

# Configuração global
git config --global commit.template
```

## Mais Informações

Consulte [CONTRIBUTING.md](CONTRIBUTING.md) para diretrizes completas sobre mensagens de commit.
