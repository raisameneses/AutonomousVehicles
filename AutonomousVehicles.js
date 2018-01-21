
//used for vehicles starting position 
function randomInt(n) {
  return Math.floor(Math.random() * n);
}
//a Vector directs vehicle's movements and direction 
//as well as the target's location.  
var Vector = function (x, y) {
  this.vectorX = x,
    this.vectorY = y
}
Vector.prototype.addVector = function (v2) {
  this.x += v2.x;
  this.y += v2.y;
}
Vector.prototype.subtractVector = function (v2) {
  this.x -= v2.x;
  this.y -= v2.y;
}
//Calculates the distance between vectors
Vector.prototype.distance = function (v2) {
  var pow1 = Math.pow((this.x - v2.x), 2);
  var pow2 = Math.pow((this.y - v2.y), 2);
  return Math.sqrt(pow1 + pow2);
}

//Blueprint for a vehicle. Contains all the body information
var Circle = function (centerX, centerY, circleRadius) {
  this.cX = centerX;
  this.cY = centerY;
  this.center = new Vector(this.centerX, this.centerY);
  this.radius = circleRadius();
  this.area = computeDiameter();
  this.mass - 10;  //Test different numbers.. this can be passed. TO IMPROVE. 
  this.momentOfInertia = getCenterOfInertia();
}
Circle.prototype.MoveCircle = function (newPosition) {
  this.center.addVector(newPosition);
}
Circle.prototype.getX = function () {
  return this.cX;
}
Circle.prototype.getY = function () {
  return this.cY;
}
//sum of Mass * r^2 calculated based on moment of inertia for a circle
//used if we wat the vehicles to slow down. 
Circle.prototype.getCenterOfInertia = function () {
  var mInertia = this.mass * (Math.pow(this.radius, 2));
  return mInertia;
}
Circle.prototype.computeDiameter = function () {
  return 2 * this.radius;
}

//Vehicle. Uses phenotype of a circle. Makes decisions based on physics laws. 
var AutonomousVehicle = function (game) {
  let x = randomInt(800); 
  let y = randomInt(800); 
  this.game = game;
  this.radius = (game.ctx.height) / 50);
  this.lightLocation = new Vector((game.ctx.width / 2), (game.ctx..Height / 2));
  this.circle = new Circle(x, y, radius);  //Update the circle in every iteration
  this.leftSensor = LeftSensorDistance();
  this.rightSensor = RightSensorDistance();
  this speed = 5;
  cosnt angle = 90;
  this.torque = 0.0; //rotation angle in radians 
}

//Sensor located to the left of the vehicle
AutonomousVehicle.prototype.LeftSensorDistance = function () {
  let leftSensor = new Vector(this.circle.getX - radius, this.circle.getY);
  return leftSensor.distance(this.lightLocation);
}

//Sensor located to the right of the vehicle
AutonomousVehicle.prototype.RightSensorDistance = function () {
  var rightSensor = new Vector(this.circle.getX + radius, this.circle.getY);
  return rightSensor.distance(this.lightLocation);
}
//Selects the sensor closer to light source
AutonomousVehicle.prototype.CloserSensorToLight = function () {
  let left = LeftSensorDistance();
  let right = CloserSensorToLight();
  if (left < right) {
    return left;
  }
  return right;
}
//Difference in vector distance = force for torque
AutonomousVehicle.prototype.SensorDifference = function () {
  let left = LeftSensorDistance();
  let right = CloserSensorToLight();
  return Math.abs(left - right);
}

//Calculated radians based on force (sensor difference) radius and angle (always 90 degrees)
//This value could result in a 'slower turn' if we divide it by the
//MomentOfInertia of the circle. 
AutonomousVehicle.prototype.computeTorque = function (force) {
  return (force * this.radius * Math.sin(this.angle));
}

AutonomousVehicle.prototype.update = function () {
  let torqueForce = SensorDifference();
  let move = CloserSensorToLight();
  var distance = this.speed * this.game.clockTick; 
  var newPosition = new Vector(distance, distance);
  this.circle.MoveCircle(newPosition);
  this.torque = this.computeTorque(torqueForce);
}

//Passing the Canvas width and height to adapt the vehicles
// dimensions. 
AutonomousVehicle.prototype.draw = function () {
  DrawLight();
  ctx.rotate(this.torque); //rotatation in radians
  makeCircle(this.circle.getX, this.circle.getY, this.ratio, 'red');
  ctx.moveTo(this.circle.getX, this.circle.getY);
  ctx.lineTo(this.circle.getX, (this.circle.getY + (-this.ratio)));
  ctx.stroke();
}
function makeCircle(x, y, size, color) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI)
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}
AutonomousVehicle.prototype.DrawLight() {
  ctx.beginPath();
  ctx.arc(lightLocation.vectorX, lightLocation.vectorY, 40, 0, 2 * Math.PI);
  ctx.fillStyle = "rgb(233, 189, 21)";
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  // ctx.stroke();
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/960px-Blank_Go_board.png");
ASSET_MANAGER.queueDownload("./img/black.png");
ASSET_MANAGER.queueDownload("./img/white.png");

ASSET_MANAGER.downloadAll(function () {
  console.log("Loading Autonomous Vehicles.");
  var canvas = document.getElementById('gameWorld');
  var ctx = canvas.getContext('2d');


  var gameEngine = new GameEngine();
  var vehicle = new AutonomousVehicle(gameEngine);
  gameEngine.addEntity(automata);
  gameEngine.board = vehicle;
  gameEngine.init(ctx);
  gameEngine.start();
});
