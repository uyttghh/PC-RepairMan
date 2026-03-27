// ========== ЖДЁМ ЗАГРУЗКИ DOM ==========
document.addEventListener('DOMContentLoaded', () => {
    
    // ВЕСЬ ваш код внутри этой функции
    // Например:
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    
    // ... остальной код
    
});
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
// ========== ЧАТ-БОТ ==========
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotQuickReplies = document.getElementById('chatbotQuickReplies');

// База ответов бота
const botResponses = {
    'привет': 'Привет! 👋 Чем могу помочь?',
    'здравствуйте': 'Здравствуйте! 😊 Готов ответить на ваши вопросы!',
    'сколько стоит сборка': 'Стоимость сборки зависит от компонентов. Работа по сборке от 5 000 ₽. ',
    'какие гарантии': 'Мы предоставляем гарантию от 1 до 2 лет на все сборки! Также действует гарантия от производителей комплектующих. 🛡️',
    'сроки сборки': 'Обычно сборка занимает от 3 до 7 дней в зависимости от сложности и наличия комплектующих. ⏱️',
    'связаться с менеджером': 'Конечно! Вы можете позвонить нам: +7 (950) 460-52-65 или написать в Telegram: @pcrepairman 👨‍💼',
    'калькулятор': 'Калькулятор находится на этой странице! Прокрутите вниз до секции "Калькулятор сборки ПК" 📊',
    'адрес': 'Наш адрес: г. Пермь, п. Сылва, ул. Корнеева, д. 25 📍',
    'работаете': 'Да, мы работаем ежедневно с 10:00 до 20:00! 🕐',
    'рассрочка': 'Да! Предлагаем рассрочку до 12 месяцев без переплаты. Подробности у менеджера. 💳',
    'спасибо': 'Всегда пожалуйста! 😊 Обращайтесь ещё!',
    'пока': 'До свидания! Ждём вас снова! 👋'
};

// Открытие/закрытие чата
chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
    chatbotToggle.classList.toggle('active');
    chatbotToggle.innerHTML = chatbotWindow.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-comments"></i><span class="chatbot-badge">3</span>';
    
    if (chatbotWindow.classList.contains('active')) {
        chatbotInput.focus();
    }
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
    chatbotToggle.classList.remove('active');
    chatbotToggle.innerHTML = '<i class="fas fa-comments"></i><span class="chatbot-badge">3</span>';
});

// Функция добавления сообщения
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    content.innerHTML = `<p>${text}</p><span class="message-time">${time}</span>`;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatbotMessages.appendChild(messageDiv);
    
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Функция показа индикатора набора
function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar"><i class="fas fa-robot"></i></div>
        <div class="message-content">
            <div class="chatbot-typing">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function hideTyping() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Обработка ответа бота
function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, value] of Object.entries(botResponses)) {
        if (lowerMessage.includes(key)) {
            return value;
        }
    }
    
    return 'Извините, я не совсем понял вопрос. 😅 Вы можете связаться с нашим менеджером: +7 (950) 460-52-65';
}

// Отправка сообщения
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    addMessage(message, true);
    chatbotInput.value = '';
    
    showTyping();
    
    setTimeout(() => {
        hideTyping();
        const response = getBotResponse(message);
        addMessage(response, false);
    }, 1000 + Math.random() * 1000);
}

chatbotSend.addEventListener('click', sendMessage);

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Быстрые ответы
chatbotQuickReplies.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-reply')) {
        const message = e.target.getAttribute('data-message');
        chatbotInput.value = message;
        sendMessage();
    }
});


// ========== ИНТЕГРАЦИЯ С НАВИГАЦИЕЙ ==========

// ========== ГАЛЕРЕЯ ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxSpecs = document.getElementById('lightboxSpecs');
const lightboxPrice = document.getElementById('lightboxPrice');
const lightboxThumbnails = document.getElementById('lightboxThumbnails');

let currentLightboxIndex = 0;
let visibleItems = 6; // Количество видимых элементов изначально
let filteredItems = Array.from(galleryItems);

// Фильтрация
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Убираем активный класс у всех кнопок
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Фильтрация элементов
        galleryItems.forEach(item => {
            item.classList.add('fade-out');
            
            setTimeout(() => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
                item.classList.remove('fade-out');
            }, 300);
        });
        
        // Обновляем массив отфильтрованных элементов
        filteredItems = Array.from(galleryItems).filter(item => {
            return filter === 'all' || item.getAttribute('data-category') === filter;
        });
        
        // Сброс видимых элементов
        visibleItems = 6;
        updateGalleryVisibility();
        
        // Скролл к галерее
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Обновление видимости элементов
function updateGalleryVisibility() {
    galleryItems.forEach((item, index) => {
        if (index < visibleItems && !item.classList.contains('hidden')) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 50);
        } else if (!item.classList.contains('hidden')) {
            item.style.display = 'block';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
        }
    });
    
    // Показываем/скрываем кнопку "Загрузить ещё"
    const visibleCount = filteredItems.filter(item => !item.classList.contains('hidden')).length;
    if (visibleItems >= visibleCount) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
}

