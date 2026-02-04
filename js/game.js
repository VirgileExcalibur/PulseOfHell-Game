const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "../assets/textures/background/tile_floor.png";

var playerImg_front1 = new Image();
playerImg_front1.src = "../assets/textures/sprites/baby_cheese_front1.png";

var playerImg_left1 = new Image();
playerImg_left1.src = "../assets/textures/sprites/baby_cheese_left1.png";

var playerImg_right1 = new Image();
playerImg_right1.src = "../assets/textures/sprites/baby_cheese_right1.png";

var playerImg_back1 = new Image();
playerImg_back1.src = "../assets/textures/sprites/baby_cheese_back1.png";

var playerImg_front2 = new Image();
playerImg_front2.src = "../assets/textures/sprites/baby_cheese_front2.png";

var playerImg_left2 = new Image();
playerImg_left2.src = "../assets/textures/sprites/baby_cheese_left2.png";

var playerImg_right2 = new Image();
playerImg_right2.src = "../assets/textures/sprites/baby_cheese_right2.png";

var playerImg_back2 = new Image();
playerImg_back2.src = "../assets/textures/sprites/baby_cheese_back2.png";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // boss.x = canvas.width / 2;
  // boss.y = canvas.height / 2;
}

function drawBackground() {
  const pattern = ctx.createPattern(img, "repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

var player_size = 96;
var player = {
  x: 0,
  y: 0,
  width: player_size,
  height: player_size,
  speed: 6,
  direction: "front",
  attack: "False",
  draw: function() {
        if (this.direction == "left"){
          if (this.attack == "True"){
            ctx.drawImage(playerImg_left2, this.x, this.y, this.width, this.height);
          }
          else{
            ctx.drawImage(playerImg_left1, this.x, this.y, this.width, this.height);
          }
        }
        if (this.direction == "right"){
          if (this.attack == "True"){
            ctx.drawImage(playerImg_right2, this.x, this.y, this.width, this.height);
          }
          else{
            ctx.drawImage(playerImg_right1, this.x, this.y, this.width, this.height);
          }
        }
        if (this.direction == "front"){
          if (this.attack == "True"){
            ctx.drawImage(playerImg_front2, this.x, this.y, this.width, this.height);
          }
          else{
            ctx.drawImage(playerImg_front1, this.x, this.y, this.width, this.height);
          }
        }
        if (this.direction == "back"){
          if (this.attack == "True"){
            ctx.drawImage(playerImg_back2, this.x, this.y, this.width, this.height);
          }
          else{
            ctx.drawImage(playerImg_back1, this.x, this.y, this.width, this.height);
          }
        }
  }
};

var boss ={
  // radius: 50,
  // color: "red",
  x: (window.innerWidth - 128) / 2,
  y: (window.innerHeight - 128) / 2,
  width: 128,
  height: 128,
  draw: function () {
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    // ctx.closePath();
    // ctx.fillStyle = this.color;
    // ctx.fill();
    ctx.drawImage(playerImg_right1, this.x, this.y, this.width, this.height);
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
  if (keys['q'] && player.x > 0) {
    player.x -= player.speed;
    player.direction = "left";
  };
  if (keys['d'] && player.x + player.width < canvas.width) {
    player.x += player.speed;
    player.direction = "right";
  };
  if (keys['z'] && player.y > 0) {
    player.y -= player.speed;
    player.direction = "back";
  };
  if (keys['s'] && player.y + player.height < canvas.height) {
    player.y += player.speed;
    player.direction = "front";
  };
}


function gameLoop() {
  drawBackground();
  update();
  boss.draw();
  player.draw();
  requestAnimationFrame(gameLoop);
}


let loaded = 0;
[img, playerImg_front1].forEach(img => {
  img.onload = () => {
    loaded++;
    if (loaded === 2) {
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      gameLoop();
    }
  };
});
