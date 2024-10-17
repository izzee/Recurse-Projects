let webcam;
let localSnapshot
let snapshot;
let valueX;
let valueY;
let width = window.innerWidth;
let height = window.innerHeight;


function setup() {
  createCanvas(width, height);
  webcam = createCapture(VIDEO);
  webcam.size(width, height);
  webcam.hide()
  maskLayer = createGraphics(width, height);
  skrimLayer = createGraphics(width, height)
  skrimLayer.background(255, 255, 255, 100)

}

function draw() {
    
  image(webcam, 0, 0, width, height)
  maskLayer.noStroke()
  for (let i=0; i<500; i++) {
    const xPos = Math.random() * width
    const yPos = Math.random() * height
    randomSnapshot = get(xPos, yPos)
    randomSnapshot[3] = 200
    maskLayer.fill(randomSnapshot)
    maskLayer.square(xPos, yPos, Math.random()*25)
  }
  
  if(mouseIsPressed) {
    localSnapshot = get(mouseX, mouseY);
    maskLayer.fill(localSnapshot)
    maskLayer.square(mouseX, mouseY, 100)
  }  
  image(skrimLayer,0,0, width, height)
  
  image(maskLayer,0,0, width, height)

}


function mousePressed() { 
  valueX = mouseX; 
  valueY = mouseY; 
  snapshot = get(valueX, valueY);
  image(skrimLayer, 0 , 0, width, height)
} 

function mouseReleased() {

  // background(255)


}