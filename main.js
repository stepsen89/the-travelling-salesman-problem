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
  
  test = checkArr.slice(0);
  console.log("test" + test);


  distAll.forEach((e) => {
    return checkArr.push(Object.values(e));
  });

  checkArr.forEach((e) => {
    sortWithIndeces(e);
  })

  console.log(checkArr);

    // function sortWithIndeces(toSort) {
    //   for (var i = 0; i < toSort.length; i++) {
    //     toSort[i] = [toSort[i], i];
    //   }
    //   toSort.sort(function(left, right) {
    //     return left[0] < right[0] ? -1 : 1;
    //   });
    //   toSort.sortIndices = [];
    //   for (var j = 0; j < toSort.length; j++) {
    //     toSort.sortIndices.push(toSort[j][1]);
    //     toSort[j] = toSort[j][0];
    //   }
    //   return toSort;
    // }
    
    // var test = ['b', 'c', 'd', 'a'];
    // sortWithIndeces(test);
    // alert(test.sortIndices.join(","));
    // var nextPoint = checkArr[1].indexOf(Math.min(...checkArr[1]));

  

  // var months = ['March', 'Jan', 'Feb', 'Dec'];
  //   months.sort();
  //   console.log(months);
    // expected output: Array ["Dec", "Feb", "Jan", "March"]

    // var indices = test.sortIndices();
    // var array1 = [1, 30, 4, 21];
    // array1.sort();
    // console.log(array1);
// expected output: Array [1, 21, 30, 4]

  // console.log(nextPoint);

  // var obj = {0: 90, 1: 3.3910236712081243, 2: 7.020198887190595, 3: 8.272155894468368}
  // console.log(obj);
  // var arr = Object.values(obj);
  // var min1 = arr.indexOf(Math.min(...arr));

  // var route = [];

  // route.push(min1);

}

// sort each array inside the checkArr
// function sortWithIndeces(toSort) {
//   for (var i = 0; i < toSort.length; i++) {
//     toSort[i] = [toSort[i], i];
//   }
//   toSort.sort(function(left, right) {
//     return left[0] < right[0] ? -1 : 1;
//   });
//   toSort.sortIndices = [];
//   for (var j = 0; j < toSort.length; j++) {
//     toSort.sortIndices.push(toSort[j][1]);
//     toSort[j] = toSort[j][0];
//   }
//   return toSort;
// }



