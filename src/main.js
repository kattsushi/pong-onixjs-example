const p5 = require('p5');
const {OnixClient} = require('@onixjs/sdk');
const {Browser} = require('@onixjs/sdk/dist/core/browser.adapters');
const {Paddle} = require('./paddle');
const {Puck} = require('./puck');
let puck;
let left;
let right;
let ding;
let sdk;
let docsApp;
let postComponentRef;

function setReference() {
  sdk.AppReference('DocsApp').Module('PostModule').Component('PostComponent').Method('onCreate').stream((result)=> {
    console.log(result);
  });
}
let pong = new p5((sketch) => {
  sketch.preload = ()=> {
    // sketch.soundFormats('mp3', 'ogg');
    // ding = sketch.loadSound('beep-03.mp3');
    sdk= new OnixClient({
      host: 'http://localhost',
      port: 3000,
      adapters: {
          http: Browser.HTTP,
          websocket: Browser.WebSocket
      }
    });
    sdk.init().then(() => {
      setReference();
    });
  }
  
  sketch.setup= ()=> {
    sketch.createCanvas(600, 400);
    puck = new Puck(sketch);
    left = new Paddle(true, sketch);
    right = new Paddle(false, sketch);
  }
  
  sketch.draw = () => {
    sketch.background(0);
    puck.checkPaddleRight(right);
    puck.checkPaddleLeft(left);
  
    left.show(sketch);
    right.show(sketch);
    left.update();
    right.update();
    puck.update();
    puck.edges();
    let rightScore = puck.getScoreRight();
    let leftScore = puck.getScoreLeft();
    puck.show(sketch);
  
    sketch.fill(255);
    sketch.textSize(32);
    sketch.text(leftScore, 32, 40);
    sketch.text(rightScore, sketch.width - 64, 40);
  }
  sketch.keyReleased = () => {
    left.move(0);
    right.move(0);
  }
  sketch.keyPressed = () => {
    if (sketch.key == 'A') {
      left.move(-10);
    } else if (sketch.key === 'Z'){
      left.move(10);
    }
  
    if (sketch.key == 'J') {
      right.move(-10);
    } else if (sketch.key == 'M'){
      right.move(10);
    }
  };
}, 'body');
