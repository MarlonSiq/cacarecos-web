// ===============================
// PEGAR PARAMETROS DA URL
// ===============================
const params = new URLSearchParams(location.search);

const hq = HQS.find(h => h.id === params.get("hq"));
const issue = hq.issues.find(i => i.id === params.get("issue"));

// ===============================
// ELEMENTOS
// ===============================
const img = document.getElementById("img");
const popup = document.getElementById("popup");

// ===============================
// CONFIG
// ===============================
let paginaAtual = 0;
let startX = 0;

// imagem fallback
const FALLBACK_IMG = "./images/erro.jpg";

// ===============================
// FUNÇÕES PRINCIPAIS
// ===============================

function mostrarPopup(texto) {
  popup.textContent = texto;
  popup.style.opacity = 1;

  clearTimeout(popup.timeout);

  popup.timeout = setTimeout(() => {
    popup.style.opacity = 0;
  }, 1200);
}

function preloadProxima() {
  const prox = issue.paginas[paginaAtual + 1];

  if (prox) {
    const imgPreload = new Image();
    imgPreload.src = prox;
  }
}

function atualizarImagem() {

  // proteção extra
  if (!issue || !issue.paginas.length) {
    img.src = FALLBACK_IMG;
    mostrarPopup("Nenhuma página encontrada");
    return;
  }

  img.src = issue.paginas[paginaAtual];

  mostrarPopup(
    `${paginaAtual + 1} / ${issue.paginas.length}`
  );

  preloadProxima();
}

function proximaPagina() {
  if (paginaAtual < issue.paginas.length - 1) {
    paginaAtual++;
    atualizarImagem();
  }
}

function paginaAnterior() {
  if (paginaAtual > 0) {
    paginaAtual--;
    atualizarImagem();
  }
}

// ===============================
// FALLBACK DE ERRO
// ===============================
img.onerror = () => {
  img.src = FALLBACK_IMG;
  mostrarPopup("Erro ao carregar página");
};

// ===============================
// CONTROLE TECLADO (DESKTOP)
// ===============================
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") proximaPagina();
  if (e.key === "ArrowLeft") paginaAnterior();
});

// ===============================
// SWIPE TOUCH (CELULAR/TABLET)
// ===============================
document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {

  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  // sensibilidade do swipe
  if (diff > 50) proximaPagina();
  if (diff < -50) paginaAnterior();
});

// ===============================
// CARREGAMENTO INICIAL
// ===============================
window.onload = atualizarImagem;