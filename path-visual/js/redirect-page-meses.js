document.addEventListener("DOMContentLoaded", () => {

  const REDIRECT_ENABLED = true;
  const TIMEOUT_SECONDS = 5;

  const monthRoutes = {
    jan: "https://www.youtube.com",
    fev: "https://seusite.com/fevereiro",
    mar: "https://www.twitch.tv",
    abr: "https://seusite.com/abril",
    mai: "https://seusite.com/maio",
    jun: "https://seusite.com/junho",
    jul: "https://seusite.com/julho",
    ago: "https://seusite.com/agosto",
    set: "https://seusite.com/setembro",
    out: "https://seusite.com/outubro",
    nov: "https://seusite.com/novembro",
    dez: "https://seusite.com/dezembro"
  };

  const query = window.location.search.replace("?", "").toLowerCase();
  const redirectUrl = monthRoutes[query]; //?jan

  if (!window.PathUI) {
    console.error("PathUI não carregado");
    return;
  }

  if (!redirectUrl || !REDIRECT_ENABLED) {
    document.title = "Redirecionamento indisponível";
    PathUI.setMessage("Destino inválido ou inexistente.");
    PathUI.dimLoader();
    return;
  }

  let timeLeft = TIMEOUT_SECONDS;
  let cancelled = false;

  PathUI.setDestination(redirectUrl);

  const update = () => {
    document.title = `Redirecionando em ${timeLeft}...`;
    PathUI.setMessage(`Redirecionando em ${timeLeft} segundos…`);
  };

  update();

  const interval = setInterval(() => {
    if (cancelled) return;

    timeLeft--;
    update();

    if (timeLeft <= 0) {
      clearInterval(interval);
      window.location.href = redirectUrl;
    }
  }, 1000);

  PathUI.onCancel(() => {
    cancelled = true;
    clearInterval(interval);
    document.title = "Redirecionamento cancelado";
    PathUI.setMessage("Redirecionamento cancelado.");
    PathUI.dimLoader();
  });

  PathUI.onGo(() => {
    window.location.href = redirectUrl;
  });

});