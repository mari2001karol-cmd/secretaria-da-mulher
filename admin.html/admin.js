// CREDENCIAIS EM MEMÓRIA
let usuarioValido = "secretariadamulher@lajedo.pe.gov.br";
let senhaValida = "secretari@26";
const CHAVE_MESTRA = "LA-SECRETARIA#";

// VALORES PADRÕES INICIAIS DO SITE CASO O LOCALSTORAGE ESTEJA VAZIO
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

// SELETORES GERAIS
const loginContainer = document.getElementById("login-container-box");
const dashboardPanel = document.getElementById("dashboard-panel");
const formLogin = document.getElementById("form-login");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const btnLogout = document.getElementById("btn-logout");

// SELETORES MODAL
const btnEsqueci = document.getElementById("btn-esqueci");
const modalRecovery = document.getElementById("modal-recovery");
const btnCloseModal = document.getElementById("btn-close-modal");
const stepKey = document.getElementById("step-key");
const recoveryKeyInput = document.getElementById("recovery-key");
const btnVerifyKey = document.getElementById("btn-verify-key");
const stepNewPassword = document.getElementById("step-new-password");
const newPasswordInput = document.getElementById("new-password");
const confirmPasswordInput = document.getElementById("confirm-password");
const btnSavePassword = document.getElementById("btn-save-password");

// INTERATIVIDADE DO OLHINHO
document.querySelectorAll(".toggle-password").forEach((icon) => {
  icon.addEventListener("click", function () {
    const targetId = this.getAttribute("data-target");
    const inputField = document.getElementById(targetId);
    inputField.type = inputField.type === "password" ? "text" : "password";
    this.classList.toggle("bi-eye");
    this.classList.toggle("bi-eye-slash");
  });
});

// ABRIR/FECHAR MODAL RECUPERAÇÃO
btnEsqueci.addEventListener("click", (e) => {
  e.preventDefault();
  modalRecovery.classList.add("active");
  stepKey.style.display = "block";
  stepNewPassword.style.display = "none";
  recoveryKeyInput.value = "";
  newPasswordInput.value = "";
  confirmPasswordInput.value = "";
});
btnCloseModal.addEventListener("click", () =>
  modalRecovery.classList.remove("active"),
);

function validarChaveMaster() {
  if (recoveryKeyInput.value.trim() === CHAVE_MESTRA) {
    stepKey.style.display = "none";
    stepNewPassword.style.display = "block";
    setTimeout(() => newPasswordInput.focus(), 50);
  } else {
    alert("Erro: Chave mestra incorreta.");
  }
}
btnVerifyKey.addEventListener("click", (e) => {
  e.preventDefault();
  validarChaveMaster();
});
recoveryKeyInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    validarChaveMaster();
  }
});

// COMPUTAÇÃO DA ALTERAÇÃO DE SENHA
function processarNovaSenha() {
  const ns = newPasswordInput.value;
  if (ns !== confirmPasswordInput.value) {
    alert("As senhas não coincidem.");
    return;
  }
  if (!/[a-zA-Z]/.test(ns) || !/[0-9!@#$%^&*()]/.test(ns)) {
    alert("A nova senha exige letras e números/símbolos.");
    return;
  }
  senhaValida = ns;
  alert("Senha alterada com sucesso!");
  modalRecovery.classList.remove("active");
  emailInput.value = "";
  passwordInput.value = "";
  emailInput.focus();
}
btnSavePassword.addEventListener("click", (e) => {
  e.preventDefault();
  processarNovaSenha();
});

// =========================================================
// GESTÃO DAS ABAS E SINCRONIZAÇÃO DO LOCALSTORAGE
// =========================================================

// Evento de Login e entrada no Painel
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    emailInput.value === usuarioValido &&
    passwordInput.value === senhaValida
  ) {
    loginContainer.style.display = "none";
    dashboardPanel.style.setProperty("display", "flex", "important");
    window.scrollTo(0, 0);
    carregarDadosNosFormularios(); // Preenche as caixas com o que já está salvo
  } else {
    alert("Credenciais inválidas.");
  }
});

btnLogout.addEventListener("click", (e) => {
  e.preventDefault();
  dashboardPanel.style.setProperty("display", "none", "important");
  loginContainer.style.display = "block";
});

// Alternar entre abas do painel lateral
document.querySelectorAll(".nav-tab").forEach((tab) => {
  tab.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelectorAll(".nav-tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".tab-content-item")
      .forEach((c) => (c.style.display = "none"));

    this.classList.add("active");
    const activeTabId = this.getAttribute("data-tab");
    document.getElementById(activeTabId).style.display = "block";

    // Atualiza o título do cabeçalho da dashboard
    document.getElementById("tab-title").innerText =
      this.querySelector("a").innerText;
  });
});

