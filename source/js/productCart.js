import { addToStorage, removeFromStorage, amountCostCart, getStorage } from "./localstorage.js";
import { OpenModal } from "./modals.js";
import formatPrice from "./formatPrice.js";
import {createOrder} from './api.js';



const blockMenu = document.querySelector('.user-menu__cart');
const cartCounter = blockMenu.querySelector('.main-nav__counter');
const cart = blockMenu.querySelector('.shopping-cart');
const cartTemplate = blockMenu.querySelector('#shopping-cart__product').content
const buttonOpen = blockMenu.querySelector('.main-nav__shop');
const cartList = cart.querySelector('.shopping-cart__list');


const orderButton = document.querySelector('#order-button');

orderButton.addEventListener('click', () => {
    const data = getStorage('cart');

    const newArr = [];

    const arr = data.reduce((acc,curr) => {
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
})


const editProduct = (node, product, operation = 'plus') => {

    let current = node.querySelector('.shopping-cart__input').value;
    const targetAmount = blockMenu.querySelector('.shopping-cart__amount span');
    const targetPrice = blockMenu.querySelector('.shopping-cart__total');

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

    if(!cartList.childElementCount){
        document.querySelector('[data-modal-product="cart"]').classList.remove('modal--showed');
    }

}




export const removeFromCart = (productId) => {
    const node = cartList.querySelector(`[data-product-id="${productId}"]`);
    // console.log(nodes)
    node.remove()
    removeFromStorage('cart',productId,true)
    cartCounter.textContent = cartList.childElementCount;
};


export const renderCart = () => {
    const data = getStorage('cart');

    if(!data?.length){
        return;
    }

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
            removeFromStorage('cart',product.id);
            editProduct(node,product,'minus');
        })

        node.querySelector('.shopping-cart__plus').addEventListener('click', () => {
            addToStorage('cart',product);
            editProduct(node,product,'plus');

        })

        node.querySelector('.shopping-cart__delete').addEventListener('click',(event) => {
            removeFromCart(product.id);
            editProduct(node,product,'delete');
            event.stopPropagation();
        })

        fragment.append(node);
    });

    const targetAmount = blockMenu.querySelector('.shopping-cart__amount span');
    targetAmount.textContent = `${data.length}`;
    const targetPrice = blockMenu.querySelector('.shopping-cart__total');
    targetPrice.textContent = `${formatPrice(data.reduce((acc,product) => {
        acc += +product.price;
        return acc;
        },0))}`
    cartList.append(fragment);
    cartCounter.textContent = cartList.childElementCount;


    buttonOpen.addEventListener('click', () => {
        if(cartList.childElementCount){
            OpenModal(buttonOpen)
        }
    })
}

renderCart()

