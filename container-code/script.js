// Seleciona todos os botões
        const copyButtons = document.querySelectorAll(".copyBtn");

        copyButtons.forEach(btn => {
          btn.addEventListener("click", () => {
            // Encontra o <code> dentro do mesmo container
            const codeBlock = btn.closest(".code-wrapper").querySelector(".codeBlock");
            navigator.clipboard.writeText(codeBlock.textContent).then(() => {
              btn.textContent = "Copiado!";
            setTimeout(() => (btn.textContent = "Copiar"), 1500);
                });
             });
         });