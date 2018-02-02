var carObject = require('../models/carObject.js');

var numberOfCars = 5;
var currentCarID = 0;
var carArray = new Array(numberOfCars);
var frontendCarArray = new Array(numberOfCars);


function createDumbCars(){
  //initializes dumb cars
  for (var i = 0; i < numberOfCars; i++) {
      carArray[i] = new carObject;
      carArray[i] = generateDumbCar();
  }
}

function generateDumbCar(){
  var carType = "Dumb";
  var start = randomizeCarPos();
  var end = randomizeCarPos();
  let car = new carObject(currentCarID, start.x, start.y, end.x, end.y, carType);
  currentCarID++; // This will need to be removed from dumbcar and applied to all vehicle spawns
  car._xPos = start.x;
  car._yPos = start.y;

  // Initalizes cars starting orientation (since atm it's either going left or right it automatically sets this here)
  // This might need to change eventually because it's a bit of a work around (ask Paul for further explanation)
  if (start.x > end.x) { car._orientation = 180; }
  else { car._orientation = 0; }

  return car;
}

// TODO This randomization will have to be adjusted once djkistras in implemented
function randomizeCarPos() {
  //get StartX
  //get EdgeArray
  var edgeArrayLen = map.getNumOfEdges();
  var EdgeID = (Math.floor(Math.random()*edgeArrayLen));


  var A = [map.getStartX(EdgeID),map.getStartY(EdgeID)];
  var B = [map.getEndX(EdgeID),map.getEndY(EdgeID)];
  var m = slope(A, B);
  var b = intercept(A, m);

  var coordinates = [];
  for (var x = A[0]; x <= B[0]; x= x+0.5) {
    var y = m * x + b;
    coordinates.push([x, y]);
  }

  var occupancy = map.getCardsOnEdge(EdgeID);
  console.log(coordinates);
  var spawn = coordinates[Math.floor(Math.random()*coordinates.length)];


  // var x = Math.floor(Math.random() * 6);
  // var y = Math.floor(Math.random() * 6);

  return {x: spawn[0], y: spawn[1]};
}

function getFrontendCarArr(){
  for (var i = 0; i < numberOfCars; i++) {
      frontendCarArray[i] = {_xPos: carArray[i]._xPos, _yPos: carArray[i]._yPos, _orientation: carArray[i]._orientation}
  }
  return frontendCarArray;
}

function getCar(carID) {
  for (var i = 0; i < carArray.length; i++) {
    if (carArray[i]._carID == carID) {
      return carArray[i];
    }
  }
  return "Error in carCreation.js";
}
function slope(a, b) {
    if (a[0] == b[0]) {
        return null;
    }

    return (b[1] - a[1]) / (b[0] - a[0]);
}
function intercept(point, slope) {
    if (slope === null) {
        // vertical line
        return point[0];
    }

    return point[1] - slope * point[0];
}




function getCarArr(){
  return carArray;
}

function setCarArr(cars){
  carArray = cars;
}

module.exports = {createDumbCars, getCarArr, setCarArr, getFrontendCarArr, getCar};
