#!/bin/bash

# Script de Deploy - SILIC Hands-on Dashboard
# Este script automatiza o processo de deploy no GitHub Pages

echo "🚀 Iniciando deploy do SILIC Hands-on Dashboard..."

# Verificar se estamos no diretório correto
if [ ! -f "index.html" ]; then
    echo "❌ Erro: index.html não encontrado. Execute este script no diretório raiz do projeto."
    exit 1
fi

# Verificar se há mudanças para commit
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Adicionando arquivos modificados..."
    git add .
    
    # Solicitar mensagem de commit
    read -p "💬 Digite a mensagem do commit: " commit_message
    if [ -z "$commit_message" ]; then
        commit_message="Deploy automático - $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    
    echo "💾 Fazendo commit das mudanças..."
    git commit -m "$commit_message"
else
    echo "ℹ️ Nenhuma mudança detectada para commit."
fi

# Push para o repositório remoto
echo "📤 Enviando para o GitHub..."
git push origin main

# Verificar se o push foi bem-sucedido
if [ $? -eq 0 ]; then
    echo "✅ Deploy realizado com sucesso!"
    echo "🌐 O site estará disponível em: https://osvaldojeronymo.github.io/silic-hands-on/"
    echo "⏱️ Aguarde alguns minutos para que as alterações sejam refletidas."
else
    echo "❌ Erro no deploy. Verifique as configurações do repositório."
    exit 1
fi

echo "🎉 Deploy concluído!"
