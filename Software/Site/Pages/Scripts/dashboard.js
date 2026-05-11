// ==========================================================================
// Variáveis Globais de Cores (Design System)
// ==========================================================================
const COLOR_NAVY  = "#0F2C59";
const COLOR_GOLD  = "#D4AF37";
const COLOR_TERRA = "#C05C46";

// ==========================================================================
// Base de Dados Simulada (Georreferenciamento SP + Evolução)
// ==========================================================================
const spRegionsData = [
  { 
    id: "se", 
    name: "Subprefeitura Sé", 
    coords: [-23.5505, -46.6333], 
    density: "high", 
    color: COLOR_TERRA, 
    radius: 900,
    ageGroup: "71-80",
    cases: 342,
    desc: "Alerta: 3 desvios padrão acima da média (Outlier)."
  },
  { 
    id: "pinheiros", 
    name: "Subprefeitura Pinheiros", 
    coords: [-23.5615, -46.6958], 
    density: "low", 
    color: COLOR_NAVY, 
    radius: 600,
    ageGroup: "60-70",
    cases: 85,
    desc: "Densidade sob controle. Predição estável."
  },
  { 
    id: "santo-amaro", 
    name: "Subprefeitura Santo Amaro", 
    coords: [-23.6500, -46.7050], 
    density: "medium", 
    color: COLOR_GOLD, 
    radius: 750,
    ageGroup: "80+",
    cases: 190,
    desc: "Atenção: Crescimento leve identificado."
  },
  { 
    id: "itaquera", 
    name: "Subprefeitura Itaquera", 
    coords: [-23.5350, -46.4550], 
    density: "high", 
    color: COLOR_TERRA, 
    radius: 950,
    ageGroup: "all",
    cases: 410,
    desc: "Alerta Crítico: Falta de dados primários COPIS."
  }
];

const chartDatasets = {
  todas: [2, 3.5, 4.1, 5.8, 7.2, 9.5],
  se: [5, 6.5, 8.0, 11.2, 14.5, 18.2], // Outlier claro
  pinheiros: [1, 1.2, 1.5, 1.8, 2.1, 2.5],
  "santo-amaro": [3, 4.0, 4.5, 5.2, 6.8, 8.0],
  itaquera: [4, 5.5, 7.2, 9.0, 12.1, 15.4]
};

// ==========================================================================
// Inicialização do Sistema
// ==========================================================================
let map;
let mapLayerGroup;
let evolutionChart;

document.addEventListener("DOMContentLoaded", () => {
  initMap();
  initChart();
  renderRawTable(rawDatasetsMock);
});

// ==========================================================================
// 1. Módulo de Visualização: Mapa Leaflet (RF09)
// ==========================================================================
function initMap() {
  // Inicializa focado no centro de SP
  map = L.map('real-map').setView([-23.5505, -46.6333], 11);

  // Carrega os blocos de mapa gratuitos e confiáveis do OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors | Neuralins SP'
  }).addTo(map);

  mapLayerGroup = L.layerGroup().addTo(map);
  plotMapPoints(spRegionsData);
}

function plotMapPoints(dataPoints) {
  mapLayerGroup.clearLayers(); // Limpa pontos anteriores

  dataPoints.forEach(region => {
    // Desenha um círculo refletindo precisão geométrica e o risco (RF12)
    const circle = L.circle(region.coords, {
      color: region.color,
      fillColor: region.color,
      fillOpacity: 0.6,
      radius: region.radius
    });

    const popupContent = `
      <div class="leaflet-popup-title">${region.name}</div>
      <strong>Casos Cadastrados:</strong> ${region.cases}<br>
      <strong>Faixa Etária Predominante:</strong> ${region.ageGroup} anos<br>
      <hr style="margin:5px 0; border-color:#E8E8E4;">
      <span style="font-size:0.8rem;">${region.desc}</span>
    `;

    circle.bindPopup(popupContent);
    mapLayerGroup.addLayer(circle);
  });
}

// ==========================================================================
// 2. Módulo de Visualização: Gráfico Chart.js (RF11)
// ==========================================================================
function initChart() {
  const ctx = document.getElementById('evolutionChart').getContext('2d');
  
  evolutionChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun (Atual)'],
      datasets: [
        {
          label: 'Média de Progressão (SP / DataSUS)',
          data: [2, 2.5, 3.0, 3.5, 4.0, 4.5],
          borderColor: COLOR_NAVY,
          backgroundColor: 'transparent',
          borderDash: [5, 5], // Linha tracejada para a base
          tension: 0.2
        },
        {
          label: 'Grupo Selecionado (Camada Gold)',
          data: chartDatasets.todas,
          borderColor: COLOR_TERRA,
          backgroundColor: 'rgba(192, 92, 70, 0.1)',
          fill: true,
          borderWidth: 3,
          pointBackgroundColor: COLOR_GOLD,
          pointRadius: 5,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' }
      },
      scales: {
        y: { 
          beginAtZero: true,
          title: { display: true, text: 'Taxa de Declínio (%)' }
        }
      }
    }
  });
}

