// // Crear un programa que contenga 2 circulos (rojo y azul) en movimiento dentro de una ventana de 600 X 600
// // a. El circulo rojo se mueve mas rápido que el azul
// // b. EL circulo azul cambia de tono de color cuando colisiona con el piso
// // c. El circulo rojo cambia de tono de color cuando colisiona con el techo
// // d. Si ambos circulos conlisionan, rebotan y cambian automáticamente al color violeta que se va a ir disipando hasta volver al color de origen en un lapso de 1.5 segundos

let ballRedx = 20;
let ballRedy = 50;

let ballBluex = 20;
let ballBluey = 20;

let directionRedX = 0;
let directionRedY = 0;

let directionBlueX = 0;
let directionBlueY = 0;

let Bluecolor;
let Redcolor;
let isCollision = false;
let collisionTimer = 0;
const collisionDuration = 1500; // Duración del cambio de color en milisegundos

function redBall() {
  ellipse(ballRedx, ballRedy, 30, 30);

  if (ballRedx <= 20) {
    directionRedX = 1;
  }

  if (ballRedx >= 580) {
    directionRedX = -1;
  }

  if (ballRedy >= 580) {
    directionRedY = -1;
  }
  if (ballRedy <= 30) {
    directionRedY = 1;
    Redcolor = color(random(255), random(255), random(255));
  }

  ballRedx += directionRedX * 8;
  ballRedy += directionRedY * 6;
}

function blueBall() {
  ellipse(ballBluex, ballBluey, 30, 30);

  if (ballBluex <= 20) {
    directionBlueX = 1;
  }

  if (ballBluex >= 580) {
    directionBlueX = -1;
  }

  if (ballBluey >= 580) {
    directionBlueY = -1;
    Bluecolor = color(random(255), random(255), random(255));
  }
  if (ballBluey <= 30) {
    directionBlueY = 1;
  }

  ballBluex += directionBlueX * 6;
  ballBluey += directionBlueY * 4;
}

function setup() {
  createCanvas(600, 600);
  Redcolor = color(255, 0, 0);
  Bluecolor = color(0, 0, 255);
}

function draw() {
  background(0, 0, 0);

  if (isCollision && millis() - collisionTimer >= collisionDuration) {
    isCollision = false;
    Redcolor = color(255, 0, 0); // Cambiar el color de vuelta después del tiempo de colisión
    Bluecolor = color(0, 0, 255);
  }

  fill(Redcolor);
  redBall();
  fill(Bluecolor);
  blueBall();

  let distance = dist(ballRedx, ballRedy, ballBluex, ballBluey);
  if (distance <= 30 && !isCollision) {
    isCollision = true;
    collisionTimer = millis(); // Iniciar temporizador cuando hay colisión
    Redcolor = color(255, 0, 255); // Cambiar color de las pelotas a morado
    Bluecolor = color(255, 0, 255);

    // Intercambiar direcciones después de la colisión
    let tempX = directionRedX;
    let tempY = directionRedY;

    directionRedX = directionBlueX;
    directionRedY = directionBlueY;
    directionBlueX = tempX;
    directionBlueY = tempY;
  }
}
