document.addEventListener("DOMContentLoaded", () => {

  const message = document.getElementById("message");
  const destination = document.getElementById("destination");
  const cancelBtn = document.getElementById("cancelBtn");
  const goBtn = document.getElementById("goBtn");
  const shareBtn = document.getElementById("shareBtn");

  const loaderLine = document.querySelector(".loader-line");

  const formatUrl = (url) => {
    try {
      const u = new URL(url);
      const path =
        u.pathname.length > 40
          ? u.pathname.slice(0, 40) + "…"
          : u.pathname;
      return `${u.hostname}${path}`;
    } catch {
      return url;
    }
  };

  // =====================
  // API pública
  // =====================
  window.PathUI = {

    setMessage(text) {
      message.innerText = text;
    },

    setDestination(url) {
      destination.innerText = formatUrl(url);
    },

    dimLoader() {
      loaderLine.style.opacity = "0.3";
    },

    onCancel(cb) {
      cancelBtn.onclick = cb;
    },

    onGo(cb) {
      goBtn.onclick = cb;
    }
  };

  // share button
  shareBtn.addEventListener("click", () => {
    if (typeof share === "function") {
      share();
    }
  });

});