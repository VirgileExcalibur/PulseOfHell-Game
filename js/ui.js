import * as assets from './assetsloader.js';
import * as tunables from './tunables.js';
import * as entities from './entities.js';
import * as leaderboard from './leaderboard.js'
import { score } from './game.js';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

var playerHpBackup;

export function initUI(player) {
  playerHpBackup = player.hp;
}

export function characterSelectScreen() {
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.drawImage(assets.tex_menuoverlay, 0, 0, canvas.width, canvas.height); //shouldn't be scaled
  ctx.drawImage(assets.tex_logo, canvas.width / 2 - (768 / (window.devicePixelRatio || 1)) / 2, canvas.height / 2 - (55 / (window.devicePixelRatio || 1)) / 2 - 420 /(window.devicePixelRatio ||1), 786 / (window.devicePixelRatio || 1), 55 / (window.devicePixelRatio || 1));
  //ctx.drawImage(assets.tex_charactermenu, canvas.width / 2 - 455 / 2, canvas.height / 2 - 315 / 2, 455, 315);
  ctx.drawImage(assets.tex_charactermenu, 384, 30, 660, 753, canvas.width / 2 - (660 / (window.devicePixelRatio || 1)) / 2, canvas.height / 2 - (753 / (window.devicePixelRatio || 1)) / 2, 660 / (window.devicePixelRatio || 1), 753 / (window.devicePixelRatio || 1));
  ctx.drawImage(assets.tex_mainPlayer, 0, 0, 128, 128, canvas.width / 2 - (128 / (window.devicePixelRatio || 1)) / 2, canvas.height / 2 - (128 / (window.devicePixelRatio || 1)) / 2, 128 / (window.devicePixelRatio || 1), 128 / (window.devicePixelRatio || 1));
  ctx.fillStyle = "#000000";
  ctx.font = "32px 'Font_soulsV2_Title-Regular'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Press enter to play.", canvas.width / 2, canvas.height / 2 + 250)
  //ctx.drawImage(assets.tex_joke, canvas.width / 2 - (223 / (window.devicePixelRatio || 1)) / 2 - 223 / 2 + (335 / window.devicePixelRatio || 1), canvas.height / 2 - (119 / (window.devicePixelRatio || 1)) / 2 - (325 / (window.devicePixelRatio || 1)), 223 / (window.devicePixelRatio || 1), 119 / (window.devicePixelRatio)); //Needs to be scaled properly, won't be easy...
}

export function pauseMenuScreen(){
  entities.boss.draw();
  entities.boss.drawBullets();
  entities.player.draw();
  drawHearts(ctx, entities.player);
  drawEmptyHearts(ctx, entities.player);
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.drawImage(assets.tex_menuoverlay, 0, 0, canvas.width, canvas.height); //shouldn't be scaled
  ctx.drawImage(assets.tex_seedpaper, canvas.width / 2 - (455 * 1.5 / (window.devicePixelRatio || 1))/ 2, canvas.height / 2 - (315 * 1.5 / (window.devicePixelRatio || 1))/ 2, 455 * 1.5 / (window.devicePixelRatio || 1), 315 * 1.5 / (window.devicePixelRatio || 1));
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "#ffffff";
  ctx.fillStyle = "#000000";
  ctx.font = "32px 'Font_soulsV2_Body-Regular'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Paused", canvas.width / 2, canvas.height / 2);
  ctx.fillText("Press ESC to continue.", canvas.width / 2, canvas.height / 2 + 50);
}

export function gameOverScreen(){
  if (leaderboard.cachedScores == null){
    leaderboard.loadLeaderboardOnce();
    leaderboard.sortLeaderboard();
  }
  entities.boss.draw();
  entities.boss.drawBullets();
  entities.player.draw();
  drawHearts(ctx, entities.player);
  drawEmptyHearts(ctx, entities.player);
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.drawImage(assets.tex_menuoverlay, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(assets.tex_seedpaper, canvas.width / 2 - (455*2 / (window.devicePixelRatio || 1)) / 2, canvas.height / 2 - (315*2 / (window.devicePixelRatio || 1)) / 2, 455 * 2 / (window.devicePixelRatio || 1), 315 * 2 / (window.devicePixelRatio || 1));
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000000";
  ctx.font = "32px 'Font_soulsV2_Body-Regular'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Game Over !", canvas.width / 2 - 100, canvas.height / 2 - 50);
  ctx.fillText("Score : " + score , canvas.width / 2 - 100, canvas.height / 2);
  ctx.fillText("Press Enter to play again.", canvas.width / 2 - 100, canvas.height / 2 + 50);
  if (leaderboard.cachedScores == null){
    ctx.fillText("Loading leaderboard...", canvas.width / 2 + 260, canvas.height / 2 - 120);
  }
  else{
    ctx.textAlign = "left";
    ctx.font = "22px 'Font_soulsV2_Body-Regular'";
    ctx.fillText("Last 10 Scores", canvas.width / 2 + 200, canvas.height / 2 - 150);
    for (let i = 0; i < 10 && i < leaderboard.cachedScores.length; i++){
      ctx.fillText((i + 1) + ". " + leaderboard.cachedScores[i].score, canvas.width / 2 + 200, canvas.height / 2 - 110 + i * 28);
    }
  }
  
}

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
