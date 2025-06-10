

document.addEventListener('DOMContentLoaded', function() {
    console.log("Site Liceria Coffee Shop carregado!");

    // Exemplo: Adicionar classe 'active' ao link da página atual (opcional)
    // Esta é uma forma simples, você pode querer uma lógica mais robusta.
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('header nav ul li a');

    navLinks.forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('href') === currentPage
        );

    });

    // Pequena animação para as linhas decorativas na página inicial (opcional)
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const lines = document.querySelectorAll('.decorative-lines span');
        lines.forEach((span, index) => {
            span.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            // Força o reflow para a transição funcionar no carregamento
            void span.offsetWidth; // eslint-disable-line no-void
            // Se quiser que apareçam depois de um tempo:
            // setTimeout(() => {
            //    span.style.opacity = '0.7';
            //    // Se tiver transformações iniciais diferentes, pode resetá-las aqui
            // }, 500 + (index * 100));
        });
    }
 // --- Configuração e Envio do EmailJS ---

    // Inicialize o EmailJS com sua Public Key
    // Sua Public Key: 6FWXo0zidPBs_qRLe
    emailjs.init({
        publicKey: "6FWXo0zidPBs_qRLe",
    });

    // Adicione um listener para o evento de submit do formulário
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário (recarrega a página)

            // Substitua pelos IDs que você obteve no painel do EmailJS
            const serviceID = 'service_he5tqrd'; // Ex: 'default_service' ou 'gmail_service'
            const templateID = 'template_dmhbmna'; // Ex: 'contact_form_template'

            // Envia o formulário usando o EmailJS
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
                    contactForm.reset(); // Limpa o formulário após o envio bem-sucedido
                }, (error) => {
                    console.error('Falha ao enviar a mensagem:', error);
                    alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.');
                });
        });
    } else {
        console.warn("Elemento 'contact-form' não encontrado. O formulário de contato pode não funcionar.");
    }
});

