// =============================================
// Apoio à Proteção Animal - Guariba
// script.js — Interatividade Global
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Menu Hamburguer ---
  const toggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('ativo');
      navMenu.classList.toggle('aberto');
    });

    // Fechar menu ao clicar em um link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('ativo');
        navMenu.classList.remove('aberto');
      });
    });
  }

  // --- Animação de entrada dos cards ao rolar a página ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card-animal').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });

  // --- Validação do Formulário de Contato ---
  const form = document.getElementById('form-contato');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = form.querySelector('#nome');
      const email = form.querySelector('#email');
      const mensagem = form.querySelector('#mensagem');
      let valido = true;

      // Limpar erros anteriores
      form.querySelectorAll('.erro-msg').forEach(el => el.remove());
      form.querySelectorAll('.campo-erro').forEach(el => el.classList.remove('campo-erro'));

      if (!nome.value.trim()) {
        mostrarErro(nome, 'Por favor, informe seu nome.');
        valido = false;
      }

      if (!email.value.trim() || !validarEmail(email.value)) {
        mostrarErro(email, 'Informe um e-mail válido.');
        valido = false;
      }

      if (!mensagem.value.trim()) {
        mostrarErro(mensagem, 'Escreva sua mensagem.');
        valido = false;
      }

      if (valido) {
        mostrarSucesso();
        form.reset();
      }
    });
  }

  function mostrarErro(campo, msg) {
    campo.classList.add('campo-erro');
    const erro = document.createElement('span');
    erro.className = 'erro-msg';
    erro.textContent = msg;
    campo.parentNode.appendChild(erro);
  }

  function mostrarSucesso() {
    const alerta = document.createElement('div');
    alerta.className = 'alerta-sucesso';
    alerta.textContent = '✅ Mensagem enviada com sucesso! Entraremos em contato em breve.';
    form.insertAdjacentElement('beforebegin', alerta);
    setTimeout(() => alerta.remove(), 4000);
  }

  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

});