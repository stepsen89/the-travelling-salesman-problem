'use strict'

mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlcHNlbjg5IiwiYSI6ImNqaDZxb3Z1bDAwNGsycW11dnAwZ3N1ZXQifQ.LOs9yadH4E1wF_NcE_3Awg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-74.50, 40],
    zoom: 9
});

let points = [];

map.on('click', function (e) {
  document.getElementById('info').innerHTML =
      JSON.stringify(e.point) + '<br />' +
      JSON.stringify(e.lngLat);

      var marker = new mapboxgl.Marker()
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(map);
        
        if (points.length < 8){
          points.push(marker);
        } else {
          console.log("not added");
        }
});

let alldistances;
let shorter;
let destinationsOrder;
let nextDestination;
let home;

let distAll;


const distanceMeasurement = (points) => {
  shorter = 0;
  alldistances = [];
  destinationsOrder = [];
  nextDestination;
  distAll = [];
  
  console.log(shorter);
  
  
  points.forEach((e, index) => {
    var from = turf.point([e._lngLat.lat, e._lngLat.lng]);
    console.log(index + ' index');
    let newDist = [];
    let distIndex = {};

    points.forEach((e, index) => {
      var to = turf.point([e._lngLat.lat, e._lngLat.lng]);
      var options = {units: 'kilometres'};
      var distance = turf.distance(from, to, options);
      console.log('distance is ' + distance, 'index is ' + index);
      distIndex[index] = distance;
      
      return shorter, nextDestination, destinationsOrder, alldistances;
    })
    // destinationsOrder.push(nextDestination);
    // alldistances.push(shorter);
    distAll.push(distIndex);
    return shorter, nextDestination, destinationsOrder, alldistances, distAll;
  })
  return console.log(alldistances, shorter, nextDestination, destinationsOrder, distAll);
}

let checkArr;
let orderPoints;
let indiz;

function sortWithIndeces(toSort) {
  for (var i = 0; i < toSort.length; i++) {
    toSort[i] = [toSort[i], i];
  }
  toSort.sort(function(left, right) {
    return left[0] < right[0] ? -1 : 1;
  });

  toSort.sortIndices = [];
  for (var j = 0; j < toSort.length; j++) {
    toSort.sortIndices.push(toSort[j][1]);
    toSort[j] = toSort[j][0];
  }
  return toSort;
}
var test; 

const findRoute = () => {
  orderPoints = [];
  checkArr = []; 
  indiz = [];
  
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

var geojson = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [0, 0]
            ]
        }
    }]
};

var speedFactor = 50;
var animation;
var startTime = 0;
var progress = 0;
var resetTime = false;
var pauseButton = document.getElementById('pause');

map.on('load', function() {

    // add the line which will be modified in the animation
    map.addLayer({
        'id': 'line-animation',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': geojson
        },
        'layout': {
            'line-cap': 'round',
            'line-join': 'round'
        },
        'paint': {
            'line-color': '#000000',
            'line-width': 3,
            'line-opacity': 1
        }
    });

    startTime = performance.now();

    animateLine();

    // click the button to pause or play
    pauseButton.addEventListener('click', function() {
        pauseButton.classList.toggle('pause');
        if (pauseButton.classList.contains('pause')) {
            cancelAnimationFrame(animation);
        } else {
            resetTime = true;
            animateLine();
        }
    });

    // reset startTime and progress once the tab loses or gains focus
    // requestAnimationFrame also pauses on hidden tabs by default
    document.addEventListener('visibilitychange', function() {
        resetTime = true;
    });

    // animated in a circle as a sine wave along the map.
    function animateLine(timestamp) {
        if (resetTime) {
            // resume previous progress
            startTime = performance.now() - progress;
            resetTime = false;
        } else {
            progress = timestamp - startTime;
        }

        // restart if it finishes a loop
        if (progress > speedFactor * 360) {
            startTime = timestamp;
            geojson.features[0].geometry.coordinates = [];
        } else {
            var x = progress / speedFactor;
            // draw a sine wave with some math.
            var y = Math.sin(x * Math.PI / 90) * 40;
            // append new coordinates to the lineString
            geojson.features[0].geometry.coordinates.push([x, y]);
            // then update the map
            map.getSource('line-animation').setData(geojson);
        }
        // Request the next frame of the animation.
        animation = requestAnimationFrame(animateLine);
    }
});


