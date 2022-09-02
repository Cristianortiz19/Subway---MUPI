const NGROK = `https://${window.location.hostname}`;
let socket = io(NGROK, { path: '/real-time' });
console.log('Server IP: ', NGROK);

let controllerX, controllerY = 0;
let deviceWidth, deviceHeight = 0;
let mupiWidth, mupiHeight = 0;
let mupiScreen = 0;
let mupiIngredients = null;

let mupiImageFiles = [];

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
    controllerX = windowWidth / 2;
    controllerY = windowHeight / 2;
    mupiWidth = windowWidth;
    mupiHeight = windowHeight;
    background(0);
    mupiLoadImages();

    cargarImgIngredientes(mupiIngredients);
}

function draw() {
    newCursor(pmouseX, pmouseY);
    fill(255);

    switch (mupiScreen) {
        case 0:
            background(0, 102,42);
            image(mupiImageFiles[0], 0, 0, 480, 720);

            break;
        case 1:
            image(mupiImageFiles[1], 0, 0, 480, 720);
            break;
        case 2:
            image(mupiImageFiles[2], 0, 0, 480, 720);
            break;
        case 3:
            background(0, 102,42);
            image(mupiImageFiles[3], 0, 0, 480, 720);
            image(mupiImageFiles[20], windowWidth/2, 120, 250, 250);
            mupiIngredients.forEach((element, index) => {
                image(element.imageFile, 20, 20, 100, 100);
                //console.log(element.imageFile)
            });
            image(mupiImageFiles[20], windowWidth/2, 420, 250, 250);
            break;
        case 4:
            image(mupiImageFiles[4], 0, 0, 480, 720);
            break;
        case 6:
            background(0, 102,42);
            break;
        default:
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

socket.on('mupi-instructions', instructions => {
    console.log('ID: ' + socket.id);

    let { pmouseX, pmouseY } = instructions;
    controllerX = (pmouseX * mupiWidth) / deviceWidth;
    controllerY = (pmouseY * mupiHeight) / deviceHeight;
    console.log({ controllerX, controllerY });

    let { mobileScreen } = instructions;
    mupiScreen = mobileScreen;
});

socket.on('mupi-size', deviceSize => {
    let { windowWidth, windowHeight } = deviceSize;
    deviceWidth = windowWidth;
    deviceHeight = windowHeight;
    console.log(`User is using a smartphone size of ${deviceWidth} and ${deviceHeight}`);
});

socket.on('mupi-data', data => {
    let { ingredients, mobileScreen } = data;
    mupiScreen = mobileScreen;
    mupiIngredients = ingredients;
    array.forEach(element => {
        ingredientsFiles.push(loadImage('src/'+element.ingredientType+'.png'))
    });
})

function mupiLoadImages() {
    mupiImageFiles = [
        loadImage('src/MUPI 0.jpg'),
        loadImage('src/MUPI 1.jpg'),
        loadImage('src/MUPI 2.jpg'),
        loadImage('src/MUPI 3.jpg'),
        
    ]
    mupiImageFiles[20] = loadImage('src/pan.png');
}

function cargarImgIngredientes(array) {
    /*if(array.length != null){
        array.forEach(element => {
            ingredientsFiles.push(loadImage('src/'+element.ingredientType+'.png'))
        });
    }*/
    
}