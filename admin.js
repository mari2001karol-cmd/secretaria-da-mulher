// CREDENCIAIS EM MEMÓRIA (INICIAIS)
let usuarioValido = "secretariadamulher@lajedo.pe.gov.br";
let senhaValida = "secretari@26";
const CHAVE_MESTRA = "LA-SECRETARIA#";

// VALORES PADRÕES PARA PREENCHER OS FORMULÁRIOS
const padraoTextos = {
  tituloPrincipal:
    "Respeito, igualdade\ne oportunidades\npara todas as mulheres.",
  descPrincipal:
    "Trabalhamos para promover políticas públicas, acolhimento e ações que fortalecem os direitos das mulheres do município.",
  sobreSecretaria:
    "A Secretaria da Mulher de Lajedo é um órgão oficial dedicado a amparar, capacitar e proteger todas as cidadãs lajedenses, unindo forças com redes de apoio e segurança.",
};

const padraoAjuda = {
  telSecretaria: "(87) 3773-4700",
  telPatrulha: "(87) 98822-1190",
  endSecretaria: "Av. LA-SECRETARIA, Nº 123, Centro, Lajedo - PE",
};

const padraoFaq = {
  q1: "Os atendimentos são totalmente sigilosos?",
  a1: "Sim. Todo apoio psicológico, social e jurídico prestado pela equipe da Secretaria é protegido por sigilo absoluto de dados.",
  q2: "Como participar das oficinas oferecidas?",
  a2: "As inscrições abrem periodicamente e são divulgadas no feed. Mulheres residentes em Lajedo podem se inscrever apresentando RG e comprovante de residência.",
  q3: "Como posso denunciar em caso de urgência?",
  a3: "Você pode ligar diretamente para o Ligue 180, para a nossa central local no painel ou se dirigir imediatamente à Delegacia do município.",
};

const padraoNoticias = [
  {
    t: "Oficina de Geração de Renda abre 40 vagas no Centro",
    d: "Capacitações em artesanato e culinária buscam impulsionar o empreendedorismo feminino no município.",
  },
  {
    t: "Rodas de Conversa marcam ações do Agosto Lilás nas comunidades",
    d: "Equipe técnica percorreu bairros periféricos tirando dúvidas e distribuindo materiais explicativos.",
  },
  {
    t: "Parceria garante ampliação de atendimentos jurídicos na sede",
    d: "Novo cronograma de plantões facilita o acesso à assistência legal especializada de forma gratuita.",
  },
  {
    t: "Secretaria realiza balanço das ações anuais de acolhimento",
    d: "Relatório aponta aumento significativo nos índices de resolutividade e engajamento em palestras locais.",
  },
];

// =========================================================
// 1. FUNÇÕES GLOBAIS DE CONTROLE DO MODAL
// =========================================================

function abrirModalRecuperacao(e) {
  if (e) e.preventDefault();
  const modal = document.getElementById("modal-recovery");
  const stepKey = document.getElementById("step-key");
  const stepNewPassword = document.getElementById("step-new-password");
  const inputChave = document.getElementById("recovery-key");

  if (modal) {
    modal.style.setProperty("display", "flex", "important");
    modal.classList.add("active");
    if (stepKey) stepKey.style.display = "block";
    if (stepNewPassword) stepNewPassword.style.display = "none";
    if (inputChave) {
      inputChave.value = "";
      setTimeout(() => inputChave.focus(), 50);
    }
  }
}

function fecharModalRecuperacao(e) {
  if (e) e.preventDefault();
  const modal = document.getElementById("modal-recovery");
  if (modal) {
    modal.style.setProperty("display", "none", "important");
    modal.classList.remove("active");
  }
}

function verificarChaveMestra(e) {
  if (e) e.preventDefault();
  const inputChave = document.getElementById("recovery-key");
  const stepKey = document.getElementById("step-key");
  const stepNewPassword = document.getElementById("step-new-password");
  const inputNovaSenha = document.getElementById("new-password");

  if (inputChave && inputChave.value.trim() === CHAVE_MESTRA) {
    if (stepKey) stepKey.style.display = "none";
    if (stepNewPassword) stepNewPassword.style.display = "block";
    if (inputNovaSenha) setTimeout(() => inputNovaSenha.focus(), 50);
  } else {
    alert("Chave mestra incorreta! Tente novamente.");
  }
}

function salvarNovaSenha(e) {
  if (e) e.preventDefault();
  const inputNovaSenha = document.getElementById("new-password");
  const inputConfirmar = document.getElementById("confirm-password");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (!inputNovaSenha || !inputConfirmar) return;

  if (inputNovaSenha.value !== inputConfirmar.value) {
    alert("As senhas não coincidem!");
    return;
  }

  if (inputNovaSenha.value.trim() === "") {
    alert("A senha não pode ser vazia!");
    return;
  }

  senhaValida = inputNovaSenha.value;
  alert(
    "Senha alterada com sucesso! Agora você já pode entrar com a nova senha.",
  );

  fecharModalRecuperacao();
  if (emailInput) emailInput.value = "";
  if (passwordInput) passwordInput.value = "";
  if (emailInput) emailInput.focus();
}

