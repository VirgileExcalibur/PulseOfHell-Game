import * as assets from './assets_loader.js';

// Had to use this because I made an infinite import loop, ui.js importing game.js and game.js improting ui.js.....
var playerHpBackup;
export function initUI(player) {
  playerHpBackup = player.hp;
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
    console.log("No empty containers to draw!");
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