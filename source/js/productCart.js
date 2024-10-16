import { Storage } from "./localstorage.js";
import { Modal } from "./modals.js";
import formatPrice from "./formatPrice.js";
import {createOrder} from './api.js';
import { testPhone } from "./regular.js";




const cartCounter = document.querySelector('.main-nav__counter');
const cart = document.querySelector('.shopping-cart');
const cartTemplate = document.querySelector('#shopping-cart__product').content
const buttonOpen = document.querySelector('.main-nav__shop');
const cartList = cart.querySelector('.shopping-cart__list');
const articleCart = document.querySelector('.shopping-cart__article');


const orderButton = document.querySelector('#order-button');
const orderConfirm = document.getElementById('order-confirm');
const modalCart = new Modal('.modal_cart',{
    activeClass: 'modal--showed',
    closeSelector: '.modal__close',
    btnContinueSelector: '.modal__button'
});
const storageName = new Storage('cart');
const orderModal = new Modal('.modal__order',{
    activeClass: 'modal--showed',
    closeSelector: '.modal__close',
    btnContinueSelector: '.modal__button'
});
export const errorModal = new Modal('.modal__error',{
    activeClass: 'modal--showed',
    closeSelector: '.modal__close',
    btnContinueSelector: '.modal__button'
});

const successModal = new Modal('.modal__success',
    {
        activeClass: 'modal--showed',
        closeSelector: '.modal__close',
        btnContinueSelector: '.modal__button'
    }
);

orderButton.addEventListener('click', () => {
    const data = storageName.getStorage();
    if(data !== null){
        Modal.closeAllModal();
        orderModal.openModal();
        orderModal.closeModal();
    } else {
        Modal.closeAllModal();
        errorModal.openModal();
        errorModal.closeModal();
    }

    const newArr = [];

    const arr = data?.reduce((acc,curr) => {
        let id = curr.id;

        if(acc[id]){
            acc[id] += 1;
        } else {
            acc[id] = 1;
        }

        return acc
    },{})

    for(let key in arr){
        let newObj = {};
        newObj['id'] = key;
        newObj['count'] = arr[key]
        newArr.push(newObj);
    }
    createOrder(newArr);
});

orderConfirm.addEventListener('click',() => {
    const userPhone = document.querySelector('.order__phone');
    const checkBox = document.querySelector('.order__checkbox');

    if(checkBox.checked && testPhone(userPhone.value)){
        const userData = {
            'phone': userPhone.value,   
        };

        fetch('telegram.php',{
            "method": "POST",
            "headers": {
                "Content-Type": "application/json; charset:utf-8"
            },
            "body" : JSON.stringify(userData)
        });

        Modal.closeAllModal();
        successModal.openModal();
        successModal.closeModal();
    } else {
        errorModal.openModal();
        errorModal.closeModal();
    }

});




const editProduct = (node, product, operation = 'plus') => {

    let current = node.querySelector('.shopping-cart__input').value;
    const targetAmount = document.querySelector('.shopping-cart__amount span');
    const targetPrice = document.querySelector('.shopping-cart__total');

    if(operation === 'plus'){
        node.querySelector('.shopping-cart__input').value = ++current;
        targetAmount.textContent = Number(targetAmount.textContent) + 1;
        targetPrice.textContent = formatPrice(Number(targetPrice.textContent.replace(/\D/g, "")) + Number(product.price));
    } else if(operation === 'minus'){
        if(node.querySelector('.shopping-cart__input').value == 1){
            targetAmount.textContent = Number(targetAmount.textContent) - 1;
            targetPrice.textContent = formatPrice(Number(targetPrice.textContent.replace(/\D/g, "")) - Number(product.price));
            removeFromCart(product.id);
        } else if(node.querySelector('.shopping-cart__input').value > 0){
            node.querySelector('.shopping-cart__input').value = --current;
            targetAmount.textContent = Number(targetAmount.textContent) - 1;
            targetPrice.textContent = formatPrice(Number(targetPrice.textContent.replace(/\D/g, "")) - Number(product.price));
        }         
    } else {
        targetAmount.textContent = Number(targetAmount.textContent) - Number(node.querySelector('.shopping-cart__input').value);
        targetPrice.textContent = formatPrice(Number(targetPrice.textContent.replace(/\D/g, "")) - (Number(product.price) * Number(node.querySelector('.shopping-cart__input').value)));
    }

    cartCounter.textContent = storageName.getStorage() ? storageName.getStorage().length:'0';
    if(!storageName.getStorage() || !storageName.getStorage().length){
        articleCart.textContent = 'Ваша корзина пуста';
    }
}




export const removeFromCart = (productId) => {
    const node = cartList.querySelector(`[data-product-id="${productId}"]`);
    node.remove()
    storageName.removeFromStorage(productId,true);
};


export const renderCart = () => {
    const data = storageName.getStorage();
    cartTemplate.querySelector('.shopping-cart__price').textContent = `${formatPrice(cartTemplate.querySelector('.shopping-cart__price').textContent)}`;
    
    buttonOpen.addEventListener('click', () => {
        // OpenModal(buttonOpen);
        modalCart.openModal();
        modalCart.closeModal();
    });

    if(!data?.length){
        articleCart.textContent = 'Корзина пуста';
        return;
    }

    document.querySelector('.shopping-cart__article').textContent = 'Корзина Товаров';

    let countsData = data.reduce((acc,current) => {
        const id = current.id;
        if(acc[id]){
            acc[id]++;
        } else {
            acc[id] = 1;
        }
        return acc
    }, {});


    const uniqueData = [...new Set(data.map(JSON.stringify))].map(JSON.parse).sort((a,b) => a.id - b.id);
    const fragment = document.createDocumentFragment();

    cartList.innerHTML = '';
    


    uniqueData.forEach(product => {
        const node = cartTemplate.querySelector('.shopping-cart__item').cloneNode(true);
        node.dataset.productId = product.id;
        node.querySelector('.shopping-cart__image').src = product.image;
        node.querySelector('.shopping-cart__name').textContent = product.name;
        node.querySelector('.shopping-cart__price').textContent = `${formatPrice(product.price)}`;
        node.querySelector('.shopping-cart__input').value = countsData[product.id] || 0;

        node.querySelector('.shopping-cart__minus').addEventListener('click', () => {
            storageName.removeFromStorage(product.id);
            editProduct(node,product,'minus');
        })

        node.querySelector('.shopping-cart__plus').addEventListener('click', () => {
            storageName.addToStorage(product);
            editProduct(node,product,'plus');

        })

        node.querySelector('.shopping-cart__delete').addEventListener('click',(event) => {
            removeFromCart(product.id);
            editProduct(node,product,'delete');
            event.stopPropagation();
        })

        fragment.append(node);
    });

    const targetAmount = document.querySelector('.shopping-cart__amount span');
    targetAmount.textContent = `${data.length}`;
    const targetPrice = document.querySelector('.shopping-cart__total');
    targetPrice.textContent = `${formatPrice(data.reduce((acc,product) => {
        acc += +product.price;
        return acc;
        },0))}`
    cartList.append(fragment);
    cartCounter.textContent = storageName.getStorage().length;
}

renderCart();





