// SILIC 2.0 - Dashboard do Agente
// Sistema Hands-on para processamento de demandas

class DashboardAgente {
    constructor() {
        this.demandas = [];
        this.filtroAtivo = '';
        this.tipoFiltro = '';
        this.demandaSelecionada = null;
        this.inicializar();
    }

    inicializar() {
        this.carregarDemandas();
        this.atualizarEstatisticas();
        this.renderizarDemandas();
        this.configurarEventos();
    }

    // Simula dados de demandas
    carregarDemandas() {
        this.demandas = [
            {
                id: 'DEM-2025-001',
                tipo: 'locacao',
                solicitante: 'Maria Santos',
                unidade: 'GERED São Paulo',
                imovel: 'Edifício Comercial - Av. Paulista, 1000',
                valor: 15000,
                prazo: '2025-07-12',
                status: 'urgente',
                prioridade: 'alta',
                observacoes: 'Necessário para expansão da agência',
                documentos: ['RG', 'CPF', 'Comprovante de Renda'],
                dataSubmissao: '2025-07-08',
                prazoVencimento: 2
            },
            {
                id: 'DEM-2025-002',
                tipo: 'cessao',
                solicitante: 'João Oliveira',
                unidade: 'GERED Rio de Janeiro',
                imovel: 'Sala Comercial - Centro',
                valor: 8500,
                prazo: '2025-07-15',
                status: 'pendente',
                prioridade: 'media',
                observacoes: 'Cessão temporária para projeto especial',
                documentos: ['CNPJ', 'Contrato Social'],
                dataSubmissao: '2025-07-09',
                prazoVencimento: 5
            },
            {
                id: 'DEM-2025-003',
                tipo: 'comodato',
                solicitante: 'Ana Costa',
                unidade: 'GERED Belo Horizonte',
                imovel: 'Galpão Industrial - Contagem',
                valor: 0,
                prazo: '2025-07-18',
                status: 'andamento',
                prioridade: 'baixa',
                observacoes: 'Comodato para armazenamento temporário',
                documentos: ['Ata de Reunião', 'Justificativa'],
                dataSubmissao: '2025-07-07',
                prazoVencimento: 8
            },
            {
                id: 'DEM-2025-004',
                tipo: 'locacao',
                solicitante: 'Carlos Silva',
                unidade: 'GERED Salvador',
                imovel: 'Prédio Administrativo - Centro Histórico',
                valor: 22000,
                prazo: '2025-07-11',
                status: 'urgente',
                prioridade: 'alta',
                observacoes: 'Urgente para realocação de equipe',
                documentos: ['RG', 'CPF', 'Autorização'],
                dataSubmissao: '2025-07-10',
                prazoVencimento: 1
            },
            {
                id: 'DEM-2025-005',
                tipo: 'cessao',
                solicitante: 'Fernanda Lima',
                unidade: 'GERED Recife',
                imovel: 'Auditório - Campus Universitário',
                valor: 5000,
                prazo: '2025-07-20',
                status: 'pendente',
                prioridade: 'media',
                observacoes: 'Para evento institucional',
                documentos: ['Projeto do Evento', 'Cronograma'],
                dataSubmissao: '2025-07-09',
                prazoVencimento: 10
            }
        ];
    }

    atualizarEstatisticas() {
        const urgentes = this.demandas.filter(d => d.status === 'urgente').length;
        const pendentes = this.demandas.filter(d => d.status === 'pendente').length;
        const andamento = this.demandas.filter(d => d.status === 'andamento').length;
        const concluidas = 5; // Simulado

        document.getElementById('demandas-urgentes').textContent = urgentes;
        document.getElementById('demandas-pendentes').textContent = pendentes;
        document.getElementById('em-andamento').textContent = andamento;
        document.getElementById('concluidas-hoje').textContent = concluidas;

        // Atualizar contadores das ações rápidas
        const locacao = this.demandas.filter(d => d.tipo === 'locacao').length;
        const cessao = this.demandas.filter(d => d.tipo === 'cessao').length;
        const comodato = this.demandas.filter(d => d.tipo === 'comodato').length;

        document.querySelector('.locacao .count').textContent = locacao;
        document.querySelector('.cessao .count').textContent = cessao;
        document.querySelector('.comodato .count').textContent = comodato;
    }

