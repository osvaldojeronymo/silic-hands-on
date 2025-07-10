# 📋 Instruções para Criar o Repositório no GitHub

## 🌐 Passo 1: Criar Repositório no GitHub

1. **Acesse:** https://github.com/new
2. **Preencha os dados:**
   - Repository name: `silic-hands-on`
   - Description: `🎯 Dashboard Hands-on SILIC 2.0 - Interface para agentes operacionais da CAIXA`
   - Visibilidade: ✅ Public
   - ❌ **NÃO** marque "Add a README file"
   - ❌ **NÃO** marque "Add .gitignore"
   - ❌ **NÃO** marque "Choose a license"

3. **Clique:** "Create repository"

## 🚀 Passo 2: Fazer Push do Código

Após criar o repositório, execute:

```bash
cd /home/osvaldo/Área\ de\ Trabalho/Prototipos/CAIXA/silic-hands-on
git push -u origin main
```

## 🌟 Passo 3: Ativar GitHub Pages

1. **Acesse:** https://github.com/osvaldojeronymo/silic-hands-on/settings/pages
2. **Em "Source":** selecione "Deploy from a branch"
3. **Em "Branch":** selecione "main" e "/ (root)"
4. **Clique:** "Save"

## 🎉 URLs Finais

Após a configuração:
- **Repositório:** https://github.com/osvaldojeronymo/silic-hands-on
- **Site:** https://osvaldojeronymo.github.io/silic-hands-on/

## 🔄 Deploy Automático

Use o script para futuros deploys:
```bash
./deploy.sh
```

## 🔗 Integração com Portal

Atualize o portal principal para incluir o link correto:
```javascript
// No arquivo portal.js, atualizar a URL do card do dashboard
dashboardCard.onclick = () => {
    window.open('https://osvaldojeronymo.github.io/silic-hands-on/?from=portal', '_blank');
};
```
