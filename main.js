'use strict'

mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlcHNlbjg5IiwiYSI6ImNqaDZxb3Z1bDAwNGsycW11dnAwZ3N1ZXQifQ.LOs9yadH4E1wF_NcE_3Awg';

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [47.50, 11],
    zoom: 9
});

let points = [];

// get points on map by click
map.on('click', function (e) {
    
    //create new marker
    let marker = new mapboxgl.Marker()
    .setLngLat([e.lngLat.lng, e.lngLat.lat])
    .addTo(map);
    
    // add up to 8 different points, first is home point
    if (points.length <= 8){
        points.push(marker);
    }
});

let alldistances;
let destinationsOrder;
let nextDestination;
let distAll;

const distanceMeasurement = (points) => {
  destinationsOrder = [];
  nextDestination;
  distAll = [];
  
  // measure distance between points
  points.forEach((e, index) => {
    let from = turf.point([e._lngLat.lat, e._lngLat.lng]);
    let newDist = [];
    let distIndex = {};

    // to get distance to each point (turf: to - end point)
    points.forEach((e, index) => {
      let to = turf.point([e._lngLat.lat, e._lngLat.lng]);
      let options = {units: 'kilometres'};
      let distance = turf.distance(from, to, options);
      distIndex[index] = distance;
      
      return
    })
    distAll.push(distIndex);

    return
  })
  return
}

let checkArr;
let orderPoints;

// to sort distances/indeces in array
const sortWithIndeces = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = [arr[i], i];
  }
  arr.sort(function(left, right) {
    return left[0] < right[0] ? -1 : 1;
  });

  arr.sortIndices = [];
  for (let j = 0; j < arr.length; j++) {
    arr.sortIndices.push(arr[j][1]);
    arr[j] = arr[j][0];
  }
  return arr;
}

const findRoute = () => {
  orderPoints = [];
  checkArr = []; 
  
  distAll.forEach((e) => {
    return checkArr.push(Object.values(e));
  });
  
  checkArr.slice(0).forEach((e) => {
    sortWithIndeces(e);
  })

  nextDestination = checkArr[0].sortIndices[1];
  orderPoints.push(nextDestination);
  alldistances = []
  alldistances.push(checkArr[0][1]);

  for (let i = 0; i < checkArr.length; i++){
    for (let j = 1; j < checkArr[i].sortIndices.length; j++){
      if (orderPoints.indexOf(checkArr[i].sortIndices[j]) === -1 && j < checkArr[i].sortIndices.length - 1 && checkArr[i].sortIndices[j] !== 0){
        orderPoints.push(checkArr[i].sortIndices[j]);
        alldistances.push(checkArr[i][j]);
        break;
      } 
    }
  } 
  orderPoints.push(0);
}

let total;

const shortestRoute = () => {
    total = 0;

    for (let i = 0; i < orderPoints.length - 1; i++){
            total = total + distAll[orderPoints[i]][orderPoints[i+1]];
            console.log(total);
        }
}
