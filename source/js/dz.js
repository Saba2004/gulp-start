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

const newDataName = [...new Set(flats.map(item => item.project.name))];
const indexArray = {};
newDataName.forEach((item,index) => {
  indexArray[index + 1] = item
});

const obj1 = {};

flats.forEach((item,index) => {
  if(obj1[item.project.id]){
    obj1[item.project.id].push({
      floor: item.floor,
      rooms : item.rooms
    })
  } else {
    obj1[item.project.id] = 
    [ 
      {
        floor: item.floor,
        rooms: item.rooms
      },
    ]
  }
  }
);

const arr = [];

for(let key in obj1){
  if(obj1.hasOwnProperty(key)){
    arr.push({
      id: +key,
      name: indexArray[+key],
      flats: obj1[key]
    })
  }
};

//Сложность алгоритма как я понял On так как никаких вложенных циклов 


