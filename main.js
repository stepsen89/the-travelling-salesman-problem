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
        
        if (points.length < 2){
          points.push(marker);
        } else {
          console.log("not added");
        }
});

let distances = [];
let shorter;
let destinationsORder = [];
let nextDestination;
let home;

const distanceMeasurement = (points) => {
  points.forEach((e) => {
    console.log('the element is' + e._lngLat.lat);
    var from = turf.point([e._lngLat.lat, e._lngLat.lng]);

    points.forEach((e) => {
      var to = turf.point([e._lngLat.lat, e._lngLat.lng]);
      var options = {units: 'kilometres'};
      var distance = turf.distance(from, to, options);
      if (shorter === 0){
        shorter = distance;
        nextDestination = e;
        return;
      } else if (shorter > distance){
        shorter = distance;
        nextDestination = e;
        return;
      } else if (shorter < distance){
        return;
      }
    })
  })
  return distances, shorter, nextDestination;
}