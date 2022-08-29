const NGROK = `https://${window.location.hostname}`;
let socket = io(NGROK, { path: '/real-time' });
console.log('Server IP: ', NGROK);

let controllerX, controllerY = 0;
let deviceWidth, deviceHeight = 0;
let mupiWidth, mupiHeight = 0;
let mupiScreen = 0;


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
}

function draw() {
    newCursor(pmouseX, pmouseY);
    fill(255);

    switch (mupiScreen) {
        case 0:
            background(0, 102,42);
            textAlign(CENTER);
            textSize(30);
            text('Juega y gana', windowWidth/2, 150);
            rectMode(CENTER);
            rect(windowWidth/2, 300, 250, 250);
            textSize(15);
            text('Escanea el código', windowWidth/2, 450);

            break;
        case 1:
            rect(windowWidth/2, 120, 250,50);
            rect(windowWidth/2, 620, 250,50);
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