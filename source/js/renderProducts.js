import { OpenModal, CloseModal } from './modals.js';
import { renderCart } from './productCart.js';
import { addToStorage } from './localstorage.js';
import formatPrice from './formatPrice.js';

export default (products,template,target,isTargetList = false, templateClass = '') => {
    const fragment = document.createDocumentFragment();

    let productEl = template.querySelector('.best-selling__item');

    if(isTargetList){
        const node = document.createElement('li');
        node.innerHTML = productEl.innerHTML;

        Array.prototype.forEach.call(productEl.attributes,function(attr){
            node.setAttribute(attr.name, attr.value);
        });

        productEl = node;
    }

    products.forEach(product => {
        const {id, name, image, price, oldPrice, status, isBig} = product 
        const itemEl = productEl.cloneNode(true);
        const imageEl = itemEl.querySelector(`.best-selling__sneakers`);
        const nameEl = itemEl.querySelector(`.best-selling__name`);
        const priceElNew = itemEl.querySelector('.best-selling__price-new');
        const priceElOld = itemEl.querySelector('.best-selling__price-old');
        const buttonEl = itemEl.querySelector('.best-selling__button1');        

        if(isBig){
            itemEl.classList.remove('best-selling__item');
            itemEl.classList.add('best-selling__item1');
            nameEl.classList.remove('best-selling__name');
            nameEl.classList.add('best-selling__name1');
        } else {
            priceElNew.classList.remove('best-selling__price-new');
            priceElNew.classList.add('best-selling__price');
            priceElOld.classList.remove('best-selling__price-old');
            priceElOld.classList.add('best-selling__sale');
            buttonEl.classList.remove('best-selling__button1');
            buttonEl.classList.add('best-selling__button-circle');
        }

        if(status?.length){
            itemEl.classList.add(`best-selling--${status}`);
        }

        buttonEl.addEventListener('click', () => {
            OpenModal(buttonEl)
            addToStorage('cart', product);
            renderCart()
        })

        imageEl.src = image;
        nameEl.textContent = name;
        priceElNew.textContent = formatPrice(price);
        priceElOld.textContent = formatPrice(oldPrice);
    
        fragment.appendChild(itemEl);
    });


    
    
    target.innerHTML = '';
    target.append(fragment);
}