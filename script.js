// Aguarda o carregamento completo do HTML e de todos os elementos (incluindo imagens)
window.addEventListener("load", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  // 1. COMPORTAMENTO DO MENU HAMBÚRGUER (MOBILE)
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      const icon = menuToggle.querySelector("i");
      if (navMenu.classList.contains("active")) {
        icon.className = "bi bi-x-lg";
      } else {
        icon.className = "bi bi-list";
      }
    });
  }

  // Fecha o menu lateral automaticamente ao clicar em qualquer link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        menuToggle.querySelector("i").className = "bi bi-list";
      }
    });
  });

  // 2. CORREÇÃO DA ROLAGEM CORTADA (Cálculo Inteligente pós-carregamento)
  // Verifica se a URL atual possui uma âncora (ex: #ajuda-section)
  if (window.location.hash) {
    const hash = window.location.hash;
    const elementoAlvo = document.querySelector(hash);

    if (elementoAlvo) {
      // Pequena pausa para garantir que o navegador terminou de renderizar o layout
      setTimeout(() => {
        const alturaHeader = 90; // Altura exata do seu cabeçalho fixo em pixels
        const margemSeguranca = 30; // Margem extra para o topo arredondado respirar

        // Calcula a posição exata do elemento na tela desconsiderando o cabeçalho
        const posicaoElemento =
          elementoAlvo.getBoundingClientRect().top + window.scrollY;
        const posicaoFinal = posicaoElemento - alturaHeader - margemSeguranca;

        // Executa a rolagem suave perfeita e calibrada
        window.scrollTo({
          top: posicaoFinal,
          behavior: "smooth",
        });
      }, 100);
    }
  }
});
