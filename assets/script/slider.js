document.addEventListener('DOMContentLoaded', () => {
    let sliderInitialized = false;

    const initializeSlider = () => {
        // Проверяем, что ширина экрана меньше 768 пикселей
        if (window.innerWidth < 768) {
            if (!sliderInitialized) {
                sliderInitialized = true;

                const slides = document.querySelectorAll('.slider__item');
                const sliderContainer = document.querySelector('.slider__container');
                const prevButton = document.querySelector('.btn__prev');
                const nextButton = document.querySelector('.btn__next');
                const indicatorContainer = document.querySelector('.indicator');

                let currentIndex = 0;
                const totalSlides = slides.length;

                sliderContainer.style.display = 'flex';
                sliderContainer.style.transition = 'transform 0.5s ease-in-out';

                // Функция обновления ширины слайдов при изменении размера окна
                const updateSlideWidths = () => {
                    const slideWidth = document.querySelector('.slider').offsetWidth;
                    slides.forEach(slide => {
                        slide.style.minWidth = `${slideWidth}px`;
                    });
                    updateSliderPosition();
                };

                // Обновляем позицию слайдера
                const updateSliderPosition = () => {
                    const slideWidth = document.querySelector('.slider').offsetWidth;
                    sliderContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
                };

                // Создаем индикаторы (кружочки)
                slides.forEach((_, index) => {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    if (index === currentIndex) dot.classList.add('active');
                    dot.addEventListener('click', () => {
                        goToSlide(index);
                    });
                    indicatorContainer.appendChild(dot);
                });

                const dots = document.querySelectorAll('.indicator .dot');

                const updateIndicator = () => {
                    dots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === currentIndex);
                    });
                };

                const updateButtons = () => {
                    prevButton.disabled = currentIndex === 0;
                    nextButton.disabled = currentIndex === totalSlides - 1;
                };

                const goToSlide = (index) => {
                    currentIndex = index;
                    updateSliderPosition();
                    updateIndicator();
                    updateButtons();
                };

                prevButton.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        goToSlide(currentIndex - 1);
                    }
                });

                nextButton.addEventListener('click', () => {
                    if (currentIndex < totalSlides - 1) {
                        goToSlide(currentIndex + 1);
                    }
                });

                window.addEventListener('resize', updateSlideWidths);

                updateSlideWidths();
                updateIndicator();
                updateButtons();
            }
        } else {
            // Если ширина экрана >= 768 и слайдер был инициализирован, удаляем его
            if (sliderInitialized) {
                sliderInitialized = false;

                const slides = document.querySelectorAll('.slider__item');
                const sliderContainer = document.querySelector('.slider__container');
                const prevButton = document.querySelector('.btn__prev');
                const nextButton = document.querySelector('.btn__next');
                const indicatorContainer = document.querySelector('.indicator');

                // Сбрасываем стили
                sliderContainer.style.display = '';
                sliderContainer.style.transition = '';
                sliderContainer.style.transform = '';

                slides.forEach(slide => {
                    slide.style.minWidth = '';
                });

                // Удаляем обработчики событий с кнопок
                prevButton.replaceWith(prevButton.cloneNode(true));
                nextButton.replaceWith(nextButton.cloneNode(true));

                // Очищаем индикаторы
                indicatorContainer.innerHTML = '';

                // Удаляем обработчик resize
                window.removeEventListener('resize', updateSlideWidths);
            }
        }
    };

    // Инициализируем слайдер при загрузке страницы
    initializeSlider();

    // Обновляем слайдер при изменении размера окна
    window.addEventListener('resize', () => {
        initializeSlider();
    });
});