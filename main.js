'use strict'

// create mapbox gl map
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlcHNlbjg5IiwiYSI6ImNqaDZxb3Z1bDAwNGsycW11dnAwZ3N1ZXQifQ.LOs9yadH4E1wF_NcE_3Awg';

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [- 0.104790, 51.524038],
    zoom: 9
});

// array for storing points
let points = [];

// get points on map by click
map.on('click', function (el) {

  //create new marker with lat, lng
  let marker = new mapboxgl.Marker()
  .setLngLat([el.lngLat.lng, el.lngLat.lat])
  .addTo(map);

  // up to 8 points 
  if (points.length <= 8){
      points.push(marker);
  }
});


// array for all distances between all points (to check shortest)
let allDistances;

// to measure distance between all points
const distanceMeasurement = (points) => {
  allDistances = [];
  
  // measure distance between points (turf: from point)
  points.forEach((e, index) => {
    let from = turf.point([e._lngLat.lat, e._lngLat.lng]);
    // for each point - distance to every point
    let distIndex = {};

    // to get distance to each point (turf: to - end point)
    points.forEach((e, index) => {
      let to = turf.point([e._lngLat.lat, e._lngLat.lng]);

      // options: kilometres
      let options = {units: 'kilometres'};

      // define distance and store it in array with index
      let distance = turf.distance(from, to, options);
      distIndex[index] = distance;
      
      return
    })
    // store every distIndex
    allDistances.push(distIndex);

    return
  })
  return
}

// checkArr = store distances in order, including sortIndices (to find closest neighbor)
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
  
  allDistances.forEach((e) => {
    return checkArr.push(Object.values(e));
  });
  
  // create sorted indeces array in checkArr
  checkArr.slice(0).forEach((e) => {
    sortWithIndeces(e);
  })

  orderPoints.push(checkArr[0].sortIndices[1]);

  for (let i = 0; i < checkArr.length; i++){
    for (let j = 1; j < checkArr[i].sortIndices.length; j++){
      if (orderPoints.indexOf(checkArr[i].sortIndices[j]) === -1 && j < checkArr[i].sortIndices.length - 1 && checkArr[i].sortIndices[j] !== 0){
        orderPoints.push(checkArr[i].sortIndices[j]);
        break;
      } 
    }
  } 
  // endpoint: home
  orderPoints.push(0);
}


let total;
let travellingRoute;

//finding the shortest route (kilometres and create travellingRoute)
const shortestRoute = () => {
    travellingRoute = [];
    total = allDistances[0][orderPoints[0]];

    // set beginning route (home to next points) 
    travellingRoute.push(points[0]);
    for (let i = 0; i < orderPoints.length -1; i++){
            total = total + allDistances[orderPoints[i]][orderPoints[i+1]];
            travellingRoute.push(points[orderPoints[i]]);
            console.log(total);
        }
    
    // set end point (last point to home point);
    travellingRoute.push(points[0]);
    // return total;
    return total, travellingRoute;
}

// displaying the shortest route with lines between (button)
const onClick = () => {
  distanceMeasurement(points);
  findRoute(allDistances);
  shortestRoute(orderPoints);


  let coord = [];

  travellingRoute.forEach((point) => {
    coord.push([point._lngLat.lng, point._lngLat.lat]);
  });

  // create geojson object for lines between points (coordinates)
  let geojson = {
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
        "line-color": "#000000",
        "line-width": 4
    }
  });
}