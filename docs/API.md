# Documentação da API - SILIC Dashboard Técnico

## 📡 Endpoints Futuros

Esta documentação serve como base para futuras integrações com APIs reais.

### Base URL
```
https://api.silic.caixa.gov.br/v1/
```

### Autenticação
Todas as requisições devem incluir o token de autenticação no header:
```
Authorization: Bearer {token}
```

## 🎯 Endpoints do Dashboard

### 1. Buscar Demandas
```http
GET /dashboard/demandas
```

**Parâmetros de Query:**
- `status` (string): Filtrar por status (pendente, andamento, concluida, cancelada)
- `prioridade` (string): Filtrar por prioridade (baixa, media, alta, critica)
- `tipo` (string): Filtrar por tipo de demanda
- `data_inicio` (date): Data inicial para filtro
- `data_fim` (date): Data final para filtro
- `page` (number): Página para paginação
- `limit` (number): Limite de resultados por página

**Resposta:**
```json
{
  "data": [
    {
      "id": 1,
      "titulo": "Análise de Documentação - Imóvel 12345",
      "descricao": "Verificação de documentos para aprovação",
      "status": "pendente",
      "prioridade": "alta",
      "tipo": "documentacao",
      "agente_responsavel": "João Silva",
      "data_criacao": "2024-07-10T08:00:00Z",
      "data_vencimento": "2024-07-15T18:00:00Z",
      "cliente": {
        "nome": "Maria Santos",
        "cpf": "123.456.789-00",
        "contato": "(11) 99999-9999"
      },
      "imovel": {
        "codigo": "IMV-12345",
        "endereco": "Rua das Flores, 123",
        "cidade": "São Paulo",
        "estado": "SP"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

### 2. Buscar Demanda Específica
```http
GET /dashboard/demandas/{id}
```

**Resposta:**
```json
{
  "data": {
    "id": 1,
    "titulo": "Análise de Documentação - Imóvel 12345",
    "descricao": "Verificação completa de documentos...",
    "status": "pendente",
    "prioridade": "alta",
    "tipo": "documentacao",
    "agente_responsavel": "João Silva",
    "data_criacao": "2024-07-10T08:00:00Z",
    "data_vencimento": "2024-07-15T18:00:00Z",
    "historico": [
      {
        "data": "2024-07-10T08:00:00Z",
        "acao": "Demanda criada",
        "usuario": "Sistema",
        "observacao": "Demanda gerada automaticamente"
      }
    ],
    "documentos": [
      {
        "nome": "RG_Cliente.pdf",
        "url": "/documentos/123/rg.pdf",
        "tipo": "identificacao"
      }
    ]
  }
}
```

### 3. Atualizar Status da Demanda
```http
PUT /dashboard/demandas/{id}/status
```

**Body:**
```json
{
  "status": "andamento",
  "observacao": "Iniciando análise dos documentos"
}
```

### 4. Estatísticas do Dashboard
```http
GET /dashboard/estatisticas
```

**Resposta:**
```json
{
  "data": {
    "total_demandas": 156,
    "pendentes": 45,
    "em_andamento": 67,
    "concluidas": 44,
    "atrasadas": 12,
    "prioridade_critica": 8,
    "tempo_medio_resolucao": "2.3 dias",
    "taxa_conclusao": "85%"
  }
}
```

## 🔄 Integração com Frontend

### JavaScript - Exemplo de Uso

```javascript
class DashboardAPI {
    constructor(baseURL, token) {
        this.baseURL = baseURL;
        this.token = token;
    }

    async buscarDemandas(filtros = {}) {
        const params = new URLSearchParams(filtros);
        const response = await fetch(`${this.baseURL}/dashboard/demandas?${params}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }

    async atualizarStatus(id, status, observacao) {
        const response = await fetch(`${this.baseURL}/dashboard/demandas/${id}/status`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status, observacao })
        });
        return response.json();
    }
}

// Uso
const api = new DashboardAPI('https://api.silic.caixa.gov.br/v1', 'seu-token');
const demandas = await api.buscarDemandas({ status: 'pendente' });
```

## 🚨 Códigos de Erro

- `400` - Bad Request (parâmetros inválidos)
- `401` - Unauthorized (token inválido)
- `403` - Forbidden (sem permissão)
- `404` - Not Found (recurso não encontrado)
- `422` - Unprocessable Entity (dados inválidos)
- `500` - Internal Server Error (erro interno)

## 📊 Rate Limiting

- Máximo de 1000 requisições por hora por usuário
- Header `X-RateLimit-Remaining` indica requisições restantes
- Header `X-RateLimit-Reset` indica quando o limite será resetado
