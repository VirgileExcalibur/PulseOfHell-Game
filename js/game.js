//loads other files
import * as assets from './assetsloader.js';
import * as physics from './physics.js'
import * as ui from './ui.js'
import * as entities from './entities.js'
import * as tunables from './tunables.js'
import * as leaderboard from './leaderboard.js'

export const canvas = document.getElementById("game");
export const ctx = canvas.getContext("2d");
//Required for the textures to be displayed correctly on any display res (not looking blurry when zooming out for exaple)
ctx.imageSmoothingEnabled = false;

//fps limit
let fps = 60;
let fpsInterval = 1000 / fps;
let then = Date.now();

//GLOBAL
let gameLaunched = false; //For now, it just shows you the character menu
let gameOver = false; //UNUSED
let stopped = false;
let sentLeaderboardResult = false;
export let score = 0;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//Used for the DB
let gameID = getRandomInt(2147483647);
console.log("Game ID is : ", gameID);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  //Leaves a bit of space at the bottom for the score, boss hp bar
  canvas.height = window.innerHeight - (window.innerHeight / 100 * tunables.bottomBarSize);
  ctx.fillStyle = "#444444";
  ctx.fillRect(0, (canvas.height / 100) * (100 - tunables.bottomBarSize), canvas.width, canvas.height);
}

function drawBackground() {
  //CHANGE THE BACKGROUND TEXTURE HERE, WILL BE CHANGED LATER
  const pattern = ctx.createPattern(assets.tex_effect_darkroom, "repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

var keys = {};
document.addEventListener('keydown', function(e) {
  keys[e.key] = true;
  if (!gameLaunched) {
    if (e.key === 'ArrowRight'){
      assets.cycleCharSel(1);
    }
    else if (e.key === 'ArrowLeft'){
      assets.cycleCharSel(-1);
    }
    if (e.key === 'Enter'){
      gameLaunched = true;
    }
  }
  if (gameLaunched){
    if (e.key === 'Escape') {
      stopped = !stopped;
    }
  }
  if (gameLaunched && entities.player.isDead){
    if (e.key === 'Enter') {
      this.location.reload()
    }
  }
});

document.addEventListener('keyup', function(e) {
  keys[e.key] = false;
});

//Pause if the user changed tab
document.addEventListener("visibilitychange", (event) => {
  if (document.visibilityState == "visible") {
    // console.log("tab is active"); //DEBUG
  }
  else {
    stopped = true;
    // console.log("tab is inactive"); //DEBUG
  }
});

export function update() {
  if (keys['q'] && entities.player.x > 0) {
    entities.player.x -= entities.player.speed;
    entities.player.direction = "left";
  };
  if (keys['d'] && entities.player.x + entities.player.width < canvas.width) {
    entities.player.x += entities.player.speed;
    entities.player.direction = "right";
  };
  if (keys['z'] && entities.player.y > 0) {
    entities.player.y -= entities.player.speed;
    entities.player.direction = "back";
  };
  if (keys['s'] && entities.player.y + entities.player.height < canvas.height) {
    entities.player.y += entities.player.speed;
    entities.player.direction = "front";
  };
  //Need to add player attack keys here, should be arrows or IJKL
  if (entities.boss.shootCooldown <= 0) {
    const spreadX = (Math.random() - 0.5) * 275;
    const spreadY = (Math.random() - 0.5) * 275;
    //boss.shoot(player.x + player.width + Math.random (7,15) / 2, player.y + player.height + Math.random(7,15)/ 2); 
    entities.boss.shoot(entities.player.x + spreadX + Math.random(5,15), entities.player.y + spreadY + Math.random(5,15)); 
    entities.boss.shootCooldown = 14; 
  }
  else {
      entities.boss.shootCooldown--;
  }
  entities.boss.updateBullets();
  //Animation framing
  if(entities.boss.anim <= 0){
    entities.boss.anim = tunables.animSpeed; //Adjust this variable 
  }
  else {
    entities.boss.anim--;
  }
  if(entities.player.anim <= 0){
    entities.player.anim = tunables.animSpeed;
  }
  else {
    entities.player.anim--;
  }
  //moves the boss to the right place if you change the size of the window
  entities.boss.x = (window.innerWidth - entities.boss_size) / 2;
  entities.boss.y = (window.innerHeight - (window.innerHeight / 100 * tunables.bottomBarSize) - entities.boss_size) / 2;
}

// export function keyboardLayoutTest(){
//   if (navigator.keyboard){
//     const keyboard = navigator.keyboard;
//     console.log(keyboard.getLayoutMap());
//   }
// }

export function gameLoop() {
  // keyboardLayoutTest();
  requestAnimationFrame(gameLoop);
  // fps limit
  // calculate time elapsed since last frame
  let now = Date.now();
  let elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval); 
    drawBackground();
    if (gameLaunched) {
      //Game Over
      if (entities.player.isDead || entities.boss.isDead) {
        if (!sentLeaderboardResult){
          score = leaderboard.calcScore(then);
          fetch(`http://localhost:5000/php/script.php?gameID=${gameID}&score=${score}`);
          console.log("Score : ", score);
          sentLeaderboardResult = true;
        };
        ui.gameOverScreen();
      }
      //Pause
      else if (stopped) {
        ui.pauseMenuScreen();
      }
      else {
        //main loop
        update();
        entities.boss.draw();
        entities.boss.drawBullets();
        entities.player.draw();
        entities.boss.updateBullets(); 
        ui.drawHearts(ctx, entities.player);
        ui.drawEmptyHearts(ctx, entities.player);
        // ui.drawBossHPBar(ctx, player);
        physics.checkCollisions();
      }
    }
    else {
      ui.characterSelectScreen();
    }
  }
}

var loaded = 0;
[
  assets.tex_minecraft_Planks,
  assets.tex_302_baby_cheese,
  assets.tex_mainPlayer,
  assets.tex_babyplum,
  assets.tex_tear,
  assets.tex_heartFull,
  assets.tex_heartHalf,
  assets.tex_heartEmpty,
  assets.tex_menuoverlay,
  assets.tex_seedpaper,
].forEach(img => {
  img.onload = () => {
    loaded++;
    //Checks if all required images could be loaded, if not, the canvas is white
    if (loaded == 10) {
      ui.initUI(entities.player); //This needed or the empty heart containers don't work
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