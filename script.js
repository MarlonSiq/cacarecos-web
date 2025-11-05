// Importa header e footer
async function incluirParte(id, arquivo) {
  const el = document.getElementById(id);
  try {
    const res = await fetch(arquivo);
    el.innerHTML = await res.text();
  } catch {
    console.warn(`Não foi possível carregar ${arquivo}`);
  }
}

// Seletores
const container = document.getElementById("lista-cacarecos");
const filtroContainer = document.getElementById("filtros");

let filtroAtivo = null;

// Gera lista única de tags (sem repetir)
const todasTags = [...new Set(cacarecos.flatMap(item => item.tags))];

// Cria botões de filtro
todasTags.forEach(tag => {
  const btn = document.createElement("button");
  btn.textContent = tag;
  btn.classList.add("filtro-btn");
  btn.onclick = () => alternarFiltro(tag, btn);
  filtroContainer.appendChild(btn);
});

// Minutos para hora
function formatTime(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  let result = "";
  if (h > 0) result += h + "h ";
  if (m > 0) result += m + "m";
  return result.trim();
}

// Renderiza cards
function renderizarCacarecos(lista) {
  container.innerHTML = "";
  lista.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${item.imagem}" alt="${item.titulo}">
      <h2>${item.titulo}</h2>
      <p class="descricao">${item.descricao}</p>
      <p class="info">${item.data} | Tempo gasto: ${formatTime(item.timeSpent)}</p>
      <div class="tags">
        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <a href="${item.link}" class="botao">Ver mais</a>
    `;
    container.appendChild(card);
  });
}

// Alterna o filtro (ativa/desativa)
function alternarFiltro(tag, btn) {
  const botoes = document.querySelectorAll(".filtro-btn");

  if (filtroAtivo === tag) {
    // Desativa filtro
    filtroAtivo = null;
    botoes.forEach(b => b.classList.remove("ativo"));
    renderizarCacarecos(cacarecos);
  } else {
    // Ativa filtro
    filtroAtivo = tag;
    botoes.forEach(b => b.classList.remove("ativo"));
    btn.classList.add("ativo");
    const filtrados = cacarecos.filter(item => item.tags.includes(tag));
    renderizarCacarecos(filtrados);
  }
}

// Renderiza todos no início
renderizarCacarecos(cacarecos);