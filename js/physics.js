import * as entities from './entities.js'

export function checkCollisions() {
  entities.boss.bullets.forEach((bullet, index) => {
    //Player hitbox
    const pLeft = entities.player.x;
    const pRight = entities.player.x + entities.player.hitbox_x;
    const pTop = entities.player.y;
    const pBottom = entities.player.y + entities.player.hitbox_y;
    //Bullet hitbox
    const bLeft = bullet.x;
    const bRight = bullet.x + bullet.width;
    const bTop = bullet.y;
    const bBottom = bullet.y + bullet.height;
    //Has collided ?
    const isColliding = pLeft < bRight && pRight > bLeft && pTop < bBottom && pBottom > bTop;

    if (isColliding) {
      entities.boss.bullets.splice(index, 1);
      entities.player.hp -= 1;
      if (entities.player.hp <= 0) {
        entities.player.isDead = true;
      }
    }
  });
}