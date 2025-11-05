let lyrics = [
  { text: "...", time: 0 },
  { text: "'To te querendo, 'to com vontade", time: 11.7 },
  { text: "E você já sabe, eu 'to querendo de verdade", time: 13.5 },
  { text: "Todo mundo vendo que eu 'to cheia de maldade", time: 16 },
  { text: "E eu já 'to sabendo que você 'tá na cidade", time: 19 },
  { text: "Vem visitar, bebê, vem com vontade", time: 22 },
  { text: "Todo mundo sabe, eu quero mais que amizade", time: 24.8 },
  { text: "Se 'tá na cidade, até te dou fidelidade", time: 27.5 },
  { text: "Sem anel no dedo, que isso é só vaidade", time: 30 },
  { text: "Ali, na praça do Coqueiro, a gente passava o dia inteiro", time: 32 },
  { text: "Ali, naquela esquina, você com aquela menina", time: 35 },
  { text: "Até bonitinha, mas tinha cara de santinha", time: 37.5 },
  { text: "Não era das minhas", time: 40 },
  { text: "Agora que 'cê 'tá solteiro", time: 41.9 },
  { text: "Vou te mostrar todo o tempero, toda essa malícia", time: 44.5 },
  { text: "'Cê vai rodar o mundo inteiro com minha magia", time: 47 },
  { text: "Vai melhorar seu paladar, só vai querer a minha", time: 49 },
  { text: "Se for pra transcender, desmitificar", time: 53.3 },
  { text: "Se entorpecer, se intensificar, eu consigo", time: 56.5 },
  { text: "Quer entrar no mar, eu te guio", time: 60 },
  { text: "Se for pra transcender, desmitificar", time: 64 },
  { text: "Se entorpecer, se intensificar, eu consigo", time: 67 },
  { text: "Quer entrar no mar, eu te guio", time: 71 },
  { text: "'To te querendo, 'to com vontade", time: 86.2 },
  { text: "E você já sabe, eu 'to querendo de verdade", time: 89 },
  { text: "Todo mundo vendo que eu 'to cheia de maldade", time: 91.5 },
  { text: "E eu já 'to sabendo que você 'tá na cidade", time: 94 },
  { text: "Vem visitar, bebê, vem com vontade", time: 97 },
  { text: "Todo mundo sabe, eu quero mais que amizade", time: 99.8 },
  { text: "Se 'tá na cidade, até te dou fidelidade", time: 102.5 },
  { text: "Sem anel no dedo, que isso é só vaidade", time: 105 },
  { text: "Ali, na praça do Coqueiro, a gente passava o dia inteiro", time: 107 },
  { text: "Ali, naquela esquina, você com aquela menina", time: 110 },
  { text: "Até bonitinha, mas tinha cara de santinha", time: 112.5 },
  { text: "Não era das minhas", time: 115 },
  { text: "Agora que 'cê 'tá solteiro", time: 116.9 },
  { text: "Vou te mostrar todo o tempero, toda essa malícia", time: 119.5 },
  { text: "'Cê vai rodar o mundo inteiro com minha magia", time: 122 },
  { text: "Vai melhorar seu paladar, só vai querer a minha", time: 124 },
  { text: "Se for pra transcender, desmitificar", time: 128.3 },
  { text: "Se entorpecer, se intensificar, eu consigo", time: 131.5 },
  { text: "Quer entrar no mar, eu te guio", time: 135 },
];

let currentIndex = 0;
let startTime = 0;
let interval;
let totalTime = lyrics[lyrics.length - 1].time;
let isEditing = false;

const currentLine = document.getElementById("current-line");
const startBtn = document.getElementById("startBtn");
const progress = document.getElementById("progress");
const editorPanel = document.getElementById("editorPanel");
const editBtn = document.getElementById("editBtn");
const verseList = document.getElementById("verseList");
const addVerseBtn = document.getElementById("addVerseBtn");
const saveBtn = document.getElementById("saveBtn");

// === Eventos ===
startBtn.onclick = startLyrics;
editBtn.onclick = toggleEditor;
addVerseBtn.onclick = addVerse;
saveBtn.onclick = saveLyrics;

// === Função principal ===
function startLyrics() {
  clearInterval(interval); // Evita rodar múltiplas vezes
  currentIndex = 0;
  startTime = Date.now();
  totalTime = lyrics[lyrics.length - 1].time;
  updateLine();
  interval = setInterval(checkLyrics, 100);
}

function checkLyrics() {
  let elapsed = (Date.now() - startTime) / 1000;
  progress.style.width = `${Math.min((elapsed / totalTime) * 100, 100)}%`;

  if (currentIndex < lyrics.length - 1 && elapsed >= lyrics[currentIndex + 1].time) {
    currentIndex++;
    updateLine();
  }

  if (elapsed >= totalTime) {
    clearInterval(interval);
    progress.style.width = "100%";
  }
}

function updateLine() {
  currentLine.style.animation = "none";
  void currentLine.offsetWidth; // reset da animação
  currentLine.textContent = lyrics[currentIndex]?.text || "";
  currentLine.style.animation = "slideIn 0.8s ease forwards";
}

// === Editor ===
function toggleEditor() {
  isEditing = !isEditing;
  editorPanel.classList.toggle("hidden");
  if (isEditing) loadEditor();
}

function loadEditor() {
  verseList.innerHTML = "";
  lyrics.forEach((v, i) => {
    const div = document.createElement("div");
    div.style.marginBottom = "15px";
    div.innerHTML = `
      <input type="text" value="${v.text}" data-index="${i}" placeholder="Verso">
      <input type="number" step="0.1" value="${v.time}" data-index="${i}" placeholder="Tempo (s)">
    `;
    verseList.appendChild(div);
  });
}

function addVerse() {
  lyrics.push({ text: "Novo verso", time: lyrics[lyrics.length - 1].time + 5 });
  loadEditor();
}

function saveLyrics() {
  const inputs = verseList.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i += 2) {
    const text = inputs[i].value.trim();
    const time = parseFloat(inputs[i + 1].value);
    const index = parseInt(inputs[i].dataset.index);
    if (!isNaN(time)) {
      lyrics[index] = { text, time };
    }
  }

  lyrics.sort((a, b) => a.time - b.time); // mantém ordem crescente
  totalTime = lyrics[lyrics.length - 1].time;
  alert("✅ Letra atualizada!");
  toggleEditor();
}

// Mostra a primeira linha ao carregar
updateLine();