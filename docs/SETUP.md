# Guia de Configuração - SILIC Hands-on Dashboard

## 📋 Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional para desenvolvimento)
- Git (para versionamento)

## 🚀 Configuração Rápida

### 1. Clone o Repositório
```bash
git clone https://github.com/osvaldojeronymo/silic-hands-on.git
cd silic-hands-on
```

### 2. Abrir Localmente
Simplesmente abra o arquivo `index.html` em seu navegador ou use um servidor local:

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (http-server)
npx http-server

# Com PHP
php -S localhost:8000
```

### 3. Acesso via GitHub Pages
O dashboard está disponível online em:
https://osvaldojeronymo.github.io/silic-hands-on/

## 🔧 Configuração de Desenvolvimento

### Estrutura do Projeto
```
silic-hands-on/
├── index.html          # Página principal
├── assets/
│   ├── css/
│   │   └── dashboard.css    # Estilos do dashboard
│   ├── js/
│   │   └── dashboard.js     # Lógica do dashboard
│   └── images/
│       └── logo-caixa.svg   # Logo institucional
├── docs/               # Documentação
├── README.md          # Documentação principal
├── CHANGELOG.md       # Histórico de mudanças
└── deploy.sh         # Script de deploy
```

### Customização

#### Cores e Tema
Edite as variáveis CSS no arquivo `assets/css/dashboard.css`:
```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #ff6600;
    --background-color: #f5f5f5;
    /* ... outras variáveis */
}
```

#### Dados das Demandas
Modifique o array `demandas` no arquivo `assets/js/dashboard.js`:
```javascript
const demandas = [
    {
        id: 1,
        titulo: "Nova Demanda",
        status: "pendente",
        prioridade: "alta",
        // ... outros campos
    }
];
```

## 🔗 Integração com Portal SILIC

O dashboard está integrado com o portal principal através do parâmetro `?from=portal` na URL, permitindo navegação fluida entre os módulos.

### URLs de Integração
- Portal Principal: `https://osvaldojeronymo.github.io/silic-portal-imoveis/`
- Dashboard Hands-on: `https://osvaldojeronymo.github.io/silic-hands-on/`

## 📱 Responsividade

O dashboard é totalmente responsivo e funciona em:
- 🖥️ Desktop (1200px+)
- 💻 Laptop (768px - 1199px)
- 📱 Tablet (481px - 767px)
- 📱 Mobile (até 480px)

## 🎨 Identidade Visual

Segue o padrão institucional da CAIXA:
- Azul institucional: `#0066cc`
- Laranja complementar: `#ff6600`
- Logo oficial incluso
- Tipografia padronizada
