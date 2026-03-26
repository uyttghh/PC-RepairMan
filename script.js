// ========== МОБИЛЬНОЕ МЕНЮ ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.innerHTML = nav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ========== HEADER SCROLL EFFECT ==========
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========== FAQ ACCORDION ==========
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Закрыть все остальные
        faqItems.forEach(i => i.classList.remove('active'));
        
        // Открыть/закрыть текущий
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ========== СЛАЙДЕР ОТЗЫВОВ ==========
const reviewsTrack = document.getElementById('reviewsTrack');
const prevBtn = document.getElementById('prevReview');
const nextBtn = document.getElementById('nextReview');

let currentSlide = 0;
const totalSlides = document.querySelectorAll('.review-card').length;

function updateSlider() {
    const cardWidth = document.querySelector('.review-card').offsetWidth + 32; // 32px = gap
    reviewsTrack.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
}

prevBtn.addEventListener('click', () => {
    currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
    updateSlider();
});

// Автопрокрутка
setInterval(() => {
    currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
    updateSlider();
}, 5000);

// Адаптация слайдера при изменении размера окна
window.addEventListener('resize', updateSlider);

// ========== ФОРМА КОНТАКТОВ ==========
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Получение данных формы
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Валидация
    if (!data.name || !data.phone || !data.type) {
        alert('Пожалуйста, заполните все обязательные поля!');
        return;
    }
    
    // Имитация отправки
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// ========== ПЛАВНЫЙ СКРОЛЛ ДЛЯ ЯКОРНЫХ ССЫЛОК ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== АНИМАЦИЯ ПРИ СКРОЛЛЕ ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию ко всем карточкам
document.querySelectorAll('.advantage-card, .service-card, .price-card, .review-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========== ТЕЛЕФОН МАСКА (ОПЦИОНАЛЬНО) ==========
const phoneInputs = document.querySelectorAll('input[type="tel"]');

phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = '+7 (' + value.substring(1, 4);
            if (value.length > 6) {
                value = value.substring(0, 6) + ') ' + value.substring(6, 9);
            }
            if (value.length > 11) {
                value = value.substring(0, 11) + '-' + value.substring(11, 13);
            }
            if (value.length > 14) {
                value = value.substring(0, 14) + '-' + value.substring(14, 16);
            }
        }
        e.target.value = value;
    });
});

// ========== КОНСОЛЬ ПРИ ЗАГРУЗКЕ ==========
console.log('%c PC RepairMan ', 'background: #E63946; color: #fff; font-size: 20px; padding: 10px;');
console.log('Сайт успешно загружен! 🚀');