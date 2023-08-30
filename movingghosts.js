var canvas = document.querySelector('.myCanvas');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
canvas.addEventListener('click', moveGhost);
function degToRad(degrees) {
    return degrees * Math.PI / 180;
}
function random(min, max){
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

const HEAD_RADIUS = 35;
const BODY_WIDTH = HEAD_RADIUS * 2;
const BODY_HEIGHT = 60;
const NUM_FEET = 3;
const FOOT_RADIUS = (BODY_WIDTH) / (NUM_FEET * 2); 
const PUPIL_RADIUS = 4;
const PUPIL_LEFT_OFFSET = 8;
const PUPIL_RIGHT_OFFSET = 20;
const EYE_RADIUS = 10;
const EYE_OFFSET = 14;

const centerX = width / 2;
const centerY = height / 2;


//Independent Algorithm 1
function Ghost(x, y, velX, velY, color){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
}
Ghost.prototype.draw = function (){
    //This first half of the function focuses on drawing the body of the ghost
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, HEAD_RADIUS, degToRad(0), degToRad(360), false);
    ctx.fill();
    ctx.closePath();
   
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - HEAD_RADIUS, this.y, BODY_WIDTH, BODY_HEIGHT);
    
    let fx = this.x - (BODY_WIDTH / NUM_FEET);
    let fy = this.y + BODY_HEIGHT;
    for (var i = 0; i < NUM_FEET; i++){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(fx, fy, FOOT_RADIUS, degToRad(0), degToRad(360), false);
        ctx.fill();
        ctx.closePath();
        fx += (FOOT_RADIUS * 2);
    }
    //This second half of the function focuses on the eyes of the ghost
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x - EYE_OFFSET, this.y, EYE_RADIUS, degToRad(0), degToRad(360), false);
    ctx.fill();
    ctx.closePath();

    ctx.filStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x + EYE_OFFSET, this.y, EYE_RADIUS, degToRad(0), degToRad(360), false);
    ctx.fill();
    ctx.closePath();
    
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(this.x - PUPIL_LEFT_OFFSET, this.y, PUPIL_RADIUS, degToRad(0), degToRad(360), false);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(this.x + PUPIL_RIGHT_OFFSET, this.y, PUPIL_RADIUS, degToRad(0), degToRad(360), false);
    ctx.fill();
    ctx.closePath();
}

//Independent Algorithm 2
Ghost.prototype.update = function(){
    
    if((this.x + BODY_WIDTH) >= width) {
        this.velX = -(this.velX);
      }
    
    if((this.x - BODY_WIDTH) <= 0) {
        this.velX = -(this.velX);
      }
    
    if((this.y + (BODY_HEIGHT + HEAD_RADIUS)) >= height) {
        this.velY = -(this.velY);
    }
    
    if((this.y - (BODY_HEIGHT + HEAD_RADIUS)) <= 0) {
        this.velY = -(this.velY);
    }
    this.x += this.velX;
    this.y += this.velY;     
}
Ghost.prototype.randomVel = function(){
    this.velX = random(-6, 6);
    this.velY = random(-6, 6);
}

//Main Algorithm
var ghosts = [];
var testGhost = new Ghost (centerX, centerY, random(-5, 5), random(5, -5), 'red');
testGhost.x;
testGhost.color;
testGhost.draw();
ghosts.push(testGhost);

var movement;
function moveGhost(){
    if (movement){
        clearInterval(movement);
        if (ghosts.length < 100){
            var ghost = new Ghost (centerX, centerY, 0, 0, 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')');
            ghost.x;
            ghost.color;
            ghost.draw();
            ghosts.push(ghost);
        }
        for(var i = 0; i < ghosts.length; i++){
            ghosts[i].randomVel();
        }
        movement =  0;
    }else{
        movement = setInterval(function(){
            ctx.clearRect(0, 0, width, height);
            for(var i = 0; i < ghosts.length; i++){
                ghosts[i].update();
                ghosts[i].draw();
            }
        }, 10); 
    }
}