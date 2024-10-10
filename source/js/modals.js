// export const CloseModal = (modal) => {
//     const close = modal.querySelector('.modal__close-img img');
//     const buttonContinue = modal.querySelector('.modal__button');
//     modal.addEventListener('click',(event) => { 
//         if(event.target === close || event.target === buttonContinue || (event.target === modal)){
//             modal.classList.remove('modal--showed')
//         }
//     });

// };

// export const OpenModal = (button) => {
//     const name = button.getAttribute('data-modal-btn');
//     const modal = document.querySelector(`[data-modal-product="${name}"]`);

//     if(!modal){
//         return;
//     };

//     modal.classList.add('modal--showed');

//     CloseModal(modal);
// };

export class Modal{
    static allModal = document.querySelectorAll('.modal');
    constructor(selectorModal,options){
        const {activeClass,closeSelector,btnContinueSelector} = options;
        this.modal = document.querySelector(selectorModal);
        this.activeClass = activeClass;
        this.closeBtn = this.modal.querySelector(closeSelector);
        this.btnContinue = this.modal.querySelector(btnContinueSelector);
    }

    openAndCloseModal(){
        this.modal.classList.add(this.activeClass);
        this.modal.addEventListener('click',(event) => {
            if(event.target === this.closeBtn || event.target === this.btnContinue || (event.target === this.modal)){
                this.modal.classList.remove(this.activeClass);
            }
        })
    };

    static closeAllModal(){
        this.allModal.forEach(modal => {
            if(modal.classList.contains('modal--showed')){
                modal.classList.remove('modal--showed')
            }
        })
    };

    // closeModal(){
    //     this.modal.addEventListener('click',(event) => {
    //         if(event.target === this.closeBtn || event.target === this.btnContinue || (event.target === this.modal)){
    //             this.modal.classList.remove(this.activeClass);
    //         }
    //     })
    // }
};

export const modalProduct = new Modal('.modal_product',{
    activeClass: 'modal--showed',
    closeSelector: '.modal__close-img img',
    btnContinueSelector: '.modal__button'
});

export const modalCart = new Modal('.modal_cart',{
    activeClass: 'modal--showed',
    closeSelector: '.modal__close-img img',
    btnContinueSelector: '.modal__button'
});

