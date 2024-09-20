const h2Elements = document.querySelectorAll('.title__second');

function combineHeadings() {
    if (h2Elements.length >= 2) {
        const firstH2 = h2Elements[0];
        const secondH2 = h2Elements[1];

        const firstH2OriginalContent = firstH2.dataset.originalContent || firstH2.innerHTML;
        const secondH2OriginalContent = secondH2.dataset.originalContent || secondH2.innerHTML;

        firstH2.dataset.originalContent = firstH2OriginalContent;
        secondH2.dataset.originalContent = secondH2OriginalContent;

        if (window.innerWidth >= 768) {
            firstH2.innerHTML = firstH2OriginalContent + ' ' + secondH2OriginalContent;

            secondH2.style.display = 'none';
        } else {
            firstH2.innerHTML = firstH2OriginalContent;
            secondH2.innerHTML = secondH2OriginalContent;

            secondH2.style.display = '';
        }
    }
}

combineHeadings();
window.addEventListener('resize', combineHeadings);

document.addEventListener('DOMContentLoaded', function() {
    const tournamentItems = document.querySelectorAll('.tournament-section__item');
    const secondBlock = document.querySelector('.tournament-section__item.mob');

    if (tournamentItems.length >= 3 && secondBlock) {
        const thirdBlock = tournamentItems[2]; // Получаем третий блок

        const wrapper = document.createElement('div');
        wrapper.classList.add('additional-wrapper');

        wrapper.appendChild(thirdBlock);

        secondBlock.appendChild(wrapper);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const supportText = document.querySelector('.support-text');

    const descriptionBlock = document.querySelector('.tournament-section__item_description');

    if (supportText && descriptionBlock) {
        descriptionBlock.appendChild(supportText);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const timelineSection = document.querySelector('.timeline-section');

    if (timelineSection) {
        const h1Element = timelineSection.querySelector('.title__first');
        let pElement = timelineSection.querySelector('.timeline-section__description');

        // Сохраняем исходный HTML элемента <p>
        const pHTML = pElement ? pElement.outerHTML : '';

        function updateHeader() {
            if (h1Element) {
                if (window.innerWidth >= 768) {
                    // Проверяем, добавлен ли уже <span> в <h1>
                    if (!h1Element.querySelector('span.timeline-section__description')) {
                        if (pElement) {
                            // Создаем новый элемент <span>
                            const spanElement = document.createElement('span');
                            spanElement.className = pElement.className; // Копируем классы из <p>
                            spanElement.innerHTML = pElement.innerHTML; // Копируем содержимое из <p>

                            // Добавляем <span> в конец <h1>
                            h1Element.appendChild(spanElement);

                            // Удаляем исходный элемент <p>
                            pElement.parentNode.removeChild(pElement);
                        }
                    }
                } else {
                    // Проверяем, существует ли элемент <p> внутри .timeline-section
                    if (!timelineSection.querySelector('.timeline-section__description')) {
                        // Удаляем <span> из <h1>
                        const spanElement = h1Element.querySelector('span.timeline-section__description');
                        if (spanElement) {
                            spanElement.parentNode.removeChild(spanElement);
                        }

                        // Восстанавливаем исходный элемент <p>
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = pHTML;
                        pElement = tempDiv.firstChild;

                        // Вставляем <p> после <h1> внутри .timeline-section
                        h1Element.parentNode.insertBefore(pElement, h1Element.nextSibling);
                    }
                }
            }
        }

        // Запускаем функцию при загрузке страницы
        updateHeader();

        // Добавляем обработчик события изменения размера окна
        window.addEventListener('resize', updateHeader);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const timelineSection = document.querySelector('.timeline-section');

    if (!timelineSection) return; // Если секция не найдена, выходим

    const sliderContainer = timelineSection.querySelector('.slider__container');
    const sliderItems = Array.from(sliderContainer.querySelectorAll('.slider__item'));

    // Сохраняем исходные HTML-элементы для восстановления
    const originalSliderHTML = sliderItems.map(item => item.outerHTML).join('');

    let transformed = false; // Флаг, указывающий на выполненную трансформацию

    function transformSlider() {
        if (window.innerWidth >= 768 && !transformed) {
            transformed = true;

            // Находим все списки внутри слайдера
            const allLists = sliderContainer.querySelectorAll('.timeline__list');

            // Создаём новый .slider__item
            const newSliderItem = document.createElement('article');
            newSliderItem.classList.add('slider__item');

            // Создаём обёртку для списков
            const wrapper = document.createElement('div');
            wrapper.classList.add('combined-wrapper'); // Замените на нужный класс

            // Перемещаем все списки в обёртку
            allLists.forEach(list => {
                wrapper.appendChild(list);
            });

            // Добавляем обёртку в новый .slider__item
            newSliderItem.appendChild(wrapper);

            // Очищаем содержимое контейнера слайдера и добавляем новый .slider__item
            sliderContainer.innerHTML = '';
            sliderContainer.appendChild(newSliderItem);

            // (Опционально) Отключаем слайдер, если он не нужен на больших экранах
            // Например, скрываем контроллеры
            const sliderController = timelineSection.querySelector('.slider-controller');
            if (sliderController) {
                sliderController.style.display = 'none';
            }
        }
        else if (window.innerWidth < 768 && transformed) {
            transformed = false;

            // Восстанавливаем исходную структуру слайдера
            sliderContainer.innerHTML = originalSliderHTML;

            // (Опционально) Включаем слайдер, если он был отключён
            const sliderController = timelineSection.querySelector('.slider-controller');
            if (sliderController) {
                sliderController.style.display = '';
            }
        }
    }

    // Выполняем трансформацию при загрузке страницы
    transformSlider();

    // Добавляем обработчик события изменения размера окна с задержкой (debounce)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(transformSlider, 150);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    function rearrangeCarouselController() {
        if (window.innerWidth >= 768) {
            // Находим секцию участников
            const participantsSection = document.querySelector('.participants');

            if (participantsSection) {
                const container = participantsSection.querySelector('.container');
                const title = container.querySelector('.title__first');
                const carouselController = container.querySelector('.carousel-controller');

                // Проверяем, существует ли уже обёртка, чтобы избежать дублирования
                let wrapper = container.querySelector('.wrapper');
                if (!wrapper && title && carouselController) {
                    // Создаём новый элемент-обёртку
                    wrapper = document.createElement('div');
                    wrapper.classList.add('wrapper');

                    // Перемещаем заголовок и контроллер карусели в обёртку
                    // Удаляем заголовок из текущего места и добавляем в обёртку
                    container.removeChild(title);
                    wrapper.appendChild(title);

                    // Удаляем контроллер карусели из текущего места и добавляем в обёртку
                    container.removeChild(carouselController);
                    wrapper.appendChild(carouselController);

                    // Вставляем обёртку в контейнер после заголовка
                    // Если заголовок был первым элементом, вставляем обёртку на его место
                    const firstChild = container.firstChild;
                    if (firstChild) {
                        container.insertBefore(wrapper, firstChild);
                    } else {
                        container.appendChild(wrapper);
                    }
                }
            }
        } else {
            // Если ширина окна меньше 768px, возвращаем исходную структуру
            const participantsSection = document.querySelector('.participants');

            if (participantsSection) {
                const container = participantsSection.querySelector('.container');
                const wrapper = container.querySelector('.wrapper');

                if (wrapper) {
                    // Перемещаем заголовок и контроллер карусели из обёртки обратно в контейнер
                    const title = wrapper.querySelector('.title__first');
                    const carouselController = wrapper.querySelector('.carousel-controller');

                    if (title) {
                        wrapper.removeChild(title);
                        container.insertBefore(title, wrapper);
                    }

                    if (carouselController) {
                        wrapper.removeChild(carouselController);
                        container.insertBefore(carouselController, wrapper);
                    }

                    // Удаляем обёртку
                    container.removeChild(wrapper);
                }
            }
        }
    }

    // Выполняем функцию при загрузке страницы
    rearrangeCarouselController();

    // Добавляем обработчик события изменения размера окна
    window.addEventListener('resize', rearrangeCarouselController);
});