import * as assets from './assets_loader.js';
import * as tunables from './tunables.js'
import { canvas, ctx } from './game.js';

const animSpeed = 50;

export const player_size = 96;
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
  anim : 15,
  // This variable will be used when the player shoots, it modifies the animation for now
  attack: false,
  hit: false,
  hp: 10, //1 equals half a heart
  isDead: false,
  draw: function() {
        if (this.direction == "left"){
          if (this.anim > animSpeed / 2){
            ctx.drawImage(assets.tex_mainPlayer, 896, 0, 128, 128, this.x, this.y, this.width, this.height);
          }
          else{
            ctx.drawImage(assets.tex_mainPlayer, 768, 0, 128, 128, this.x, this.y, this.width, this.height);
          }
        }
        if (this.direction == "right"){
          if (this.anim > animSpeed / 2){
            ctx.drawImage(assets.tex_mainPlayer, 384, 0, 128, 128, this.x, this.y, this.width, this.height);
          }
          else{
            ctx.drawImage(assets.tex_mainPlayer, 256, 0, 128, 128, this.x, this.y, this.width, this.height);
          }
        }
        if (this.direction == "front"){
          if (this.anim > animSpeed / 2){
            ctx.drawImage(assets.tex_mainPlayer, 128, 0, 128, 128, this.x, this.y, this.width, this.height);
          }
          else{
            ctx.drawImage(assets.tex_mainPlayer, 0, 0, 128, 128, this.x, this.y, this.width, this.height);
          }
        }
        if (this.direction == "back"){
          if (this.anim > animSpeed / 2){
            ctx.drawImage(assets.tex_mainPlayer, 640, 0, 128, 128, this.x, this.y, this.width, this.height);
          }
          else{
            ctx.drawImage(assets.tex_mainPlayer, 512, 0, 128, 128, this.x, this.y, this.width, this.height);
          }
        }
  }
};


export const boss_size = 192;
export var boss = {
  x: (window.innerWidth - boss_size) / 2,
  y: (window.innerHeight - (window.innerHeight / 100 * tunables.bottomBarSize) - boss_size) / 2,
  width: boss_size,
  height: boss_size,
  hp : 50,
  bullets: [],
  direction: "front",
  attack: false,
  shootCooldown: 0,
  anim: 15,
  draw: function () {
    // if (player.x < this.x && player.y < this.y){
    //   ctx.drawImage
    // }
    if (this.anim > animSpeed / 2){
      ctx.drawImage(assets.tex_babyplum, 192, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    else {
      ctx.drawImage(assets.tex_babyplum, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    
  },
  shoot: function (targetX, targetY) {
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    const angle = Math.atan2(targetY - centerY, targetX - centerX);
    var speed = 8;
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
      if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
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