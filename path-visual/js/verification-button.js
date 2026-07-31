document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("menuBtn");
  const modal = document.getElementById("menu1");
  const closeBtn = document.getElementById("closeBtn");

  if (!btn || !modal || !closeBtn) return;

  const overlay = modal.querySelector(".overlay");
  if (!overlay) return;

  let scrollY = 0;

  btn.onclick = () => {
    scrollY = window.scrollY;
    document.body.classList.add("modal-open");
    document.body.style.top = `-${scrollY}px`;
    modal.classList.add("active");
  };

  function closeModal() {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
    document.body.style.top = "";
    window.scrollTo(0, scrollY);
  }

  closeBtn.onclick = closeModal;
  overlay.onclick = closeModal;

});