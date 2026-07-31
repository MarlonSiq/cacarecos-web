function share() {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      text: "Veja isso:",
      url: window.location.href
    });
  } else {
    alert("Compartilhamento não suportado");
  }
}