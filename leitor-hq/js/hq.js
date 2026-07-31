const params = new URLSearchParams(location.search);
const id = params.get("id");

const hq = HQS.find(h => h.id === id);

document.getElementById("titulo").textContent = hq.titulo;

hq.issues.forEach(issue => {
  const div = document.createElement("div");
  div.innerHTML = `<h3>${issue.titulo}</h3>`;

  div.onclick = () => {
    location.href =
      `issue.html?hq=${hq.id}&issue=${issue.id}`;
  };

  document.getElementById("issues").appendChild(div);
});