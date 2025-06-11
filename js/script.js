/* JAVASCRIPT - js/script.js - VERSÃO FINAL E CORRIGIDA */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Site CAFFÈ RAGI carregado!");

    // --- LÓGICA DO MENU ATIVO ---
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });

    // --- LÓGICA DO FORMULÁRIO DE CONTATO (SÓ RODA NA PÁGINA CERTA) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm && typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: "6FWXo0zidPBs_qRLe" });
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
                    alert('Ocorreu um erro ao enviar a mensagem.');
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

                // Exibe o modal APENAS adicionando a classe
                modal.classList.add('visible');
            });
        });

        // Função para fechar o modal
        function closeModal() {
            // Esconde o modal APENAS removendo a classe
            modal.classList.remove('visible');
        }

        modalCloseBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});