    renderizarDemandas() {
        const container = document.getElementById('demandas-list');
        let demandasFiltradas = this.demandas;

        // Aplicar filtros
        if (this.filtroAtivo) {
            demandasFiltradas = demandasFiltradas.filter(d => d.status === this.filtroAtivo);
        }
        if (this.tipoFiltro) {
            demandasFiltradas = demandasFiltradas.filter(d => d.tipo === this.tipoFiltro);
        }

        // Ordenar por prioridade e prazo
        demandasFiltradas.sort((a, b) => {
            const prioridadeOrder = { 'alta': 3, 'media': 2, 'baixa': 1 };
            if (prioridadeOrder[a.prioridade] !== prioridadeOrder[b.prioridade]) {
                return prioridadeOrder[b.prioridade] - prioridadeOrder[a.prioridade];
            }
            return a.prazoVencimento - b.prazoVencimento;
        });

        container.innerHTML = demandasFiltradas.map(demanda => this.criarCardDemanda(demanda)).join('');
    }

    criarCardDemanda(demanda) {
        const statusClass = demanda.status;
        const tipoIcon = this.getTipoIcon(demanda.tipo);
        const statusBadge = this.getStatusBadge(demanda.status);
        const prioridadeBadge = this.getPrioridadeBadge(demanda.prioridade);

        return `
            <div class="demanda-card ${statusClass}" onclick="dashboardAgente.abrirDetalhes('${demanda.id}')">
                <div class="demanda-header">
                    <div class="demanda-info">
                        <div class="demanda-id">
                            <i class="${tipoIcon}"></i>
                            <span>${demanda.id}</span>
                        </div>
                        <div class="demanda-badges">
                            ${statusBadge}
                            ${prioridadeBadge}
                        </div>
                    </div>
                    <div class="demanda-prazo ${demanda.prazoVencimento <= 2 ? 'urgente' : ''}">
                        <i class="fas fa-clock"></i>
                        <span>${demanda.prazoVencimento} dias</span>
                    </div>
                </div>
                
                <div class="demanda-content">
                    <h4>${demanda.solicitante}</h4>
                    <p class="unidade">${demanda.unidade}</p>
                    <p class="imovel">${demanda.imovel}</p>
                    ${demanda.valor > 0 ? `<p class="valor">Valor: R$ ${demanda.valor.toLocaleString('pt-BR')}</p>` : ''}
                    <p class="observacoes">${demanda.observacoes}</p>
                </div>
                
                <div class="demanda-actions">
                    <button class="action-btn aprovar" onclick="event.stopPropagation(); dashboardAgente.acao('aprovar', '${demanda.id}')">
                        <i class="fas fa-check"></i>
                        Aprovar
                    </button>
                    <button class="action-btn info" onclick="event.stopPropagation(); dashboardAgente.acao('info', '${demanda.id}')">
                        <i class="fas fa-info-circle"></i>
                        Mais Info
                    </button>
                    <button class="action-btn rejeitar" onclick="event.stopPropagation(); dashboardAgente.acao('rejeitar', '${demanda.id}')">
                        <i class="fas fa-times"></i>
                        Rejeitar
                    </button>
                </div>
            </div>
        `;
    }

    getTipoIcon(tipo) {
        const icons = {
            'locacao': 'fas fa-home',
            'cessao': 'fas fa-handshake',
            'comodato': 'fas fa-exchange-alt'
        };
        return icons[tipo] || 'fas fa-file';
    }

    getStatusBadge(status) {
        const badges = {
            'urgente': '<span class="badge urgente">Urgente</span>',
            'pendente': '<span class="badge pendente">Pendente</span>',
            'andamento': '<span class="badge andamento">Em Andamento</span>'
        };
        return badges[status] || '';
    }

    getPrioridadeBadge(prioridade) {
        const badges = {
            'alta': '<span class="badge-prioridade alta">Alta</span>',
            'media': '<span class="badge-prioridade media">Média</span>',
            'baixa': '<span class="badge-prioridade baixa">Baixa</span>'
        };
        return badges[prioridade] || '';
    }

    configurarEventos() {
        // Eventos já configurados no HTML via onclick
        console.log('Dashboard do Agente inicializado');
    }

