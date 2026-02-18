import * as assets from './assets_loader.js';
let playerHpBackup;

export function initUI(player) {
  playerHpBackup = player.hp;
}

export function drawHearts(ctx, player){
  if (player.hp % 2 == 1){
    var isHalfHeart = 1;
  }
  var tempPlayerHP = ((player.hp - 1) / 2)
  for (var i = 0; i < tempPlayerHP; i++){
    ctx.drawImage(assets.heartFull, 1 + i * 48, 1, 32, 32);
  }
  if (isHalfHeart == 1){
    ctx.drawImage(assets.heartHalf, 1 + tempPlayerHP * 48, 1, 32, 32);
  }
}

export function drawEmptyHearts(ctx, player){
  var isHalfHeart = 0;
  var nbEmpty = playerHpBackup - player.hp;
  
  if (player.hp % 2 == 1){
    isHalfHeart = 1;
    console.log("Is Half" + isHalfHeart)
  }

  if (playerHpBackup - player.hp == 0){
    console.log("No empty containers to draw!");
  }
  if (isHalfHeart != 1){
    for (var i = 0; i < nbEmpty / 2; i++){
      console.log("draw empty heart " + i)
      ctx.drawImage(assets.heartEmpty, 48 * (player.hp / 2) + i * 48 , 1, 32, 32);
    }
  }
  if (isHalfHeart == 1){
    for (var i = 0; i < nbEmpty - player.hp / 2; i++){
      ctx.drawImage(assets.heartEmpty, 48 * (player.hp - 1 / 2) + i * 48 , 1, 32, 32);
    }
    console.log("Trying to draw empty");
  }
}