const menu = document.querySelector('.main-nav__menu')
const buttonClose = document.querySelector('.main-nav__close')
const buttonOpen = document.querySelector('.main-nav__burger')

const closeMenu = () => {
    menu.classList.remove('main-nav__menu--showed')
    buttonClose.removeEventListener('click',closeMenu)
}

buttonOpen.addEventListener('click',() => {
    menu.classList.add('main-nav__menu--showed')
    buttonClose.addEventListener('click',closeMenu)
})

const btnModal = document.querySelectorAll('*[data-modal-btn]')

btnModal.forEach((button) => {
    button.addEventListener('click',function(){
        let name = button.getAttribute('data-modal-btn')
        let modal = document.querySelector("[data-modal-product='"+name+"']")
        modal.style.display = "block"
        let close = modal.querySelector('.modal__close')
        let butContinue = document.querySelector('.modal__button')
        butContinue.addEventListener('click',function(){
            modal.style.display = "none"
        })
        close.addEventListener('click',function(){
            modal.style.display = "none"
        })
    })   
})

