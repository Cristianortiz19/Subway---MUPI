class Ingredient {
    constructor(xPos, yPos){
        this.x = xPos;
        this.y = yPos;
        this.type = Math.floor(random(0, 4));
        this.ingredientRandom();
        
    }

    ingredientRandom() {
        switch (this.type) {
            case 0:
                this.ingredientType = 'Cebolla';
                break;
            case 1:
                this.ingredientType = 'Lechuga';
                break;
            case 2:
                this.ingredientType = 'Pepinillos';
                break;
            case 3:
                this.ingredientType = 'Queso';
                break;
            case 4:
                this.ingredientType = 'Tomate';
                break;
            default:
                break;
        }
    }
    show(){
        //image(this.imageFile, this.x, this.y);
    }
}

//Cowndown
timer = function() {
    setInterval(function() {
        if(count > 0){
            count --;
        }
    }, 1000);
}

const NGROK = `https://${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });

let controllerX, controllerY = 0;

let ingredients = [];

let mixIngredients;                                         

let mobileScreen = 1;

let count = 20;

let imageFiles = [];

let ingredientsFiles = [];

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

    loadIMG();

    socket.emit('device-size', {windowWidth, windowHeight});

    for (let i = 0; i < 5; i++) {
        ingredients.push(new Ingredient(windowWidth/2, (45 * i) + 170))
    }
    //Mezclar ingredientes
    mixIngredients = ingredients;

    /*let btn = createButton("Permitir movimiento");
    btn.mousePressed(function(){
    DeviceOrientationEvent.requestPermission();
  });*/
  switch (mobileScreen) {
    case 3:
        count = 20;
        break;
  
    default:
        break;
  }
  timer();

  cargarImgIngredientes(mixIngredients);

}

function draw() {
    fill(255);
    //Bread :D

    switch (mobileScreen) {
        case 1:
            image(imageFiles[20], 0, 0, 395, 853);
            break;
        
        case 2:
            image(imageFiles[21], 0, 0, 395, 853);
            
            break;
        case 3:
            image(imageFiles[22], 0, 0, 395, 853);
            textSize(60);
            textAlign(CENTER);
            text("00 : " + count, windowWidth/2, windowHeight/2);

            if(count == 0){
                mobileScreen = 4;
                count = 20;
            }
            break;
        case 4:
            imageMode(CORNER);
            image(imageFiles[23], 0, 0, 395, 853);
            fill(253, 221, 202);
            imageMode(CENTER)
            image(imageFiles[0], windowWidth/2, 150, 250, 250);
            rectMode(CENTER);
            textSize(60);
            textAlign(CENTER);
            fill(255);

            let xPos = 70;
            let yPos = 550;
            for (let i = 0; i < mixIngredients.length; i++) {
                const element = mixIngredients[i];

                if(xPos > 400){
                    yPos += 70;
                    xPos = 70;
                }
                element.x = xPos;
                element.y = yPos;
                xPos += 120;
                image(ingredientsFiles[i], element.x, element.y, 150, 150);
            }

            image(imageFiles[0], windowWidth/2, 440, 250, 250);
        case 5:
            //image(imageFiles[24], 0, 0, 395, 853);
            break;
        default:
            break;
    }
    socket.emit('mobile-data', { ingredients, mobileScreen });
}

function touchMoved() {
    /*for (let i = 0; i < mixIngredients.length; i++) {
        const element = mixIngredients[i];
        if(xPos > 400){
            yPos += 50;
            xPos = 70;
        }
        if (pmouseX > xPos -55 && pmouseX < xPos + 55 &&
            pmouseY > yPos && pmouseY < yPos+70) {
            element.x = pmouseX;
            element.y = pmouseY;
            console.log(element);
        }
        xPos += 120;
    }*/
    //socket.emit('mobile-instructions', { pmouseX, pmouseY});
    
}
function mousePressed() {
    switch (mobileScreen) {
        case 1:
            if (pmouseX > 40 && pmouseX < 360 &&
                pmouseY > 480 && pmouseY < 550){
                    mobileScreen = 2;
                }
            break;
        case 2:
            setInterval(function() {
                if (pmouseX > 40 && pmouseX < 360 &&
                    pmouseY > 480 && pmouseY < 550){
                        mobileScreen = 3;
                        
                    }
            }, 1000);
            
            break;
    
        default:
            break;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function loadIMG() {
    imageFiles[0] = loadImage('src/pan.png');
    imageFiles[20] = loadImage('src/APP 0.jpg');
    imageFiles[21] = loadImage('src/APP 1.jpg');
    imageFiles[22] = loadImage('src/APP 2.jpg');
    imageFiles[23] = loadImage('src/APP 3.jpg');
    imageFiles[24] = loadImage('src/APP 4.jpg');

    ingredients.forEach(element => {
        element.imageFile = loadImage('src/'+element.ingredientType+'.png');
    });
}

//Recolección de datos
let username = "";
let email = "";

const init = function(){
    document.getElementById('button-submit').addEventListener('click', submit);
}

const submit = function(){
    username = document.getElementById('name');
    email = document.getElementById('email');
}

function cargarImgIngredientes(array) {
    array.forEach(element => {
        ingredientsFiles.push(loadImage('src/'+element.ingredientType+'.png'))
    });
}


document.addEventListener('DOMContentLoaded', init);