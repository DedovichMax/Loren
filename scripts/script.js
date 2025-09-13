document.addEventListener('DOMContentLoaded', function() {
    const elements = {
        popupOverlay: document.getElementById('popupOverlay'),
        searchButton: document.getElementById('searchButton'),
        infoButton: document.getElementById('infoButton'),
        closePopup: document.getElementById('closePopup'),
        mobileMenuOverlay: document.getElementById('mobileMenuOverlay'),
        burgerMenu: document.querySelector('.burger-menu'),
        closeMobileMenu: document.getElementById('closeMobileMenu'),
        mobileSearchButton: document.getElementById('mobileSearchButton'),
        mobileMenu: document.querySelector('.mobile-menu')
    };

    function toggleBodyOverflow(show) {
        document.body.style.overflow = show ? 'hidden' : '';
    }

    function handleEscapeKey(element, closeFunction) {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && element.classList.contains('active')) {
                closeFunction();
            }
        });
    }

    function handleOutsideClick(element, closeFunction) {
        element.addEventListener('click', function(e) {
            if (e.target === element) {
                closeFunction();
            }
        });
    }

    function openPopup() {
        elements.popupOverlay.classList.remove('closing');
        elements.popupOverlay.classList.add('active');
        toggleBodyOverflow(true);
    }

    function closePopupFunc() {
        elements.popupOverlay.classList.add('closing');
        elements.popupOverlay.classList.remove('active');
        toggleBodyOverflow(false);

        setTimeout(() => {
            elements.popupOverlay.classList.remove('closing');
        }, 300);
    }

    function openMobileMenu() {
        elements.mobileMenuOverlay.style.display = 'flex';
        setTimeout(() => {
            elements.mobileMenuOverlay.classList.add('active');
        }, 10);
        toggleBodyOverflow(true);
    }

    function closeMobileMenuFunc() {
        elements.mobileMenuOverlay.classList.remove('active');
        setTimeout(() => {
            elements.mobileMenuOverlay.style.display = 'none';
        }, 300);
        toggleBodyOverflow(false);
    }

    // Обработчики событий
    elements.searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        openPopup();
    });

    elements.infoButton.addEventListener('click', openPopup);
    elements.closePopup.addEventListener('click', closePopupFunc);

    elements.burgerMenu.addEventListener('click', openMobileMenu);
    elements.closeMobileMenu.addEventListener('click', closeMobileMenuFunc);

    elements.mobileSearchButton.addEventListener('click', () => {
        closeMobileMenuFunc();
        openPopup();
    });

    handleEscapeKey(elements.popupOverlay, closePopupFunc);
    handleEscapeKey(elements.mobileMenuOverlay, closeMobileMenuFunc);
    handleOutsideClick(elements.popupOverlay, closePopupFunc);
    handleOutsideClick(elements.mobileMenuOverlay, closeMobileMenuFunc);

    initSlider();
});

function initSlider() {
    const slider = document.querySelector('.intro-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.intro-slide-slider');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');

    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) nextIndex = 0;
        showSlide(nextIndex);
    }

    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) prevIndex = slides.length - 1;
        showSlide(prevIndex);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoSlideInterval);
    });

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', startAutoSlide);

    showSlide(0);
    startAutoSlide();
}