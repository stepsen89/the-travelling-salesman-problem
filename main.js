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

const findRoute = () => {
  checkArr = [];
  console.log(distAll);
  var obj = {0: 90, 1: 3.3910236712081243, 2: 7.020198887190595, 3: 8.272155894468368}
  console.log(obj);
  var arr = Object.values(obj);
  var min1 = arr.indexOf(Math.min(...arr));

  var route = [];

  route.push(min1);

  distAll.forEach((e) => {
    return checkArr.push(Object.values(e));
  });

  console.log(checkArr);


}

