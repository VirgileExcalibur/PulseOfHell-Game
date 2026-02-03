const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "../assets/textures/background/tile_floor.png";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawBackground();
}

function drawBackground() {
  const pattern = ctx.createPattern(img, "repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

img.onload = () => {
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
};
var playerImg = new Image();
playerImg.src = "../assets/textures/sprites/baby_chesse_front.png";


var player = {
  x: 0,
  y: 0,         
  width: 64,
  height: 64,  
  color: "green",  
  speed: 6,
  draw: function() {
        ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);

  }
};


var boss ={
  x: canvas.width / 0.7,   
  y: canvas.height / 0.7,   
  vx: 5,
  vy: 2,
  radius: 50,
  color: "red",
  draw: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
}

var keys = {};
document.addEventListener('keydown', function(e) {
  keys[e.key] = true;
});
document.addEventListener('keyup', function(e) {
  keys[e.key] = false;
});

function update() {
  if (keys['q'] && player.x > 0) player.x -= player.speed;
  if (keys['d'] && player.x + player.width < canvas.width) player.x += player.speed;
  if (keys['z'] && player.y > 0) player.y -= player.speed;
  if (keys['s'] && player.y + player.height < canvas.height) player.y += player.speed;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  update();          
  player.draw();    
  boss.draw()
  requestAnimationFrame(draw); 
}

draw();
