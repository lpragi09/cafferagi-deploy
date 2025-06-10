

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


});

