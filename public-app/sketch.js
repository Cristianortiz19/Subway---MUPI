class Ingredient {
    constructor(xPos, yPos){
        this.x = xPos;
        this.y = yPos;
        this.type = Math.floor(random(0, 4));
        this.ingredientRandom();
    }

    show() {
        rectMode(CENTER);
        fill(255);
        rect(this.x, this.y, 250,50);
        fill(0);
        textAlign(CENTER, CENTER),
        textSize(20);
        text(this.ingredientType, this.x, this.y);
    }

    ingredientRandom() {
        switch (this.type) {
            case 0:
                this.ingredientType = 'Peperoni';
                break;
            case 1:
                this.ingredientType = 'Pollo';
                break;
            case 2:
                this.ingredientType = 'Cebolla';
                break;
            case 3:
                this.ingredientType = 'Lechuga';
                break;
            case 4:
                this.ingredientType = 'Tomate';
                break;
            default:
                break;
        }
    }
}

//Cowndown
timer = function() {
    setInterval(function() {
        count --;
    }, 1000);
}

const NGROK = `https://${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });

let controllerX, controllerY = 0;

let ingredients = [];

let mobileScreen = 2;

let count = 20;

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

    for (let i = 0; i < 5; i++) {
        ingredients.push(new Ingredient(windowWidth/2, (80 * i) + 210))
    }

    /*let btn = createButton("Permitir movimiento");
    btn.mousePressed(function(){
    DeviceOrientationEvent.requestPermission();
  });*/
  timer();
}

function draw() {
    background(0, 102,42);
    newCursor(pmouseX, pmouseY);
    fill(255);
    //Bread :D

    ingredients.forEach(element => {
        element.show();
    });

    switch (mobileScreen) {
        case 1:
            textSize(60);
            textAlign(CENTER);
            text("00 : " + count, windowWidth/2, windowHeight/2);

            if(count == 0){
                mobileScreen = 2;
                count = 10;
            }
            break;
        case 2:
            fill(253, 221, 202);
            rect(windowWidth/2, 120, 250,50);
            rect(windowWidth/2, 620, 250,50);
            textSize(60);
            textAlign(CENTER);
            text("00 : " + count, windowWidth/2, 80);
        default:
            break;
    }
}

function touchMoved() {
    
    socket.emit('mobile-instructions', { pmouseX, pmouseY });
    background(255, 0, 0);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor(x, y) {
    noStroke();
    fill(255);
    ellipse(x, y, 10, 10);
}