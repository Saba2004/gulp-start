export const CloseModal = (modal) => {

    const close = modal.querySelector('.modal__close-img');
    const buttonContinue = modal.querySelector('.modal__button');
    modal.addEventListener('click',(event) => { 
        if(event.target === close || event.target === buttonContinue){
            modal.classList.remove('modal--showed')
        }
    });

};

export const OpenModal = (button) => {
    const name = button.getAttribute('data-modal-btn');
    const modal = document.querySelector(`[data-modal-product="${name}"]`);

    if(!modal){
        return;
    };

    modal.classList.add('modal--showed');

    CloseModal(modal);
};   

