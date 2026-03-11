//loads other files
import * as assets from './assets_loader.js';
import * as physics from './physics.js'
import * as ui from './ui.js'

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//fps limit
let fps = 75;
let fpsInterval = 1000 / fps;
let then = Date.now();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let gameID = getRandomInt(2147483647);
console.log("Game ID is : ", gameID); //Will be used for the leaderboard table in the db

const bottomBarSize = 5;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  //Leaves a bit of space at the bottom for the score, boss hp bar
  canvas.height = window.innerHeight - (window.innerHeight / 100 * bottomBarSize);
}

function drawBackground() {
  //CHANGE THE BACKGROUND TEXTURE HERE, WILL BE CHANGED LATER
  const pattern = ctx.createPattern(assets.tex_minecraft_Planks, "repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

var gameOver = false; //UNUSED
var stopped = false;

const player_size = 96;
export var player = {
  x: 50,
  y: 50,
  width: player_size,
  height: player_size,
  speed: 7,
  // base : 68x92, needs to be adjusted, it seems to big
  hitbox_x:40, //56
  hitbox_y:70, //86
  direction: "front",
  // This variable will be used when the player shoots, it modifies the animation for now
  attack: "False",
  hit: "False",
  hp: 10, //1 equals half a heart
  isDead: false,
  draw: function() {
        if (this.direction == "left"){
          if (this.attack == "True"){
            assets.drawImagePart(ctx, assets.tex_302_baby_cheese, 896, 0, 128, 128, this.x, this.y, this.width, this.height);
          }
          else{
            assets.drawImagePart(ctx, assets.tex_302_baby_cheese, 768, 0, 128, 128, this.x, this.y, this.width, this.height);
          }
        }
        if (this.direction == "right"){
          if (this.attack == "True"){
            assets.drawImagePart(ctx, assets.tex_302_baby_cheese, 384, 0, 128, 128, this.x, this.y, this.width, this.height);
          }
          else{
            assets.drawImagePart(ctx, assets.tex_302_baby_cheese, 256, 0, 128, 128, this.x, this.y, this.width, this.height);
          }
        }
        if (this.direction == "front"){
          if (this.attack == "True"){
            assets.drawImagePart(ctx, assets.tex_302_baby_cheese, 128, 0, 128, 128, this.x, this.y, this.width, this.height);
          }
          else{
            assets.drawImagePart(ctx, assets.tex_302_baby_cheese, 0, 0, 128, 128, this.x, this.y, this.width, this.height);
          }
        }
        if (this.direction == "back"){
          if (this.attack == "True"){
            assets.drawImagePart(ctx, assets.tex_302_baby_cheese, 640, 0, 128, 128, this.x, this.y, this.width, this.height);
          }
          else{
            assets.drawImagePart(ctx, assets.tex_302_baby_cheese, 512, 0, 128, 128, this.x, this.y, this.width, this.height);
          }
        }
  }
};

//The bullet starting point needs to be changed, it isn't centered on the boss position.
const boss_size = 192;
export var boss = {
  x: (window.innerWidth - boss_size) / 2,
  y: (window.innerHeight - (window.innerHeight / 100 * bottomBarSize) - boss_size) / 2,
  width: boss_size,
  height: boss_size,
  hp : 50,
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
      width: 48,
      height: 48,
      x: centerX - 24,
      y: centerY - 24,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
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
  if (e.key === 'Escape') {
    stopped = !stopped;
  }
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

}

export function gameLoop() {
  requestAnimationFrame(gameLoop);
  // fps limit
  // calculate time elapsed since last frame
  let now = Date.now();
  let elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
  drawBackground();
  //Game Over
  if (player.gameOver == 1) {
    boss.draw();
    boss.drawBullets();
    player.draw();
    ui.drawHearts(ctx, player);
    ui.drawEmptyHearts(ctx, player);
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.drawImage(assets.menuoverlay, 0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.font = "32px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over !", canvas.width / 2, canvas.height / 2);
  }
  //Pause
  else if (stopped) {
    boss.draw();
    boss.drawBullets();
    player.draw();
    ui.drawHearts(ctx, player);
    ui.drawEmptyHearts(ctx, player);
    // ui.drawBossHPBar(ctx, player);
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.drawImage(assets.tex_menuoverlay, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(assets.tex_seedpaper, canvas.width / 2 - 455 / 2, canvas.height / 2 - 315 / 2, 455, 315);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.font = "32px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Paused", canvas.width / 2, canvas.height / 2);
    
  }
  else {
    update();
    boss.draw();
    boss.drawBullets();
    player.draw();
    boss.updateBullets(); 
    ui.drawHearts(ctx, player);
    ui.drawEmptyHearts(ctx, player);
    // ui.drawBossHPBar(ctx, player);
    physics.checkCollisions();
  }
  // DEBUG
  // else {
  //   update();
  //   console.log("update success");
  //   boss.draw();
  //   console.log("boss draw success");
  //   boss.drawBullets();
  //   console.log("bullet draw success");
  //   player.draw();
  //   console.log("player draw success");
  //   boss.updateBullets(); 
  //   console.log("update bullets success");
  //   ui.drawHearts(ctx, player);
  //   console.log("draw hearts success");
  //   ui.drawEmptyHearts(ctx, player);
  //   console.log("draw empty hearts success");
  //   physics.checkCollisions();
  //   console.log("collisions check success")
  //   requestAnimationFrame(gameLoop);
  // }
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
  assets.tex_302_baby_cheese,
  assets.tex_babyplum_front1,
  assets.tex_tearBalloonBrimstone,
  assets.tex_heartFull,
  assets.tex_heartHalf,
  assets.tex_heartEmpty,
  assets.tex_menuoverlay,
  assets.tex_seedpaper,
].forEach(img => {
  img.onload = () => {
    loaded++;
    //Checks if all required images could be loaded, if not, the canvas is white
    if (loaded == 17) {
      ui.initUI(player); //This needed or the empty heart containers don't work
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas); //Needed if the window gets resized
      gameLoop();
    };
    // else{
    //   console.log("COULD NOT LOAD ALL TEXTURES!!!");
    //   const texError = document.querySelector("h1");
    //   texError.textContent = "COULD NOT LOAD ALL TEXTURES!!!"
    //   document.createElement(texError);
    // }
  };
});
