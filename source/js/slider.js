import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

const swiper = new Swiper('.banners__swiper', {
    // Optional parameters
    loop: true,
    spaceBetween: 60,

    // If we need pagination
    pagination: {
        el: '.banners__slider--pagination',
        bulletActiveClass: 'banners__pagination--big',
        bulletClass: 'banners__pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.banners__arrow--right',
        prevEl: '.banners__arrow--left',
    },
});

const screenSneakers = window.screen.width < 1727;

const swiperSneakers = new Swiper('.goods__swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 67,
    loop: true,
    pagination: {
        el: '.goods__slider--pagination',
        bulletActiveClass: 'goods__pagination--big',
        bulletClass: 'goods__pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.goods__arrow--right',
        prevEl: '.goods__arrow--left',
    },

    breakpoints: {
        1728: {
            slidesPerView: 3,
            centeredSlides: true,
        }
    }

});


