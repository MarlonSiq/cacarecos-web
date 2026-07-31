document.addEventListener("DOMContentLoaded", () => {

  const REDIRECT_ENABLED = true;
  const TIMEOUT_SECONDS = 5;
  const redirectUrl = document.body.dataset.redirect;

  if (!window.PathUI) {
    console.error("PathUI não carregado");
    return;
  }

  if (!redirectUrl || !REDIRECT_ENABLED) {
    document.title = "Redirecionamento indisponível";
    PathUI.setMessage("Redirecionamento cancelado.");
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