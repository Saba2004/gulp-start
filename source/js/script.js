const menu = document.querySelector('.main-nav__menu');
const buttonClose = document.querySelector('.main-nav__close');
const buttonOpen = document.querySelector('.main-nav__burger');

const closeMenu = () => {
    menu.classList.remove('main-nav__menu--showed');
    buttonClose.removeEventListener('click',closeMenu);
};


if(buttonOpen && menu && buttonClose){
    buttonOpen.addEventListener('click',() => {
        menu.classList.add('main-nav__menu--showed');
        buttonClose.addEventListener('click',closeMenu);
    });
};



