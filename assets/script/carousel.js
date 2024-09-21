const carouselContainer = document.querySelector('.carousel__container');
const prevButton = document.querySelector('.btn__carousel-prev');
const nextButton = document.querySelector('.btn__carousel-next');
const countIndicator = document.querySelector('.count-indicator');
const items = document.querySelectorAll('.carousel__item');

let currentIndex = 0;

function getItemsPerSlide() {
    return window.innerWidth >= 768 ? 3 : 1;
}

function getGapSize() {
    const style = window.getComputedStyle(carouselContainer);
    const gap = parseFloat(style.columnGap || style.gap) || 0; // Fallback to 0 if not set
    return gap;
}

function updateCarousel() {
    const itemsPerSlide = getItemsPerSlide();
    const totalItems = items.length;
    const totalItemsToScroll = totalItems - itemsPerSlide;
    const maxIndex = Math.max(Math.ceil(totalItemsToScroll / itemsPerSlide), 0);
    currentIndex = Math.min(currentIndex, maxIndex);

    const itemWidth = items[0].offsetWidth;

    const gapSize = getGapSize();

    const slideWidth = itemWidth * itemsPerSlide + gapSize * (itemsPerSlide - 1);

    const totalWidth = itemWidth * totalItems + gapSize * (totalItems - 1);

    const maxOffset = totalWidth - slideWidth;

    const desiredOffset = currentIndex * (itemWidth * itemsPerSlide + gapSize * itemsPerSlide);

    const offset = -Math.min(desiredOffset, maxOffset);

    carouselContainer.style.transform = `translateX(${offset}px)`;

    const displayedStart = currentIndex * itemsPerSlide + 1;
    const displayedEnd = Math.min(displayedStart + itemsPerSlide - 1, totalItems);
    countIndicator.innerHTML = `<span class="slides-numbers">${displayedEnd} <span class="total-count">/ ${totalItems}</span></span>`;

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= maxIndex;
}

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextButton.addEventListener('click', () => {
    const itemsPerSlide = getItemsPerSlide();
    const totalItems = items.length;
    const totalItemsToScroll = totalItems - itemsPerSlide;
    const maxIndex = Math.max(Math.ceil(totalItemsToScroll / itemsPerSlide), 0);
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }
});

let autoSlideInterval = setInterval(() => {
    const itemsPerSlide = getItemsPerSlide();
    const totalItems = items.length;
    const totalItemsToScroll = totalItems - itemsPerSlide;
    const maxIndex = Math.max(Math.ceil(totalItemsToScroll / itemsPerSlide), 0);

    if (currentIndex < maxIndex) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
}, 5000);

carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        const itemsPerSlide = getItemsPerSlide();
        const totalItems = items.length;
        const totalItemsToScroll = totalItems - itemsPerSlide;
        const maxIndex = Math.max(Math.ceil(totalItemsToScroll / itemsPerSlide), 0);

        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 5000);
});

window.addEventListener('resize', () => {
    currentIndex = 0; // Reset index on resize
    updateCarousel();
});

updateCarousel();