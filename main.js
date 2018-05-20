// 'use strict'

// create mapbox gl map
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlcHNlbjg5IiwiYSI6ImNqaDZxb3Z1bDAwNGsycW11dnAwZ3N1ZXQifQ.LOs9yadH4E1wF_NcE_3Awg';

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [43, 11],
    zoom: 9
});

// array for storing points
let points = [];

// get points on map by click
map.on('click', function (e) {
    //create new marker
    let marker = new mapboxgl.Marker()
    .setLngLat([e.lngLat.lng, e.lngLat.lat])
    .addTo(map);

    if (points.length <= 8){
        points.push(marker);
    }
});


// set home
let home = points[0];

let alldistances;
let destinationsOrder;
let nextDestination;
let distAll;

const distanceMeasurement = (points) => {
  destinationsOrder = [];
  distAll = [];
  
  // measure distance between points (turf: from point)
  points.forEach((e, index) => {
    let from = turf.point([e._lngLat.lat, e._lngLat.lng]);
    let newDist = [];
    let distIndex = {};

    // to get distance to each point (turf: to - end point)
    points.forEach((e, index) => {
      let to = turf.point([e._lngLat.lat, e._lngLat.lng]);

      // options: kilometres
      let options = {units: 'kilometres'};

      // define distance
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
let travellingRoute;
// //distAll = distanzen zwischen den einzelnen Punkten also von 0 auf 0 - max length
// //orderpoints is die Reihenfolge der kürzesten Distanzen also 0, 4, 3, 2, 1 

const shortestRoute = () => {
    travellingRoute = [];
    total = distAll[0][orderPoints[0]];
    // set beginning route 
    travellingRoute.push(points[0]);
    for (let i = 0; i < orderPoints.length; i++){
            total = total + distAll[orderPoints[i]][orderPoints[i+1]];
            travellingRoute.push(points[orderPoints[i]]);
            console.log(total);
        }
    // return total;
    return total, travellingRoute;

}

const onClick = () => {
  var coord = [];

  travellingRoute.forEach((point) => {
    coord.push([point._lngLat.lng, point._lngLat.lat]);
  });

  // orderpoints hat alle in der reihenfolge wie ich sie brauche
  // points aber alle von 0 bis x

  var geojson = {
      "type": "FeatureCollection",
      "features": [{
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "properties": {},
              "coordinates": coord
          }
      }]
  };

  map.addLayer({
    "id": "LineString",
    "type": "line",
    "source": {
        "type": "geojson",
        "data": geojson
    },
    "layout": {
        "line-join": "round",
        "line-cap": "round"
    },
    "paint": {
        "line-color": "#BF93E4",
        "line-width": 5
    }
});

    var coordinates = geojson.features[0].geometry.coordinates;
    var bounds = coordinates.reduce(function(bounds, coord) {
        return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

    map.fitBounds(bounds, {
        padding: 20
    });

  console.log(geojson);

}