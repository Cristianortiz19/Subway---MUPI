class Ingredient {
    constructor(){
        this.x = 100;
        this.y = 100;
        //this.type = math.random()
    }

    show() {
        //rectMode(CENTER);
        //rect(windowWidth/2, 150, 250,50);
    }
}
const NGROK = `https://${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });

let controllerX, controllerY = 0;

let ingredients;

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
    controllerX = windowWidth / 2;
    controllerY = windowHeight / 2;
    background(0);
    angleMode(DEGREES);

    socket.emit('device-size', {windowWidth, windowHeight});

    ingredients = new Ingredient();

    /*let btn = createButton("Permitir movimiento");
    btn.mousePressed(function(){
    DeviceOrientationEvent.requestPermission();
  });*/

}

function draw() {
    background(0, 5);
    newCursor(pmouseX, pmouseY);
    fill(255);
    ellipse(controllerX, controllerY, 50, 50);
    //Bread :D
    rectMode(CENTER);
    rect(windowWidth/2, 150, 250,50);
    rect(windowWidth/2, 400, 250,50);
    ingredients.show();
}

function touchMoved() {
    switch (interactions) {
        case 0:
            socket.emit('mobile-instructions', { interactions, pmouseX, pmouseY });
            background(255, 0, 0);
            break;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor(x, y) {
    noStroke();
    fill(255);
    ellipse(x, y, 10, 10);
}