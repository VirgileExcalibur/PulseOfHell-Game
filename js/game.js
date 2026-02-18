import * as assets from './assets_loader.js';
import * as physics from './physics.js'
import * as ui from './ui.js'

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawBackground() {
  //CHANGE THE BACKGROUND TEXTURE HERE
  const pattern = ctx.createPattern(assets.tex_minecraft_Planks, "repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

var gameOver = false;
var paused = false;

const player_size = 96;
export var player = {
  x: 0,
  y: 0,
  width: player_size,
  height: player_size,
  speed: 5,
  // base : 68x92
  hitbox_x:56,
  hitbox_y:86,
  direction: "front",
  // This variable will be used when the player shoots, it modifies the animation for now
  attack: "False",
  hit: "False",
  hp: 10,
  isDead: false,
  draw: function() {
        if (this.direction == "left"){
          if (this.attack == "True"){
            ctx.drawImage(assets.tex_playerImg_left2, this.x, this.y, this.width, this.height);
          }
          else{
            ctx.drawImage(assets.tex_playerImg_left1, this.x, this.y, this.width, this.height);
          }
        }
        if (this.direction == "right"){
          if (this.attack == "True"){
            ctx.drawImage(assets.tex_playerImg_right2, this.x, this.y, this.width, this.height);
          }
          else{
            ctx.drawImage(assets.tex_playerImg_right1, this.x, this.y, this.width, this.height);
          }
        }
        if (this.direction == "front"){
          if (this.attack == "True"){
            ctx.drawImage(assets.tex_playerImg_front2, this.x, this.y, this.width, this.height);
          }
          else{
            ctx.drawImage(assets.tex_playerImg_front1, this.x, this.y, this.width, this.height);
          }
        }
        if (this.direction == "back"){
          if (this.attack == "True"){
            ctx.drawImage(assets.tex_playerImg_back2, this.x, this.y, this.width, this.height);
          }
          else{
            ctx.drawImage(assets.tex_playerImg_back1, this.x, this.y, this.width, this.height);
          }
        }
  }
};

const boss_size = 192;
export var boss = {
  x: (window.innerWidth - boss_size) / 2,
  y: (window.innerHeight - boss_size) / 2,
  width: boss_size,
  height: boss_size,
  bullets: [],
  direction: "front",
  attack: "False",
  shootCooldown: 0,
  draw: function () {
    ctx.drawImage(assets.tex_babyplum_front1, this.x, this.y, this.width, this.height);
  },
  shoot: function (targetX, targetY) {
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    const angle = Math.atan2(targetY - centerY, targetX - centerX);
    var speed = 6;

    this.bullets.push({
      x: centerX,
      y: centerY,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      width: 48,
      height: 48,
    });
  },

  updateBullets: function() {
    for (var i = this.bullets.length - 1; i >= 0; i--) {
      var bullet = this.bullets[i];

      bullet.x += bullet.dx;
      bullet.y += bullet.dy;

      if (
        bullet.x < 0 ||
        bullet.x > canvas.width ||
        bullet.y < 0 ||
        bullet.y > canvas.height
      ) {
        this.bullets.splice(i, 1);
      }
    }
  },
  
  drawBullets: function() {
    this.bullets.forEach(bullet => {
      ctx.drawImage(assets.tex_tearBalloonBrimstone, bullet.x, bullet.y, bullet.width, bullet.height);
    });
  }
}

var keys = {};
document.addEventListener('keydown', function(e) {
  keys[e.key] = true;
});
document.addEventListener('keyup', function(e) {
  keys[e.key] = false;
});

export function update() {
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
  //Need to add player attack keys here, should be arrows or IJKL
  if (boss.shootCooldown <= 0) {
    const spreadX = (Math.random() - 0.5) * 275;
    const spreadY = (Math.random() - 0.5) * 275;
    //boss.shoot(player.x + player.width + Math.random (7,15) / 2, player.y + player.height + Math.random(7,15)/ 2); 
    boss.shoot(player.x + spreadX + Math.random(5,15), player.y + spreadY + Math.random(5,15)); 
    boss.shootCooldown = 14; 
  } else {
      boss.shootCooldown--;
  }
  boss.updateBullets();

  //Checks if the players is dead
  if (player.hp == 0){
    player.gameOver = 1;
  }

  //Pause function
  if (keys['Escape']) {
    if (paused == 1){
      paused = 0;
    }
    else{
      paused = 1;
    }
  }
}

export function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  if (player.gameOver == 1) {
    console.log("game over !");
  }
  else {
    update();
    console.log("update success");
    boss.draw();
    console.log("boss draw success");
    boss.drawBullets();
    console.log("bullet draw success");
    player.draw();
    console.log("player draw success");
    boss.updateBullets(); 
    console.log("update bullets success");
    ui.drawHearts(ctx, player);
    console.log("draw hearts success");
    ui.drawEmptyHearts(ctx, player);
    console.log("draw empty hearts success");
    physics.checkCollisions();
    console.log("collisions check success")
    requestAnimationFrame(gameLoop);
  }
}

var loaded = 0;
[
  assets.tex_minecraft_Planks,
  assets.tex_playerImg_front1,
  assets.tex_playerImg_left1,
  assets.tex_playerImg_right1,
  assets.tex_playerImg_back1,
  assets.tex_playerImg_front2,
  assets.tex_playerImg_left2,
  assets.tex_playerImg_right2,
  assets.tex_playerImg_back2,
  assets.tex_babyplum_front1,
  assets.tex_tearBalloonBrimstone,
  assets.tex_heartFull,
  assets.tex_heartHalf,
  assets.tex_heartEmpty,
].forEach(img => {
  img.onload = () => {
    loaded++;
    //Checks if all required images could be loaded, if not, the canvas is white
    if (loaded == 14) {
      ui.initUI(player);
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      gameLoop();
    }
  };
});