    // Métodos de ação
    filtrarPor(tipo) {
        this.tipoFiltro = this.tipoFiltro === tipo ? '' : tipo;
        this.renderizarDemandas();
    }

    aplicarFiltros() {
        this.filtroAtivo = document.getElementById('filtro-status').value;
        this.tipoFiltro = document.getElementById('filtro-tipo').value;
        this.renderizarDemandas();
    }

    atualizarDemandas() {
        // Simula atualização
        const btn = document.querySelector('.btn-refresh i');
        btn.style.animation = 'spin 1s linear';
        
        setTimeout(() => {
            btn.style.animation = '';
            this.carregarDemandas();
            this.atualizarEstatisticas();
            this.renderizarDemandas();
        }, 1000);
    }

    abrirDetalhes(demandaId) {
        const demanda = this.demandas.find(d => d.id === demandaId);
        if (!demanda) return;

        this.demandaSelecionada = demanda;
        document.getElementById('modal-titulo').textContent = `Demanda ${demanda.id}`;
        
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <div class="detalhes-grid">
                <div class="detalhes-section">
                    <h4>Informações Gerais</h4>
                    <div class="info-grid">
                        <div class="info-item">
                            <label>Solicitante:</label>
                            <span>${demanda.solicitante}</span>
                        </div>
                        <div class="info-item">
                            <label>Unidade:</label>
                            <span>${demanda.unidade}</span>
                        </div>
                        <div class="info-item">
                            <label>Tipo:</label>
                            <span>${demanda.tipo.charAt(0).toUpperCase() + demanda.tipo.slice(1)}</span>
                        </div>
                        <div class="info-item">
                            <label>Status:</label>
                            <span>${demanda.status.charAt(0).toUpperCase() + demanda.status.slice(1)}</span>
                        </div>
                        <div class="info-item">
                            <label>Prioridade:</label>
                            <span>${demanda.prioridade.charAt(0).toUpperCase() + demanda.prioridade.slice(1)}</span>
                        </div>
                        <div class="info-item">
                            <label>Data de Submissão:</label>
                            <span>${new Date(demanda.dataSubmissao).toLocaleDateString('pt-BR')}</span>
                        </div>
                    </div>
                </div>
                
                <div class="detalhes-section">
                    <h4>Imóvel</h4>
                    <div class="info-item">
                        <label>Descrição:</label>
                        <span>${demanda.imovel}</span>
                    </div>
                    ${demanda.valor > 0 ? `
                        <div class="info-item">
                            <label>Valor:</label>
                            <span>R$ ${demanda.valor.toLocaleString('pt-BR')}</span>
                        </div>
                    ` : ''}
                    <div class="info-item">
                        <label>Prazo Limite:</label>
                        <span>${new Date(demanda.prazo).toLocaleDateString('pt-BR')}</span>
                    </div>
                </div>
                
                <div class="detalhes-section">
                    <h4>Observações</h4>
                    <p>${demanda.observacoes}</p>
                </div>
                
                <div class="detalhes-section">
                    <h4>Documentos</h4>
                    <div class="documentos-list">
                        ${demanda.documentos.map(doc => `
                            <div class="documento-item">
                                <i class="fas fa-file-pdf"></i>
                                <span>${doc}</span>
                                <button class="btn-download">
                                    <i class="fas fa-download"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('modal-detalhes').style.display = 'block';
    }

    fecharModal() {
        document.getElementById('modal-detalhes').style.display = 'none';
        this.demandaSelecionada = null;
    }

    processarDemanda() {
        if (!this.demandaSelecionada) return;
        
        alert(`Processando demanda ${this.demandaSelecionada.id}...`);
        this.fecharModal();
    }

    acao(tipo, demandaId) {
        const demanda = this.demandas.find(d => d.id === demandaId);
        if (!demanda) return;

        switch(tipo) {
            case 'aprovar':
                if (confirm(`Aprovar demanda ${demandaId}?`)) {
                    demanda.status = 'andamento';
                    this.atualizarEstatisticas();
                    this.renderizarDemandas();
                }
                break;
            case 'info':
                this.abrirDetalhes(demandaId);
                break;
            case 'rejeitar':
                if (confirm(`Rejeitar demanda ${demandaId}?`)) {
                    // Remove da lista ou marca como rejeitada
                    this.demandas = this.demandas.filter(d => d.id !== demandaId);
                    this.atualizarEstatisticas();
                    this.renderizarDemandas();
                }
                break;
        }
    }

    abrirRelatorios() {
        alert('Módulo de relatórios em desenvolvimento');
    }
}

// Função para voltar ao portal
function voltarAoPortal() {
    const portalUrl = 'https://osvaldojeronymo.github.io/silic-portal-imoveis/';
    const referrer = document.referrer;
    
    if (referrer.includes('silic-portal')) {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = portalUrl;
        }
    } else {
        window.location.href = portalUrl;
    }
}

// Funções globais para os eventos
function filtrarPor(tipo) {
    dashboardAgente.filtrarPor(tipo);
}

function aplicarFiltros() {
    dashboardAgente.aplicarFiltros();
}

function atualizarDemandas() {
    dashboardAgente.atualizarDemandas();
}

function fecharModal() {
    dashboardAgente.fecharModal();
}

function processarDemanda() {
    dashboardAgente.processarDemanda();
}

function abrirRelatorios() {
    dashboardAgente.abrirRelatorios();
}

// Adicionar estilos CSS para os cards
const additionalCSS = `
    .demanda-card {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        border-left: 5px solid #dee2e6;
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .demanda-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    .demanda-card.urgente {
        border-left-color: #dc3545;
    }
    
    .demanda-card.pendente {
        border-left-color: #ffc107;
    }
    
    .demanda-card.andamento {
        border-left-color: #17a2b8;
    }
    
    .demanda-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
    }
    
    .demanda-id {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        color: #0066cc;
    }
    
    .demanda-badges {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    
    .badge {
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .badge.urgente {
        background: #f8d7da;
        color: #721c24;
    }
    
    .badge.pendente {
        background: #fff3cd;
        color: #856404;
    }
    
    .badge.andamento {
        background: #d1ecf1;
        color: #0c5460;
    }
    
    .badge-prioridade {
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
    }
    
    .badge-prioridade.alta {
        background: #dc3545;
        color: white;
    }
    
    .badge-prioridade.media {
        background: #ffc107;
        color: #212529;
    }
    
    .badge-prioridade.baixa {
        background: #28a745;
        color: white;
    }
    
    .demanda-prazo {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.9rem;
        color: #6c757d;
    }
    
    .demanda-prazo.urgente {
        color: #dc3545;
        font-weight: 600;
    }
    
    .demanda-content h4 {
        margin: 0 0 0.5rem 0;
        color: #495057;
    }
    
    .demanda-content p {
        margin: 0.25rem 0;
        color: #6c757d;
        font-size: 0.9rem;
    }
    
    .unidade {
        font-weight: 600;
        color: #0066cc !important;
    }
    
    .valor {
        font-weight: 600;
        color: #28a745 !important;
    }
    
    .demanda-actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
        flex-wrap: wrap;
    }
    
    .action-btn {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.85rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        transition: all 0.2s ease;
    }
    
    .action-btn.aprovar {
        background: #28a745;
        color: white;
    }
    
    .action-btn.aprovar:hover {
        background: #218838;
    }
    
    .action-btn.info {
        background: #17a2b8;
        color: white;
    }
    
    .action-btn.info:hover {
        background: #138496;
    }
    
    .action-btn.rejeitar {
        background: #dc3545;
        color: white;
    }
    
    .action-btn.rejeitar:hover {
        background: #c82333;
    }
    
    .detalhes-grid {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .detalhes-section h4 {
        color: #0066cc;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #e9ecef;
    }
    
    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
    }
    
    .info-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .info-item label {
        font-weight: 600;
        color: #495057;
        font-size: 0.9rem;
    }
    
    .info-item span {
        color: #6c757d;
    }
    
    .documentos-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .documento-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        background: #f8f9fa;
        border-radius: 6px;
    }
    
    .documento-item i {
        color: #dc3545;
    }
    
    .btn-download {
        margin-left: auto;
        padding: 0.25rem;
        background: #0066cc;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;

// Adicionar CSS ao documento
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Inicializar dashboard quando DOM estiver pronto
let dashboardAgente;
document.addEventListener('DOMContentLoaded', () => {
    dashboardAgente = new DashboardAgente();
});

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('modal-detalhes');
    if (event.target === modal) {
        dashboardAgente.fecharModal();
    }
}
