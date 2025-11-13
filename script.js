const menu = document.getElementById('menu');
const nav = document.getElementById('nav');
const form = document.querySelector("form");
const feedback = document.getElementById("feedback");
const btnWhats = document.getElementById("btnWhats");

menu.addEventListener('click', () => {
    nav.classList.toggle('ativo');
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        nav.classList.remove('ativo');
    }
});

menu.addEventListener('click', () => {
    const ativo = nav.classList.toggle('ativo');
    menu.setAttribute('aria-expanded', ativo);
});

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mouseover", () => {
        card.style.background = "#e3f2fd";
    });
    card.addEventListener("mouseout", () => {
        card.style.background = "white";
    });
});

window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.style.background = "#1e88e5";
    } else {
        header.style.background = "#0d47a1";
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const botaoClicado = e.submitter;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    feedback.classList.remove("erro", "sucesso");

    if (!nome || !email || !mensagem) {
        feedback.textContent = "Por favor, preencha todos os campos antes de enviar.";
        feedback.classList.add("erro");
        feedback.style.opacity = 1;
        setTimeout(() => (feedback.style.opacity = 0), 5000);
        return;
    }

    if (!regexEmail.test(email)) {
        feedback.textContent = "O e-mail informado não é válido. Verifique o formato (ex: nome@exemplo.com)";
        feedback.classList.add("erro");
        feedback.style.opacity = 1;
        setTimeout(() => (feedback.style.opacity = 0), 5000);
        return;
    }

    if (botaoClicado.id === "btnWhats") { // Clique no botão do WhatsApp
        const numero = "5563984116768";
        const texto = `Olá! Meu nome é ${nome} (${email}).\n\n${mensagem}`;
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
        window.open(url, "_blank");
    } else { // Clique no botão de Enviar
        feedback.textContent = "Mensagem enviada com sucesso!";
        feedback.classList.add("sucesso");
        feedback.style.opacity = 1;
        setTimeout(() => (feedback.style.opacity = 0), 5000);
    }

    form.reset(); // limpa os dados após o envio
});