// ==========================================================================
// 3. Integração e Filtros Dinâmicos (RF10 / RNF04)
// ==========================================================================
function applyFilters() {
  const ageFilter = document.getElementById("filter-age").value;
  const regionFilter = document.getElementById("filter-region").value;

  // 1. FILTRAR O MAPA
  let filteredMapData = spRegionsData;
  
  if (regionFilter !== "todas") {
    filteredMapData = filteredMapData.filter(r => r.id === regionFilter);
    // Foca o mapa na região selecionada com animação suave
    if (filteredMapData.length > 0) {
      map.flyTo(filteredMapData[0].coords, 13, { duration: 1.5 });
    }
  } else {
    // Volta pro centro de SP
    map.flyTo([-23.5505, -46.6333], 11, { duration: 1.5 });
  }

  // Aplica filtro secundário de idade (se aplicável ao mock)
  if (ageFilter !== "all") {
    filteredMapData = filteredMapData.filter(r => r.ageGroup === ageFilter || r.ageGroup === "all");
  }

  plotMapPoints(filteredMapData);

  // 2. ATUALIZAR O GRÁFICO (Evolução)
  const newDataSeries = chartDatasets[regionFilter] || chartDatasets.todas;
  evolutionChart.data.datasets[1].data = newDataSeries;
  
  // Altera o título da legenda do gráfico para refletir a busca
  const regionNames = {
    todas: "Média Geral SP", se: "Outlier - Sé", pinheiros: "Controle - Pinheiros",
    "santo-amaro": "Atenção - Santo Amaro", itaquera: "Crítico - Itaquera"
  };
  evolutionChart.data.datasets[1].label = `Progressão: ${regionNames[regionFilter]} (${ageFilter} anos)`;
  
  evolutionChart.update(); // Recalcula a curva na tela instantaneamente

  console.log(`[AUDITORIA RN09] Filtros aplicados: Região=${regionFilter}, Idade=${ageFilter}`);
}

// ==========================================================================
// 4. Estrutura do Módulo de Coleta (Camada Raw)
// ==========================================================================
const rawDatasetsMock = [
  {
    id: 1, titulo: "TABNET - Mortalidade Alzheimer SP", dados: "Óbitos/Idade", formato: "CSV",
    sistemaOrigem: "DataSUS / SEADE", dataColetaNeuralins: "2026-05-10", responsavel: "API Crawling (Auto)",
    dataColetaOrigem: "2026-05-01", statusIntegridade: "Conforme COPIS", nans: "Não", tamanhoMB: "45.2 MB"
  },
  {
    id: 2, titulo: "Testes Cognitivos - Subpref. Sé", dados: "Escores Creyos", formato: "JSON",
    sistemaOrigem: "Creyos Auth", dataColetaNeuralins: "2026-05-09", responsavel: "Dra. Ana Beatriz",
    dataColetaOrigem: "2026-05-08", statusIntegridade: "Conforme COPIS", nans: "Sim", tamanhoMB: "12.8 MB"
  },
  {
    id: 3, titulo: "Sensores de Marcha - Estudo Longitudinal", dados: "Acelerometria Bruta", formato: "XLSX",
    sistemaOrigem: "Sensores IoT Lab", dataColetaNeuralins: "2026-05-05", responsavel: "Dr. Carlos Mendes",
    dataColetaOrigem: "2026-05-04", statusIntegridade: "Revisão Manual (RN04)", nans: "Sim", tamanhoMB: "110.5 MB"
  }
];

function renderRawTable(datasets) {
  const tbody = document.getElementById("raw-data-tbody");
  tbody.innerHTML = "";
  datasets.forEach(row => {
    const statusClass = row.statusIntegridade.includes("Conforme") ? "status-ok" : "status-review";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${row.titulo}</strong></td><td>${row.dados}</td><td>${row.formato}</td>
      <td>${row.sistemaOrigem}</td><td>${row.dataColetaNeuralins}</td><td>${row.responsavel}</td>
      <td>${row.dataColetaOrigem}</td><td class="${statusClass}">${row.statusIntegridade}</td>
      <td>${row.nans}</td><td>${row.tamanhoMB}</td>
      <td><button class="btn-action" onclick="downloadRaw(${row.id})">Baixar Raw</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (!confirm("Governança e Ética (RN02):\nO Termo de Consentimento (TCLE) foi assinado para estes pacientes?")) {
    event.target.value = ""; return;
  }
  const novoDado = {
    id: rawDatasetsMock.length + 1, titulo: file.name, dados: "Testes Importados",
    formato: file.name.split('.').pop().toUpperCase(), sistemaOrigem: "Upload Manual (RF02)",
    dataColetaNeuralins: new Date().toISOString().split('T')[0], responsavel: "Usuário Logado",
    dataColetaOrigem: new Date().toISOString().split('T')[0], statusIntegridade: "Conforme COPIS",
    nans: "Não", tamanhoMB: (file.size / (1024 * 1024)).toFixed(2) + " MB"
  };
  rawDatasetsMock.unshift(novoDado);
  renderRawTable(rawDatasetsMock);
  alert("Arquivo enviado para a arquitetura de Medalhão (Raw ➔ Bronze).");
}

function downloadRaw(id) {
  alert(`Iniciando download da camada inalterável Raw (ID: ${id}).\nLog inviolável gravado no servidor.`);
}
function exportGoldReport() { alert("Exportando gráficos processados (SVG) e tabelas da camada Gold em CSV."); }
function logout() { window.location.href = "index.html"; }