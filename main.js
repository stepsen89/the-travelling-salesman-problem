'use strict'

mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlcHNlbjg5IiwiYSI6ImNqaDZxb3Z1bDAwNGsycW11dnAwZ3N1ZXQifQ.LOs9yadH4E1wF_NcE_3Awg';

// load map
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [47.50, 11],
    zoom: 9
});

let points = [];

// get points on map by click
map.on('click', function (e) {
    let marker = new mapboxgl.Marker()
    .setLngLat([e.lngLat.lng, e.lngLat.lat])
    .addTo(map);
    
    // add up to 8 different points in points array, [0] is home point
    while(points.lenght <= 9){
        points.push(marker);
    }
});

// declaration of variables in global scope
let alldistances;
let destinationsOrder;
let nextDestination;
let distAll;

// function for distance between each points
const distanceBetween = (points) => {
  alldistances = [];
  destinationsOrder = [];
  nextDestination;
  distAll = [];
  
  // first loop through array to get starting point (adding turf "from")
  points.forEach((e, index) => {
    let from = turf.point([e._lngLat.lat, e._lngLat.lng]);
    let distIndex = {};

    // second loop to get end point (adding turf "to")
    points.forEach((e, index) => {
      let to = turf.point([e._lngLat.lat, e._lngLat.lng]);
      let distance = turf.distance(from, to, options);

      //store each end point (distance) and point (index)
      distIndex[index] = distance;
      
      return destinationsOrder, alldistances;
    })
    distAll.push(distIndex);
    return destinationsOrder, alldistances, distAll;
  })
  return
}

let checkArr;
let orderPoints;

//to sort the indeces of points (distance low to high)
function sortWithIndeces(toSort) {
  for (let i = 0; i < toSort.length; i++) {
    toSort[i] = [toSort[i], i];
  }
  toSort.sort(function(left, right) {
    return left[0] < right[0] ? -1 : 1;
  });

  toSort.sortIndices = [];
  for (let j = 0; j < toSort.length; j++) {
    toSort.sortIndices.push(toSort[j][1]);
    toSort[j] = toSort[j][0];
  }
  return toSort;
}
let test; 

const findRoute = () => {
  orderPoints = [];
  checkArr = = [];
  
  distAll.forEach((e) => {
    return checkArr.push(Object.values(e));
  });
  
  test = checkArr.slice(0).forEach((e) => {
    sortWithIndeces(e);
  })

  nextDestination = checkArr[0].sortIndices[1];
  orderPoints.push(nextDestination);
  alldistances = []
  alldistances.push(checkArr[0][1]);

  for (var i = 0; i < checkArr.length; i++){
    for (var j = 1; j < checkArr[i].sortIndices.length; j++){
      if (orderPoints.indexOf(checkArr[i].sortIndices[j]) === -1 && j < checkArr[i].sortIndices.length - 1 && checkArr[i].sortIndices[j] !== 0){
        orderPoints.push(checkArr[i].sortIndices[j]);
        alldistances.push(checkArr[i][j]);
        break;
      } 
    }
  } 
  orderPoints.push(0);
  
    

  function testing (obj, test){
    if ( test in obj){
    return obj[test];
    } else {
    return 'no';
    }
  }


  
  console.log(orderPoints);

}
