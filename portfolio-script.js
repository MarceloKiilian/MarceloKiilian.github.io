
// Navegação suave
document.addEventListener('DOMContentLoaded', function() {
    // Toggle do menu mobile
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Scroll suave para âncoras
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Compensar altura do header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Botão voltar ao topo
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Destacar link ativo na navegação
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Validação e submissão do formulário
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação básica
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }
        
        // Simulação de envio (em um caso real, você enviaria para um servidor)
        alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
        
        // Limpar formulário
        contactForm.reset();
    });

    // Animação de entrada dos elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.2s';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.timeline-item, .education-card, .skill-category, .cert-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Efeito de digitação no hero title (opcional)
    const heroTitle = document.querySelector('.hero-title');
    const titleText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < titleText.length) {
            heroTitle.textContent += titleText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Iniciar efeito de digitação após um pequeno delay
    setTimeout(typeWriter, 500);

    // Adicionar classe ativa ao link da navegação baseado na seção atual
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    // Remover classe ativa de todos os links
                    navLinks.forEach(l => l.classList.remove('active'));
                    // Adicionar classe ativa ao link atual
                    link.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Executar uma vez no carregamento

    // Adicionar efeito parallax suave ao hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
});

// Função para mostrar/ocultar elementos baseado no scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.timeline-content, .education-card, .skill-category');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Adicionar CSS para elementos revelados
const style = document.createElement('style');
style.textContent = `
    .timeline-content,
    .education-card,
    .skill-category {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease;
    }
    
    .timeline-content.active,
    .education-card.active,
    .skill-category.active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-link.active {
        color: #005a9c !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);