// FUNÇÃO PARA CARREGAR OS DADOS DO LOCALSTORAGE E EXIBIR NOS INPUTS
function carregarDadosNosFormularios() {
  // 1. Aba Textos
  document.getElementById("txt-titulo-principal").value =
    localStorage.getItem("site-titulo") || padraoTextos.tituloPrincipal;
  document.getElementById("txt-desc-principal").value =
    localStorage.getItem("site-desc") || padraoTextos.descPrincipal;
  document.getElementById("txt-sobre-secretaria").value =
    localStorage.getItem("site-sobre") || padraoTextos.sobreSecretaria;

  // 2. Aba Ajuda
  document.getElementById("tel-secretaria").value =
    localStorage.getItem("ajuda-tel-sec") || padraoAjuda.telSecretaria;
  document.getElementById("tel-patrulha").value =
    localStorage.getItem("ajuda-tel-pat") || padraoAjuda.telPatrulha;
  document.getElementById("end-secretaria").value =
    localStorage.getItem("ajuda-end") || padraoAjuda.endSecretaria;

  // 3. Aba FAQ
  document.getElementById("faq-q-1").value =
    localStorage.getItem("faq-q-1") || padraoFaq.q1;
  document.getElementById("faq-a-1").value =
    localStorage.getItem("faq-a-1") || padraoFaq.a1;
  document.getElementById("faq-q-2").value =
    localStorage.getItem("faq-q-2") || padraoFaq.q2;
  document.getElementById("faq-a-2").value =
    localStorage.getItem("faq-a-2") || padraoFaq.a2;
  document.getElementById("faq-q-3").value =
    localStorage.getItem("faq-q-3") || padraoFaq.q3;
  document.getElementById("faq-a-3").value =
    localStorage.getItem("faq-a-3") || padraoFaq.a3;

  // 4. Aba Notícias
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`not-tit-${i}`).value =
      localStorage.getItem(`not-tit-${i}`) || padraoNoticias[i - 1].t;
    document.getElementById(`not-desc-${i}`).value =
      localStorage.getItem(`not-desc-${i}`) || padraoNoticias[i - 1].d;
  }
}

// ================= OUVINTES DE SALVAMENTO DOS FORMULÁRIOS =================

// Salvar Textos
document.getElementById("form-textos").addEventListener("submit", (e) => {
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
  alert("Textos e Frases institucionais atualizados com sucesso!");
});

// Salvar Contatos
document.getElementById("form-ajuda").addEventListener("submit", (e) => {
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
  alert("Canais de ajuda e endereço físico salvos!");
});

// Salvar FAQ
document.getElementById("form-faq").addEventListener("submit", (e) => {
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
  alert("Perguntas frequentes sincronizadas!");
});

// Salvar Notícias (Textos)
document.getElementById("form-noticias").addEventListener("submit", (e) => {
  e.preventDefault();
  for (let i = 1; i <= 4; i++) {
    localStorage.setItem(
      `not-tit-${i}`,
      document.getElementById(`not-tit-${i}`).value,
    );
    localStorage.setItem(
      `not-desc-${i}`,
      document.getElementById(`not-desc-${i}`).value,
    );

    // Processa upload de imagem se houver
    const fileInput = document.getElementById(`not-img-${i}`);
    if (fileInput.files.length > 0) {
      salvarImagemBase64(fileInput.files[0], `site-img-noticia-${i}`);
    }
  }
  alert("Os 4 cards de notícias foram guardados com sucesso!");
});

// Salvar Imagens Institucionais
document.getElementById("form-imagens").addEventListener("submit", (e) => {
  e.preventDefault();
  const logo = document.getElementById("img-logo").files[0];
  const banner = document.getElementById("img-banner").files[0];
  const sobre = document.getElementById("img-sobre").files[0];

  if (logo) salvarImagemBase64(logo, "site-img-logo");
  if (banner) salvarImagemBase64(banner, "site-img-banner");
  if (sobre) salvarImagemBase64(sobre, "site-img-sobre");

  alert(
    "As imagens selecionadas estão sendo processadas e armazenadas localmente!",
  );
});

// FUNÇÃO AUXILIAR: CONVERTE IMAGEM UPADA PARA STRING BASE64 E GUARDA NO MINI-BANCO LOCAL
function salvarImagemBase64(file, keyName) {
  const reader = new FileReader();
  reader.onload = function (event) {
    try {
      localStorage.setItem(keyName, event.target.result);
    } catch (error) {
      alert(
        "Erro: A imagem escolhida é muito pesada para o mini-banco local. Escolha uma foto mais leve ou comprimida.",
      );
    }
  };
  reader.readAsDataURL(file);
}
