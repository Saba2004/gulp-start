import products from './products.js';
import renderProducts from './renderProducts.js';


const catalogList = document.querySelector('.best-selling__catalog');
const catalogItemTemplate = document.querySelector('#best-selling-product').content;

renderProducts(products, catalogItemTemplate, catalogList,true);