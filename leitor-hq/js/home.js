const container = document.getElementById("hqList");

HQS.forEach(hq => {

  const card = document.createElement("div");
  card.className = "hq-card";

  card.innerHTML = `
    <img src="${hq.capa}" alt="${hq.titulo}">
    <h2>${hq.titulo}</h2>
  `;

  card.onclick = () => {
    location.href = `hq.html?id=${hq.id}`;
  };

  container.appendChild(card);
});