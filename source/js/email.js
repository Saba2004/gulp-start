import { Modal } from './modals.js';
import { errorModal } from './productCart.js';


const emailModal = new Modal('.modal__email',{
    activeClass: 'modal--showed',
    closeSelector: '.modal__close',
    btnContinueSelector: '.modal__button'
});

const inputEmail = document.querySelector('.feedback__input');
const buttonEmail = document.querySelector('.feedback__button');

buttonEmail.addEventListener('click', (event) => {
    event.preventDefault();
    if(inputEmail.value.includes('@') && (`${inputEmail.value}`.endsWith('.com') || `${inputEmail.value}`.endsWith('.ru'))){
        emailModal.openModal();
        emailModal.closeModal();

        let email = {
            "email" : inputEmail.value
        };

        fetch('telegram.php', {
            "method" : "POST",
            "headers": {
                "Content-Type" : 'application/json'
            },
            "body" : JSON.stringify(email)
        });
    } else {
        errorModal.openModal();
        errorModal.closeModal();
    }
    
});