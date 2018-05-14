'use strict'

mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlcHNlbjg5IiwiYSI6ImNqaDZxb3Z1bDAwNGsycW11dnAwZ3N1ZXQifQ.LOs9yadH4E1wF_NcE_3Awg';

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
    center: [-74.50, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
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
          console.log("added");
        } else {
          console.log("not added");
          points.forEach((e) => console.log(e._lngLat.lat));
        }
});

console.log(points);

let distances = [];
let home;

const distanceMeasurement = (points) => {
  points.forEach((e) => {
    console.log('the element is' + e._lngLat.lat);
    var from = turf.point([e._lngLat.lat, e._lngLat.lng]);
    points.forEach((e) => {
      var to = turf.point([e._lngLat.lat, e._lngLat.lng]);
      var options = {units: 'kilometres'};
      var distance = turf.distance(from, to, options);
      console.log(distance);
      distances.push(distance);
      console.log(distances);
    })
  })
  return distances;
}

console.log(distanceMeasurement(points));


Punkt A -> B, C, D, E, F, G, H

A Home