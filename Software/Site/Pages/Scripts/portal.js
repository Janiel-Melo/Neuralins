// ==========================================================================
// CONFIGURAÇÃO DOS GRÁFICOS DIDÁTICOS (Chart.js)
// ==========================================================================
const COLOR_NAVY  = "#0F2C59";
const COLOR_GOLD  = "#D4AF37";
const COLOR_TERRA = "#C05C46";

document.addEventListener("DOMContentLoaded", () => {
  initPublicAgingChart();
  initProtectionChart();
  initCitizenMap();
});

// Gráfico 1: Linha de Evolução da Memória (Conceitual/Didático)
function initPublicAgingChart() {
  const ctx = document.getElementById("publicAgingChart").getContext("2d");
  
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["60 anos", "65 anos", "70 anos", "75 anos", "80+ anos"],
      datasets: [
        {
          label: "Envelhecimento Natural (Saudável)",
          data: [100, 97, 94, 90, 85],
          borderColor: COLOR_GOLD,
          backgroundColor: "transparent",
          borderWidth: 3,
          pointRadius: 4,
          pointBackgroundColor: COLOR_GOLD,
          tension: 0.2
        },
        {
          label: "Declínio Acelerado (Requer Atenção)",
          data: [100, 92, 80, 65, 45],
          borderColor: COLOR_TERRA,
          backgroundColor: "rgba(192, 92, 70, 0.05)",
          fill: true,
          borderWidth: 3,
          pointRadius: 4,
          pointBackgroundColor: COLOR_TERRA,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }, // Legenda customizada via HTML para maior clareza
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: Nível de retenção em ${context.raw}%`;
            }
          }
        }
      },
      scales: {
        y: {
          title: { display: true, text: "Capacidade de Retenção (%)" },
          min: 30,
          max: 105
        }
      }
    }
  });
}

// Gráfico 2: Fatores de Proteção (Barras Horizontais para fácil leitura)
function initProtectionChart() {
  const ctx = document.getElementById("protectionChart").getContext("2d");
  
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "Estímulo Intelectual (Leitura/Jogos)",
        "Atividade Física Regular",
        "Convívio Social Ativo",
        "Controle da Pressão e Diabetes"
      ],
      datasets: [{
        data: [88, 85, 78, 92],
        backgroundColor: [
          COLOR_NAVY,
          COLOR_GOLD,
          "#2e7d32", // Verde de aprovação/saúde
          COLOR_NAVY
        ],
        borderRadius: 6
      }]
    },
    options: {
      indexAxis: 'y', // Transforma em barras horizontais para facilitar a leitura dos textos
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Grau de impacto na proteção: ${context.raw}%`;
            }
          }
        }
      },
      scales: {
        x: {
          max: 100,
          title: { display: true, text: "Força da Evidência Científica (%)" }
        }
      }
    }
  });
}

// ==========================================================================
// CONFIGURAÇÃO DO MAPA CIDADÃO (Leaflet)
// ==========================================================================
function initCitizenMap() {
  // Centralizado no município de São Paulo
  const map = L.map('citizen-map').setView([-23.5505, -46.6333], 11);

  // Tiles de visualização nítida
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap | Neuralins Apoio Público'
  }).addTo(map);

  // Pontos de pesquisa traduzidos para linguagem cidadã
  const publicInitiatives = [
    {
      coords: [-23.5505, -46.6333],
      region: "Região Central (Sé)",
      color: COLOR_GOLD,
      desc: "Estudo contínuo analisando relatórios de saúde pública para prever e otimizar vagas de acompanhamento geriátrico na região."
    },
    {
      coords: [-23.6500, -46.7050],
      region: "Zona Sul (Santo Amaro)",
      color: COLOR_NAVY,
      desc: "Mapeamento em parceria com universidades para avaliar o impacto do convívio social ativo na terceira idade."
    },
    {
      coords: [-23.5350, -46.4550],
      region: "Zona Leste (Itaquera)",
      color: COLOR_TERRA,
      desc: "Polo de alerta científico focado no cruzamento de dados para acelerar diagnósticos que antes demoravam meses."
    }
  ];

  publicInitiatives.forEach(point => {
    // Adiciona círculos interativos amigáveis
    const circle = L.circle(point.coords, {
      color: point.color,
      fillColor: point.color,
      fillOpacity: 0.6,
      radius: 1200 // Raio ligeiramente maior para facilitar o clique em telas de toque (celulares)
    }).addTo(map);

    const popupHTML = `
      <div class="public-popup-title">${point.region}</div>
      <div class="public-popup-desc">${point.desc}</div>
    `;

    circle.bindPopup(popupHTML);
  });
}