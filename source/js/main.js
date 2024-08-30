import products from './products.js';
import renderProducts from './renderProducts.js';
// import { OpenModal } from './script.js'

const catalogList = document.querySelector('.best-selling__catalog');
const catalogItemTemplate = document.querySelector('#best-selling-product').content;

import fetchParams from './products.js';

const dataProducts = fetchParams('https://zsa-studio.ru/catalog.php');
dataProducts.then((products) => renderProducts(products, catalogItemTemplate, catalogList,true));
// renderProducts(products, catalogItemTemplate, catalogList,true);

