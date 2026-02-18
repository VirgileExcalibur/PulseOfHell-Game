import { boss, player } from './game.js';

export function checkCollisions() {
  boss.bullets.forEach((bullet, index) => {
    //Player hitbox
    const pLeft = player.x;
    const pRight = player.x + player.hitbox_x;
    const pTop = player.y;
    const pBottom = player.y + player.hitbox_y;
    //Bullet hitbox
    const bLeft = bullet.x;
    const bRight = bullet.x + bullet.width;
    const bTop = bullet.y;
    const bBottom = bullet.y + bullet.height;
    //Has collided ?
    const isColliding = pLeft < bRight && pRight > bLeft && pTop < bBottom && pBottom > bTop;

    if (isColliding) {
      boss.bullets.splice(index, 1);
      player.hp -= 1;
      if (player.hp <= 0) {
        player.isDead = true;
      }
    }
  });
}