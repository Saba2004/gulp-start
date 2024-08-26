export default (products,template,target,catalogList,isTargetList = false, templateClass = '') => {
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
        const {id, name, image, price_new, price_old, status, size} = product 
        const itemEl = productEl.cloneNode(true);
        const imageEl = itemEl.querySelector(`.best-selling__sneakers`);
        const nameEl = itemEl.querySelector(`.best-selling__name`);
        const priceElNew = itemEl.querySelector('.best-selling__price-new');
        const priceElOld = itemEl.querySelector('.best-selling__price-old');
        const ButtonEl = itemEl.querySelector('.best-selling__button1');

        

        if(size?.length && size === 'big'){
            itemEl.classList.remove('best-selling__item');
            itemEl.classList.add('best-selling__item1');
            nameEl.classList.remove('best-selling__name');
            nameEl.classList.add('best-selling__name1');
        } else {
            priceElNew.classList.remove('best-selling__price-new');
            priceElNew.classList.add('best-selling__price');
            priceElOld.classList.remove('best-selling__price-old');
            priceElOld.classList.add('best-selling__sale');
            ButtonEl.classList.remove('best-selling__button1');
            ButtonEl.classList.add('best-selling__button');
        }

        if(status?.length){
            itemEl.classList.add(`best-selling--${status}`);
        }

        imageEl.src = image;
        nameEl.textContent = name;
        priceElNew.textContent = price_new;
        priceElOld.textContent = price_old;
    
        fragment.appendChild(itemEl);
    });

    target.innerHTML = '';
    target.append(fragment);

}