// Função auxiliar para converter arquivo em Base64 e salvar no localStorage
function salvarImagemBase64(file, keyName) {
  const reader = new FileReader();
  reader.onload = function (event) {
    try {
      localStorage.setItem(keyName, event.target.result);
    } catch (error) {
      alert(
        "A imagem selecionada é muito pesada para o navegador. Tente uma foto de tamanho menor.",
      );
    }
  };
  reader.readAsDataURL(file);
}

// =========================================================
// 2. AÇÕES PRINCIPAIS E MANUTENÇÃO DE SESSÃO
// =========================================================
window.addEventListener("load", () => {
  const formLogin = document.getElementById("form-login");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginContainer = document.getElementById("login-container-box");
  const dashboardPanel = document.getElementById("dashboard-panel");
  const btnLogout = document.getElementById("btn-logout");

  // VERIFICA SE JÁ ESTÁ LOGADO AO RECARREGAR A TELA (F5)
  if (localStorage.getItem("usuario_logado") === "true") {
    if (loginContainer) loginContainer.style.display = "none";
    if (dashboardPanel)
      dashboardPanel.style.setProperty("display", "flex", "important");
    carregarValoresNosFormularios();
  }

  // BOTÕES MODAL
  const btnCloseModal = document.getElementById("btn-close-modal");
  if (btnCloseModal) btnCloseModal.onclick = fecharModalRecuperacao;

  const btnVerifyKey = document.getElementById("btn-verify-key");
  if (btnVerifyKey) btnVerifyKey.onclick = verificarChaveMestra;

  const btnSavePassword = document.getElementById("btn-save-password");
  if (btnSavePassword) btnSavePassword.onclick = salvarNovaSenha;

  // OLHINHO
  document.querySelectorAll(".toggle-password").forEach((icon) => {
    icon.onclick = function () {
      const targetId = this.getAttribute("data-target");
      const inputField = document.getElementById(targetId);
      if (inputField) {
        inputField.type = inputField.type === "password" ? "text" : "password";
        this.classList.toggle("bi-eye");
        this.classList.toggle("bi-eye-slash");
      }
    };
  });

  // LOGIN COM PERSISTÊNCIA
  if (formLogin) {
    formLogin.onsubmit = function (e) {
      e.preventDefault();

      if (
        emailInput.value.trim() === usuarioValido &&
        passwordInput.value === senhaValida
      ) {
        localStorage.setItem("usuario_logado", "true");
        if (loginContainer) loginContainer.style.display = "none";
        if (dashboardPanel)
          dashboardPanel.style.setProperty("display", "flex", "important");
        window.scrollTo(0, 0);
        carregarValoresNosFormularios();
      } else {
        alert("E-mail funcional ou senha incorretos!");
      }
    };
  }

  // LOGOUT LIMPA A SESSÃO
  if (btnLogout) {
    btnLogout.onclick = function (e) {
      e.preventDefault();
      localStorage.removeItem("usuario_logado");
      if (dashboardPanel)
        dashboardPanel.style.setProperty("display", "none", "important");
      if (loginContainer) loginContainer.style.display = "block";
    };
  }

  // NAVEGAÇÃO ABAS
  document.querySelectorAll(".sidebar-menu .nav-tab").forEach((tab) => {
    tab.onclick = function (e) {
      e.preventDefault();
      document
        .querySelectorAll(".nav-tab")
        .forEach((t) => t.classList.remove("active"));
      document
        .querySelectorAll(".tab-content-item")
        .forEach((c) => (c.style.display = "none"));

      this.classList.add("active");
      const targetTab = this.getAttribute("data-tab");
      const elTarget = document.getElementById(targetTab);
      if (elTarget) elTarget.style.display = "block";

      const titleHeader = document.getElementById("tab-title");
      if (titleHeader)
        titleHeader.innerText = this.querySelector("a").innerText;
    };
  });

  // CARREGAR DADOS SALVOS NOS INPUTS
  function carregarValoresNosFormularios() {
    const tit = document.getElementById("txt-titulo-principal");
    const desc = document.getElementById("txt-desc-principal");
    const sob = document.getElementById("txt-sobre-secretaria");

    if (tit)
      tit.value =
        localStorage.getItem("site-titulo") || padraoTextos.tituloPrincipal;
    if (desc)
      desc.value =
        localStorage.getItem("site-desc") || padraoTextos.descPrincipal;
    if (sob)
      sob.value =
        localStorage.getItem("site-sobre") || padraoTextos.sobreSecretaria;

    const telSec = document.getElementById("tel-secretaria");
    const telPat = document.getElementById("tel-patrulha");
    const endSec = document.getElementById("end-secretaria");

    if (telSec)
      telSec.value =
        localStorage.getItem("ajuda-tel-sec") || padraoAjuda.telSecretaria;
    if (telPat)
      telPat.value =
        localStorage.getItem("ajuda-tel-pat") || padraoAjuda.telPatrulha;
    if (endSec)
      endSec.value =
        localStorage.getItem("ajuda-end") || padraoAjuda.endSecretaria;

    for (let i = 1; i <= 3; i++) {
      const q = document.getElementById(`faq-q-${i}`);
      const a = document.getElementById(`faq-a-${i}`);
      if (q) q.value = localStorage.getItem(`faq-q-${i}`) || padraoFaq[`q${i}`];
      if (a) a.value = localStorage.getItem(`faq-a-${i}`) || padraoFaq[`a${i}`];
    }

    for (let i = 1; i <= 4; i++) {
      const t = document.getElementById(`not-tit-${i}`);
      const d = document.getElementById(`not-desc-${i}`);
      if (t)
        t.value =
          localStorage.getItem(`not-tit-${i}`) || padraoNoticias[i - 1].t;
      if (d)
        d.value =
          localStorage.getItem(`not-desc-${i}`) || padraoNoticias[i - 1].d;
    }
  }

  // SUBMIT FORMULÁRIO TEXTOS
  const formTextos = document.getElementById("form-textos");
  if (formTextos) {
    formTextos.onsubmit = function (e) {
      e.preventDefault();
      localStorage.setItem(
        "site-titulo",
        document.getElementById("txt-titulo-principal").value,
      );
      localStorage.setItem(
        "site-desc",
        document.getElementById("txt-desc-principal").value,
      );
      localStorage.setItem(
        "site-sobre",
        document.getElementById("txt-sobre-secretaria").value,
      );
      alert("Textos atualizados com sucesso!");
    };
  }

  // SUBMIT FORMULÁRIO IMAGENS INSTITUCIONAIS
  const formImagens = document.getElementById("form-imagens");
  if (formImagens) {
    formImagens.onsubmit = function (e) {
      e.preventDefault();
      const logo = document.getElementById("img-logo").files[0];
      const banner = document.getElementById("img-banner").files[0];
      const sobre = document.getElementById("img-sobre").files[0];

      if (logo) salvarImagemBase64(logo, "site-img-logo");
      if (banner) salvarImagemBase64(banner, "site-img-banner");
      if (sobre) salvarImagemBase64(sobre, "site-img-sobre");

      alert("As novas fotos foram enviadas e atualizadas com sucesso!");
    };
  }

  // SUBMIT FORMULÁRIO NOTÍCIAS (COM IMAGENS)
  const formNoticias = document.getElementById("form-noticias");
  if (formNoticias) {
    formNoticias.onsubmit = function (e) {
      e.preventDefault();
      for (let i = 1; i <= 4; i++) {
        const tit = document.getElementById(`not-tit-${i}`).value;
        const desc = document.getElementById(`not-desc-${i}`).value;
        const fileInput = document.getElementById(`not-img-${i}`);

        localStorage.setItem(`not-tit-${i}`, tit);
        localStorage.setItem(`not-desc-${i}`, desc);

        if (fileInput && fileInput.files.length > 0) {
          salvarImagemBase64(fileInput.files[0], `site-img-noticia-${i}`);
        }
      }
      alert("Notícias e fotos salvas com sucesso!");
    };
  }

  // SUBMIT FORMULÁRIO CANAIS DE AJUDA
  const formAjuda = document.getElementById("form-ajuda");
  if (formAjuda) {
    formAjuda.onsubmit = function (e) {
      e.preventDefault();
      localStorage.setItem(
        "ajuda-tel-sec",
        document.getElementById("tel-secretaria").value,
      );
      localStorage.setItem(
        "ajuda-tel-pat",
        document.getElementById("tel-patrulha").value,
      );
      localStorage.setItem(
        "ajuda-end",
        document.getElementById("end-secretaria").value,
      );
      alert("Canais de ajuda salvos!");
    };
  }

  // SUBMIT FORMULÁRIO FAQ
  const formFaq = document.getElementById("form-faq");
  if (formFaq) {
    formFaq.onsubmit = function (e) {
      e.preventDefault();
      for (let i = 1; i <= 3; i++) {
        localStorage.setItem(
          `faq-q-${i}`,
          document.getElementById(`faq-q-${i}`).value,
        );
        localStorage.setItem(
          `faq-a-${i}`,
          document.getElementById(`faq-a-${i}`).value,
        );
      }
      alert("Perguntas frequentes salvas!");
    };
  }
});
