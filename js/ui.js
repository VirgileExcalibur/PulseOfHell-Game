import * as assets from './assets_loader.js';
import * as tunables from './tunables.js';
import * as entities from './entities.js'

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


// Had to use this because I made an infinite import loop, ui.js importing game.js and game.js improting ui.js.....

const pxHeartSize = 48; //Unused for the moment
var playerHpBackup;

export function initUI(player) {
  playerHpBackup = player.hp;
}

// //Colors need to be adjusted
// export function drawBossHPBar(ctx, player){
//       ctx.fillStyle = "rgb(255, 255, 255)";
//       ctx.fillRect(10, 50, 100 + (player.hp) * 50, 30);
// }

export function characterSelectScreen() {
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  //Testing image automatic scaling
  const logoBaseW = 786;
  const logoBaseH = 55;
  const menuScale = Math.min(canvas.width / logoBaseW, canvas.height / logoBaseH);
  var displayMiddleW = display.width / 2;
  var displayMiddleH = display.height / 2;
  ctx.drawImage(assets.tex_logo, canvas.width / 2 - 786 / 2, canvas.height / 2 - 55 / 2 - 400, 786, 55);
  //ctx.drawImage(assets.tex_charactermenu, canvas.width / 2 - 455 / 2, canvas.height / 2 - 315 / 2, 455, 315);
  ctx.drawImage(assets.tex_charactermenu, 384, 30, 660, 753, canvas.width / 2 - 660 / 2, canvas.height / 2 - 753 / 2, 660, 753);
  ctx.drawImage(assets.tex_mainPlayer, 0, 0, 128, 128, canvas.width / 2 - 128 / 2, canvas.height / 2 - 128 / 2, 128, 128);
  ctx.fillStyle = "#000000";
  ctx.font = "32px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Press enter to play.", canvas.width / 2, canvas.height / 2 + 250)
  ctx.drawImage(assets.tex_joke, canvas.width / 2 - 223 / 2 + 225, canvas.height / 2 - 119 / 2 - 325, 223, 119);
}

export function pauseMenuScreen(){
  entities.boss.draw();
  entities.boss.drawBullets();
  entities.player.draw();
  drawHearts(ctx, entities.player);
  drawEmptyHearts(ctx, entities.player);
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
  ctx.fillText("Press ESC to continue.", canvas.width / 2, canvas.height / 2 + 50)
}

export function gameOverScreen(){
  entities.boss.draw();
  entities.boss.drawBullets();
  entities.player.draw();
  drawHearts(ctx, entities.player);
  drawEmptyHearts(ctx, entities.player);
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.drawImage(assets.tex_menuoverlay, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(assets.tex_seedpaper, canvas.width / 2 - 455 / 2, canvas.height / 2 - 315 / 2, 455, 315);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.font = "32px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Game Over !", canvas.width / 2, canvas.height / 2);
  ctx.fillText("Press Enter to play again.", canvas.width / 2, canvas.height / 2 + 50)
}
//Will be used to make the bar white for a split second or more when the boss takes a hit
export function animBossHPBar(ctx, boss){};

export function drawHearts(ctx, player){
  if (player.hp % 2 == 1){
    var isHalfHeart = 1;
  }
  var tempPlayerHP = ((player.hp - 1) / 2)
  for (var i = 0; i < tempPlayerHP; i++){
    ctx.drawImage(assets.tex_heartFull, 1 + i * 48, 1, 32, 32);
  }
  if (isHalfHeart == 1){
    ctx.drawImage(assets.tex_heartHalf, 1 + tempPlayerHP * 48, 1, 32, 32);
  }
}

export function drawEmptyHearts(ctx, player){
  var isHalfHeart = 0;
  var nbEmpty = playerHpBackup - player.hp;
  
  if (player.hp % 2 == 1){
    isHalfHeart = 1;
  }

  if (playerHpBackup - player.hp == 0){
    //DEBUG ONLY
    //console.log("No empty containers to draw!");
  }
  if (isHalfHeart != 1){
    for (var i = 0; i < nbEmpty / 2; i++){
      ctx.drawImage(assets.tex_heartEmpty, 48 * (player.hp / 2) + i * 48 , 1, 32, 32);
    }
  }
  if (isHalfHeart == 1){
    var tempPlayerHP = ((player.hp - 1) / 2);
    var emptyCount = (nbEmpty - 1) / 2;
    for (var i = 0; i < emptyCount; i++){
      ctx.drawImage(assets.tex_heartEmpty, (tempPlayerHP + 1 + i) * 48, 1, 32, 32);
    }
  }
}
