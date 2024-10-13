export class Modal{
    static allModal = document.querySelectorAll('.modal');
    static activeClass = 'modal--showed';
    constructor(selectorModal,options){
        const {activeClass,closeSelector,btnContinueSelector} = options;
        this.modal = document.querySelector(selectorModal);
        this.activeClass = activeClass;
        this.closeBtn = this.modal.querySelector(closeSelector);
        this.btnContinue = this.modal.querySelector(btnContinueSelector);
    }

    openModal(){
        this.modal.classList.add(this.activeClass);
        
    };

    closeModal(){
        this.modal.addEventListener('click',(event) => {
            if(event.target.closest('.modal__close') === this.closeBtn || event.target === this.btnContinue || (event.target === this.modal)){
                this.modal.classList.remove(this.activeClass);
            }
            event.stopPropagation();

            // this.closeBtn.addEventListener('click', () => {
            //     this.modal.classList.remove(this.activeClass);
            // });

            // this.btnContinue.addEventListener('click',() => {
            //     this.modal.classList.remove(this.activeClass);
            // })
        });
    };

    static closeAllModal(){
        this.allModal.forEach(modal => {
            if(modal.classList.contains(this.activeClass)){
                modal.classList.remove(this.activeClass)
            }
        })
    };
}; 

