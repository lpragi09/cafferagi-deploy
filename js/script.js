document.addEventListener('DOMContentLoaded', function() {
    console.log("Site CAFFÈ RAGI carregado!"); // Corrigido para o nome da sua empresa

    // --- LÓGICA DO MENU ATIVO ---
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        // Corrigido para uma verificação mais precisa que funciona em subpastas
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });

    // --- ANIMAÇÃO DA PÁGINA INICIAL ---
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const lines = document.querySelectorAll('.decorative-lines span');
        lines.forEach((span, index) => {
            span.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            void span.offsetWidth;
        });
    }

    // --- LÓGICA DO FORMULÁRIO DE CONTATO (AGORA SÓ RODA NA PÁGINA CERTA) ---
    const contactForm = document.getElementById('contact-form');
    // Verifica se o formulário E a biblioteca EmailJS existem antes de rodar
    if (contactForm && typeof emailjs !== 'undefined') {

        // Inicializa o EmailJS
        emailjs.init({
            publicKey: "6FWXo0zidPBs_qRLe", // Sua Public Key
        });

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const serviceID = 'service_he5tqrd';
            const templateID = 'template_dmhbmna';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
                    contactForm.reset();
                }, (error) => {
                    console.error('Falha ao enviar a mensagem:', error);
                    alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.');
                });
        });
    }

    // --- LÓGICA PARA O MODAL DE DETALHES DO PRODUTO ---
    const detailsIcons = document.querySelectorAll('.details-icon');
    const modal = document.getElementById('details-modal');

    if (modal) {
        const modalCloseBtn = document.getElementById('modal-close-btn');
        const modalImg = document.getElementById('modal-img');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalNotes = document.getElementById('modal-notes');
        const modalRoast = document.getElementById('modal-roast');

        detailsIcons.forEach(icon => {
            icon.addEventListener('click', function(event) {
                // Impede que o link '#' mude a URL e pule para o topo
                event.preventDefault();

                const productCard = this.closest('.product-card');
                const title = productCard.querySelector('.product-title').innerText;
                const imageSrc = productCard.querySelector('img').src;
                const description = productCard.dataset.detailsDescription;
                const notes = productCard.dataset.detailsNotes;
                const roast = productCard.dataset.detailsRoast;

                modalImg.src = imageSrc;
                modalImg.alt = "Imagem do " + title;
                modalTitle.innerText = title;
                modalDescription.innerText = description;
                modalNotes.innerText = notes;
                modalRoast.innerText = roast;

                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('visible');
                }, 10);
            });
        });

        function closeModal() {
            modal.classList.remove('visible');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }

        modalCloseBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});