// Загрузить ещё
loadMoreBtn.addEventListener('click', () => {
    visibleItems += 3;
    updateGalleryVisibility();
    
    // Анимация кнопки
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';
    setTimeout(() => {
        loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Загрузить ещё';
    }, 500);
});

// ========== LIGHTBOX ==========
function openLightbox(index) {
    currentLightboxIndex = index;
    const item = filteredItems[index];
    
    if (!item) return;
    
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-info h4').textContent;
    const specs = item.querySelector('.gallery-info p').textContent;
    const price = item.querySelector('.gallery-price').textContent;
    
    lightboxImage.src = img.src;
    lightboxImage.alt = title;
    lightboxTitle.textContent = title;
    lightboxSpecs.textContent = specs;
    lightboxPrice.textContent = price;
    
    // Создаём миниатюры
    lightboxThumbnails.innerHTML = '';
    filteredItems.forEach((item, i) => {
        const thumb = document.createElement('img');
        thumb.src = item.querySelector('img').src;
        thumb.alt = item.querySelector('.gallery-info h4').textContent;
        thumb.classList.toggle('active', i === index);
        thumb.addEventListener('click', () => openLightbox(i));
        lightboxThumbnails.appendChild(thumb);
    });
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredItems.length;
    openLightbox(currentLightboxIndex);
}

function prevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    openLightbox(currentLightboxIndex);
}

// Открытие lightbox при клике на изображение
galleryItems.forEach((item, index) => {
    const viewBtn = item.querySelector('.gallery-view-btn');
    const image = item.querySelector('.gallery-image');
    
    viewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const visibleIndex = filteredItems.indexOf(item);
        openLightbox(visibleIndex);
    });
    
    image.addEventListener('click', () => {
        const visibleIndex = filteredItems.indexOf(item);
        openLightbox(visibleIndex);
    });
});

// Закрытие lightbox
lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Навигация
lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    prevImage();
});

lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    nextImage();
});

// Клавиатурная навигация
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    }
});

// Свайпы для мобильных
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextImage();
        } else {
            prevImage();
        }
    }
}

// ========== ИНТЕГРАЦИЯ С НАВИГАЦИЕЙ ==========
// Добавляем галерею в меню

if (nav && !nav.querySelector('a[href="#gallery"]')) {
    const galleryLink = document.createElement('a');
    galleryLink.href = '#gallery';
    galleryLink.textContent = 'Галерея';
    nav.appendChild(galleryLink);
}

// ========== ДОПОЛНИТЕЛЬНЫЕ ВОЗМОЖНОСТИ ==========

// Динамическая загрузка изображений (ленивая загрузка)
const galleryImages = document.querySelectorAll('.gallery-image img');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            imageObserver.unobserve(img);
        }
    });
}, { rootMargin: '100px' });

galleryImages.forEach(img => {
    if (img.dataset.src) {
        imageObserver.observe(img);
    }
});

// Счётчик просмотров для каждой работы
const viewCounts = {};

function incrementViewCount(itemId) {
    if (!viewCounts[itemId]) {
        viewCounts[itemId] = 0;
    }
    viewCounts[itemId]++;
    console.log(`Работа ${itemId} просмотрена ${viewCounts[itemId]} раз`);
}

// Добавляем отслеживание просмотров
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        incrementViewCount(`work-${index}`);
    });
});

// Экспорт конфигурации из lightbox
const exportConfigBtn = document.createElement('button');
exportConfigBtn.className = 'btn btn-red';
exportConfigBtn.innerHTML = '<i class="fas fa-download"></i> Сохранить конфигурацию';
exportConfigBtn.style.cssText = 'margin-top: 1rem;';

exportConfigBtn.addEventListener('click', () => {
    const config = {
        name: lightboxTitle.textContent,
        specs: lightboxSpecs.textContent,
        price: lightboxPrice.textContent,
        date: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pc-config-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    addMessage(`Конфигурация "${config.name}" сохранена! 💾`, false);
});

// Добавляем кнопку в lightbox (опционально)
// lightboxInfo.appendChild(exportConfigBtn);

// ========== АНИМАЦИЯ ПРИ СКРОЛЛЕ ==========
const gallerySection = document.getElementById('gallery');

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            galleryItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.1 });

galleryObserver.observe(gallerySection);

// ========== СТАТИСТИКА ДЛЯ АДМИНКИ (ОПЦИОНАЛЬНО) ==========
function getGalleryStats() {
    const stats = {
        totalWorks: galleryItems.length,
        categories: {
            gaming: document.querySelectorAll('[data-category="gaming"]').length,
            office: document.querySelectorAll('[data-category="office"]').length,
            stream: document.querySelectorAll('[data-category="stream"]').length,
            budget: document.querySelectorAll('[data-category="budget"]').length
        },
        views: viewCounts
    };
    return stats;
}

// Логирование статистики (для разработки)
console.log('📊 Галерея статистика:', getGalleryStats());