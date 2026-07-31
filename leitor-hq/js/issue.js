const p = new URLSearchParams(location.search);

const hq = HQS.find(h => h.id === p.get("hq"));
const issue = hq.issues.find(i => i.id === p.get("issue"));

document.getElementById("title").textContent = issue.titulo;
document.getElementById("desc").textContent = issue.descricao;

document.getElementById("ler").onclick = () => {
  location.href =
    `reader.html?hq=${hq.id}&issue=${issue.id}`;
};