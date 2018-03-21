class Paddle {
  constructor(left) {
    this.y = height / 2;
    this.w = 10;
    this.h = 100;
    this.ychange = 0;
    if (left) {
      this.x = this.w;
    } else {
      this.x = width - this.w;
    }
  }
  update(){
    this.y += this.ychange;
    this.y = constrain(this.y, this.h/2, height - this.h/2);
  }
  move(steps) {
    this.ychange = steps;
  }
  show() {
    fill(255);
    rectMode(CENTER);
    rect(this.x,this.y,this.w,this.h);
  }
}
class Puck {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.xspeed;
    this.yspeed;
    this.r = 12;
    this.reset();
  }
  checkPaddleLeft(p) {
    if (this.y < p.y + p.h / 2 && this.y > p.y - p.h / 2  && this.x - this.r < p.x + p.w/2 ) {
      // if (this.x < p.x) {
        let diff = this.y - (p.y - p.h /2);
        let rad = radians(45);
        let angle = map(diff, 0, p.h, -rad, rad);
        this.xspeed = 5 * cos(angle);
        this.yspeed = 5 * sin(angle);
        this.x = p.x - (p.w /2) -this.r;
        // this.xspeed *= -1;
      // }
    }
  }
  checkPaddleRight(paddle) {
    let p = paddle;
    if (this.y < p.y + p.h / 2 && this.y > p.y - p.h / 2  && this.x + this.r > p.x - p.w/2 ) {
      // if (this.x < p.x) {
        let diff = this.y -(p.y - p.h /2);
        let rad = radians(135);
        let angle = map(diff, 0, p.h, -rad, rad);
        this.xspeed = 5 * cos(angle);
        this.yspeed = 5 * sin(angle);
        this.x = p.x - (p.w /2) - this.r;
        // this.xspeed *= -1;
      // }jjjmj
    }
  }

  update() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
  }
  edges() {
   if (this.y < 0 || this.y > height) {
     this.yspeed *= -1;
   }
   if( this.x - this.r > width ) {
     this.reset();
     lefScore++;
     ding.play();
   }
   if (this.x + this.r < 0) {
     this.reset();
     rightScore++;
     ding.play();
   }
  }
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    
    this.angle = random(-PI/4, PI/4);
    this.xspeed = 5 * cos(this.angle);
    this.yspeed = 5 * sin(this.angle);
    if( random(1) < 0.5) {
      this.xspeed *= -1;
    }
  }
  show() {
    fill(255);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
}
let puck;
let left;
let right;
let lefScore = 0;
let rightScore = 0;
let ding;
function preload() {
  soundFormats('mp3', 'ogg');
  ding = loadSound('beep-03.mp3');
}
function setup() {
  createCanvas(600, 400);
  puck = new Puck();
  left = new Paddle(true);
  right = new Paddle(false);
}

function draw() {
  background(0);
  puck.checkPaddleRight(right);
  puck.checkPaddleLeft(left);

  left.show();
  right.show();
  left.update();
  right.update();
  puck.update();
  puck.edges();
  puck.show();

  fill(255);
  textSize(32);
  text(lefScore, 32, 40);
  text(rightScore, width - 64, 40);
}
function keyReleased()  {
  left.move(0);
  right.move(0);
}
function keyPressed() {
  if (key == 'A') {
    left.move(-10);
  } else if (key === 'Z'){
    left.move(10);
  }

  if (key == 'J') {
    right.move(-10);
  } else if (key == 'M'){
    right.move(10);
  }
};