// Aguarda o carregamento do esqueleto do HTML para aplicar os dados e comportamentos
document.addEventListener("DOMContentLoaded", () => {
  // =========================================================
  // 6. ATUALIZAÇÃO DA PÁGINA INTERNA DA NOTÍCIA (LER MAIS)
  // =========================================================

  // Se estivermos na tela de leitura da Notícia 1
  const imgNoticia1 = localStorage.getItem("site-img-noticia-1");
  const titNoticia1 = localStorage.getItem("not-tit-1");
  const descNoticia1 = localStorage.getItem("not-desc-1");

  // 1. Atualiza a imagem principal grande da matéria
  const imgDetalhePrincipal = document.querySelector(
    ".noticia-detalhe img, article img, img[alt='Imagem Informativa']",
  );
  if (imgDetalhePrincipal && imgNoticia1) {
    imgDetalhePrincipal.src = imgNoticia1;
  }

  // 2. Atualiza o título e o resumo principal dentro da página da notícia
  const tituloDetalhe = document.querySelector(
    ".noticia-detalhe h1, article h1",
  );
  if (tituloDetalhe && titNoticia1) {
    tituloDetalhe.innerText = titNoticia1;
  }

  // 3. Atualiza a miniatura na barra lateral "Mais Recentes"
  const miniaturasRecentes = document.querySelectorAll(
    ".mais-recentes img, .sidebar-noticias img",
  );
  if (miniaturasRecentes.length > 0 && imgNoticia1) {
    miniaturasRecentes[0].src = imgNoticia1;
  }
  // =========================================================
  // 1. COMPORTAMENTO DO MENU HAMBÚRGUER & LINKS (MOBILE)
  // =========================================================
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");

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

  // =========================================================
  // 2. SINCRONIZAÇÃO AUTOMÁTICA COM O PAINEL ADMINISTRATIVO
  // =========================================================

  // 1. ATUALIZAR IMAGENS E LOGOS INSTITUCIONAIS
  const logoSalva = localStorage.getItem("site-img-logo");
  const bannerSalvo = localStorage.getItem("site-img-banner");
  const sobreSalvo = localStorage.getItem("site-img-sobre");

  if (logoSalva) {
    document
      .querySelectorAll(".logo img, img[src*='logo.png']")
      .forEach((img) => {
        img.src = logoSalva;
      });
  }
  if (bannerSalvo) {
    const imgBanner = document.querySelector(
      ".hero-image, .home-banner img, .introducao img",
    );
    if (imgBanner) imgBanner.src = bannerSalvo;
  }
  if (sobreSalvo) {
    const imgSobre = document.querySelector(
      ".banner img, #sobre img, .sobre-img img",
    );
    if (imgSobre) imgSobre.src = sobreSalvo;
  }

  // 2. ATUALIZAR TEXTOS E FRASES DA INTRODUÇÃO (MANTÉM CORES E QUEBRAS)
  const tituloPrincipal = localStorage.getItem("site-titulo");
  const descPrincipal = localStorage.getItem("site-desc");
  const sobreTexto = localStorage.getItem("site-sobre");

  if (tituloPrincipal) {
    const elTitulo = document.querySelector(
      ".hero-content h1, .introducao h1, .hero h1",
    );
    if (elTitulo) {
      // Converte quebras de linha em <br> e permite utilizar a tag <span> para texto rosa
      elTitulo.innerHTML = tituloPrincipal.replace(/\n/g, "<br>");
    }
  }
  if (descPrincipal) {
    const elDesc = document.querySelector(
      ".hero-content p, .introducao p, .hero p",
    );
    if (elDesc) elDesc.innerText = descPrincipal;
  }
  if (sobreTexto) {
    const elSobre = document.querySelector(
      ".secretaria-col-principal p, #sobre p, .sobre-texto p",
    );
    if (elSobre) elSobre.innerText = sobreTexto;
  }

  // 3. ATUALIZAR CONTATOS DE AJUDA E ENDEREÇO
  const telSec = localStorage.getItem("ajuda-tel-sec");
  const telPat = localStorage.getItem("ajuda-tel-pat");
  const endereco = localStorage.getItem("ajuda-end");

  const canais = document.querySelectorAll(".card-ajuda .canal");
  if (canais.length >= 2) {
    if (telSec) {
      const pSec = canais[0].querySelector("p");
      if (pSec) pSec.innerText = telSec;
    }
    if (telPat) {
      const pPat = canais[1].querySelector("p");
      if (pPat) pPat.innerText = telPat;
    }
  }

  if (endereco) {
    const elEnd = document.querySelector("footer address, .endereco-texto");
    if (elEnd) elEnd.innerText = endereco;
  }

  // 4. ATUALIZAR OS 4 CARDS DE NOTÍCIAS (COM IMAGENS BASE64)
  const cardsNoticias = document.querySelectorAll(
    ".noticia-card, .card-noticia",
  );
  if (cardsNoticias.length >= 4) {
    for (let i = 1; i <= 4; i++) {
      const titSalvo = localStorage.getItem(`not-tit-${i}`);
      const descSalva = localStorage.getItem(`not-desc-${i}`);
      const imgSalva = localStorage.getItem(`site-img-noticia-${i}`);

      const card = cardsNoticias[i - 1];
      if (card) {
        const elTit = card.querySelector("h3, .titulo-noticia");
        const elDesc = card.querySelector("p, .resumo-noticia");
        const elImg = card.querySelector("img");

        if (titSalvo && elTit) elTit.innerText = titSalvo;
        if (descSalva && elDesc) elDesc.innerText = descSalva;
        if (imgSalva && elImg) elImg.src = imgSalva;
      }
    }
  }

  // 5. ATUALIZAR PERGUNTAS FREQUENTES (FAQ)
  const itensFaq = document.querySelectorAll(".faq-item, .accordion-item");
  if (itensFaq.length >= 3) {
    for (let i = 1; i <= 3; i++) {
      const qSalva = localStorage.getItem(`faq-q-${i}`);
      const aSalva = localStorage.getItem(`faq-a-${i}`);

      const item = itensFaq[i - 1];
      if (item) {
        const elQ = item.querySelector(".faq-question, .accordion-button, h4");
        const elA = item.querySelector(".faq-answer, .accordion-body, p");

        if (qSalva && elQ) elQ.innerText = qSalva;
        if (aSalva && elA) elA.innerText = aSalva;
      }
    }
  }
});

// =========================================================
// 3. CORREÇÃO DA ROLAGEM CORTADA (Roda após carregar tudo)
// =========================================================
window.addEventListener("load", () => {
  if (window.location.hash) {
    const hash = window.location.hash;
    const elementoAlvo = document.querySelector(hash);

    if (elementoAlvo) {
      setTimeout(() => {
        const alturaHeader = 90;
        const margemSeguranca = 30;

        const posicaoElemento =
          elementoAlvo.getBoundingClientRect().top + window.scrollY;
        const posicaoFinal = posicaoElemento - alturaHeader - margemSeguranca;

        window.scrollTo({
          top: posicaoFinal,
          behavior: "smooth",
        });
      }, 100);
    }
  }
});
