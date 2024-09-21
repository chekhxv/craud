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
        const thirdBlock = tournamentItems[2]; 

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

        const pHTML = pElement ? pElement.outerHTML : '';

        function updateHeader() {
            if (h1Element) {
                if (window.innerWidth >= 768) {
                    if (!h1Element.querySelector('span.timeline-section__description')) {
                        if (pElement) {
                            const spanElement = document.createElement('span');
                            spanElement.className = pElement.className; // Копируем классы из <p>
                            spanElement.innerHTML = pElement.innerHTML; // Копируем содержимое из <p>

                            h1Element.appendChild(spanElement);

                            pElement.parentNode.removeChild(pElement);
                        }
                    }
                } else {
                    if (!timelineSection.querySelector('.timeline-section__description')) {
                        const spanElement = h1Element.querySelector('span.timeline-section__description');
                        if (spanElement) {
                            spanElement.parentNode.removeChild(spanElement);
                        }

                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = pHTML;
                        pElement = tempDiv.firstChild;

                        h1Element.parentNode.insertBefore(pElement, h1Element.nextSibling);
                    }
                }
            }
        }

        updateHeader();

        window.addEventListener('resize', updateHeader);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const timelineSection = document.querySelector('.timeline-section');

    if (!timelineSection) return; 

    const sliderContainer = timelineSection.querySelector('.slider__container');
    const sliderItems = Array.from(sliderContainer.querySelectorAll('.slider__item'));

    const originalSliderHTML = sliderItems.map(item => item.outerHTML).join('');

    let transformed = false; 

    function transformSlider() {
        if (window.innerWidth >= 768 && !transformed) {
            transformed = true;

            const allLists = sliderContainer.querySelectorAll('.timeline__list');

            const newSliderItem = document.createElement('article');
            newSliderItem.classList.add('slider__item');

            const wrapper = document.createElement('div');
            wrapper.classList.add('combined-wrapper'); 

            allLists.forEach(list => {
                wrapper.appendChild(list);
            });

            newSliderItem.appendChild(wrapper);

            sliderContainer.innerHTML = '';
            sliderContainer.appendChild(newSliderItem);

            const sliderController = timelineSection.querySelector('.slider-controller');
            if (sliderController) {
                sliderController.style.display = 'none';
            }
        }
        else if (window.innerWidth < 768 && transformed) {
            transformed = false;

            sliderContainer.innerHTML = originalSliderHTML;

            const sliderController = timelineSection.querySelector('.slider-controller');
            if (sliderController) {
                sliderController.style.display = '';
            }
        }
    }

    transformSlider();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(transformSlider, 150);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    function rearrangeCarouselController() {
        if (window.innerWidth >= 768) {
            const participantsSection = document.querySelector('.participants');

            if (participantsSection) {
                const container = participantsSection.querySelector('.container');
                const title = container.querySelector('.title__first');
                const carouselController = container.querySelector('.carousel-controller');

                let wrapper = container.querySelector('.wrapper');
                if (!wrapper && title && carouselController) {
                    wrapper = document.createElement('div');
                    wrapper.classList.add('wrapper');

                    container.removeChild(title);
                    wrapper.appendChild(title);

                    container.removeChild(carouselController);
                    wrapper.appendChild(carouselController);

                    const firstChild = container.firstChild;
                    if (firstChild) {
                        container.insertBefore(wrapper, firstChild);
                    } else {
                        container.appendChild(wrapper);
                    }
                }
            }
        } else {
            const participantsSection = document.querySelector('.participants');

            if (participantsSection) {
                const container = participantsSection.querySelector('.container');
                const wrapper = container.querySelector('.wrapper');

                if (wrapper) {
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

                    container.removeChild(wrapper);
                }
            }
        }
    }

    rearrangeCarouselController();

    window.addEventListener('resize', rearrangeCarouselController);
});