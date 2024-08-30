// export default [    
//     {
//         id: 1,
//         name: 'Slick formal sneaker shoe',
//         image: './img/catalog-selling1.png',
//         price: '2 999 ₽',
//         oldPrice: '4999 ₽',
//         status: 'hot',
//         isBig: true,
//     },
//     {
//         id: 2,
//         name: 'Slick sneaker shoe',
//         image: './img/catalog-selling2.png',
//         price: '2 999 ₽',
//         oldPrice: '3999 ₽',
//         status: 'new',
//         isBig: false,
//     },
//     {
//         id: 3,
//         name: 'Slick canvas shoe',
//         image: '../img/catalog-selling3.png',
//         price: '2 999 ₽',
//         oldPrice: '3999 ₽',
//         isBig: false,
//     },
// ];

export default async (url) => {
    const response = await fetch(url);
    if(response.ok){
        const data = response.json();
        return data;
    } else {
        throw new Error(`${response.status}: ${response.statusText}`)
    }
}