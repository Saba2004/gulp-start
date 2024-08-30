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

const buttonsModal = document.querySelectorAll('*[data-modal-btn]');

const CloseModal = (modal,btnClose) => {
    if(!btnClose){
        return;
    }
    btnClose.addEventListener('click',() => {
        modal.classList.remove('modal--showed');
    })
};

export const OpenModal = (buttonsModal) => {
    if(buttonsModal.length){
    buttonsModal.forEach((button) => {
        const name = button.getAttribute('data-modal-btn');
        const modal = document.querySelector(`[data-modal-product="${name}"]`);

        if(!modal){
            return;
        };

        button.addEventListener('click',function(){
            const close = modal.querySelector('.modal__close');
            const buttonContinue = modal.querySelector('.modal__button');

            modal.classList.add('modal--showed');


            CloseModal(modal,buttonContinue)
            CloseModal(modal,close)
        });  
    });
};   
};



