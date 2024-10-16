// исходник НЕЛЬЗЯ ИЗМЕНЯТЬ


const flats = [
  {
    floor: 3,
    rooms: 2,
    project: {
      id: 1,
      name: 'Foriver',
    },
  },
  {
    floor: 1,
    rooms: 3,
    project: {
      id: 2,
      name: 'Riversky',
    },
  },
  {
    floor: 5,
    rooms: 4,
    project: {
      id: 1,
      name: 'Foriver',
    },
  },
  {
    floor: 2,
    rooms: 2,
    project: {
      id: 2,
      name: 'Riversky',
    },
  },
];



// чего нужно добиться
const projects = [
  {
    id: 1,
    name: 'Foriver',
    flats: [
      {
        floor: 3,
        rooms: 2,
      },
      {
        floor: 5,
        rooms: 4,
      },
    ],
  },
  {
    id: 2,
    name: 'Riversky',
    flats: [
      {
        floor: 2,
        rooms: 2,
      },
      {
        floor: 1,
        rooms: 3,
      },
    ],
  }
];


// 1 Способ (без Map and Set)
// const resultArr = [];
// let indexArray = {};

// const newSortedFlats = flats.sort((a,b) => a.project.id - b.project.id); // сортировка по id исходного массива
// // Создание итогового массива с помощью добавления данных в объект по id.
// newSortedFlats.forEach(item => {
//   if(('id' in indexArray) && (indexArray['id'] !== item.project.id)){
//     resultArr.push(indexArray)
//     indexArray = {}
//   }
//   if(!indexArray['id']){
//     indexArray['id'] = item.project.id,
//     indexArray['name'] = item.project.name,
//     indexArray['flat'] = 
//     [ 
//       {
//         floor: item.floor,
//         rooms: item.rooms
//       },
//     ]
//   } else if(indexArray['id'] === item.project.id){
//     indexArray['flat'].push({
//       floor: item.floor,
//       rooms : item.rooms
//     })
//   }
  
// });

// resultArr.push(indexArray) // Добавляем данные по последнему id;
// console.log(resultArr);

//Сложность алгоритма как я понял On так как никаких вложенных циклов 

// 2 способ 

const resultArr = [];

const newSortedArray = flats.sort((a,b) => a.project.id - b.project.id);

const setFlatsId = new Set(newSortedArray.map(item => item.project.id)) // set idшников
const setFlatName = [...new Set(newSortedArray.map(item => item.project.name))] // set name 

let indexArray = new Map();

newSortedArray.forEach(item => {
  if((indexArray.get('id')) && (indexArray.get('id') !== item.project.id)){
    resultArr.push(indexArray)
    indexArray = new Map();
  }
  if(!indexArray.get('id')){
    indexArray.set('id',item.project.id),
    indexArray.set('name',item.project.name),
    indexArray.set('flat', 
    [ 
      {
        floor: item.floor,
        rooms: item.rooms
      },
    ])
  } else if(indexArray.get('id') === item.project.id){
    indexArray.get('flat').push({
      floor: item.floor,
      rooms : item.rooms
    })
  }
  
});

resultArr.push(indexArray)







