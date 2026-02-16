const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "../assets/textures/background/tile_floor.png";

const water_dank = new Image();
water_dank.src = "../assets/textures/background/water_dank.png"

var playerImg_front1 = new Image();
playerImg_front1.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_front1.png";

var playerImg_left1 = new Image();
playerImg_left1.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_left1.png";

var playerImg_right1 = new Image();
playerImg_right1.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_right1.png";

var playerImg_back1 = new Image();
playerImg_back1.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_back1.png";

var playerImg_front2 = new Image();
playerImg_front2.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_front2.png";

var playerImg_left2 = new Image();
playerImg_left2.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_left2.png";

var playerImg_right2 = new Image();
playerImg_right2.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_right2.png";

var playerImg_back2 = new Image();
playerImg_back2.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_back2.png";

var angelstatue = new Image();
angelstatue.src = "../assets/textures/sprites/angelstatue.png"

var babyplum_front1 = new Image();
babyplum_front1.src = "../assets/textures/sprites/bosses/babyplum/babyplum_front1.png"

var tearBalloonBrimstone = new Image();
tearBalloonBrimstone.src = "../assets/textures/effects/tears/tears_balloon_brimstone/tears_balloon_brimstone_8.png"

tearBalloonBrimstone.onload = () => {
  console.log("image balle chargée");
};

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // boss.x = canvas.width / 2;
  // boss.y = canvas.height / 2;
}

function empty() {
  a = 1;
}
function drawBackground() {
  const pattern = ctx.createPattern(water_dank, "repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

let gameOver = false;

var player_size = 96;
var player = {
  x: 0,
  y: 0,
  width: player_size,
  height: player_size,
  speed: 6,
  hitbox: 64,
  direction: "front",
  // This variable will be used when the player shoots, it modifies the animation for now
  attack: "False",
  hit: "False",
  hp: 5,
  isDead: false,
  draw: function() {
        if (this.direction == "left"){
          if (this.attack == "True"){
            ctx.drawImage(playerImg_left2, this.x, this.y, this.width, this.height);
          }
          else{
            ctx.drawImage(playerImg_left1, this.x, this.y, this.width, this.height);
          }
        }
        if (this.direction == "right"){
          if (this.attack == "True"){
            ctx.drawImage(playerImg_right2, this.x, this.y, this.width, this.height);
          }
          else{
            ctx.drawImage(playerImg_right1, this.x, this.y, this.width, this.height);
          }
        }
        if (this.direction == "front"){
          if (this.attack == "True"){
            ctx.drawImage(playerImg_front2, this.x, this.y, this.width, this.height);
          }
          else{
            ctx.drawImage(playerImg_front1, this.x, this.y, this.width, this.height);
          }
        }
        if (this.direction == "back"){
          if (this.attack == "True"){
            ctx.drawImage(playerImg_back2, this.x, this.y, this.width, this.height);
          }
          else{
            ctx.drawImage(playerImg_back1, this.x, this.y, this.width, this.height);
          }
        }
  }
};

var boss_size = 192;
var boss = {
  x: (window.innerWidth - boss_size) / 2,
  y: (window.innerHeight - boss_size) / 2,
  width: boss_size,
  height: boss_size,
  bullets: [],
  direction: "front",
  attack: "False",
  shootCooldown: 0,
  draw: function () {
    ctx.drawImage(babyplum_front1, this.x, this.y, this.width, this.height);
  },
  shoot: function (targetX, targetY) {
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    const angle = Math.atan2(targetY - centerY, targetX - centerX);

    const speed = 6;

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
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      let bullet = this.bullets[i];

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
      ctx.drawImage(tearBalloonBrimstone, bullet.x, bullet.y, bullet.width, bullet.height);
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

function checkCollisions() {
  boss.bullets.forEach((bullet, index) => {
    
    const pLeft = player.x;
    const pRight = player.x + player.hitbox;
    const pTop = player.y;
    const pBottom = player.y + player.hitbox;

    const bLeft = bullet.x;
    const bRight = bullet.x + bullet.width;
    const bTop = bullet.y;
    const bBottom = bullet.y + bullet.height;

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

function update() {
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
  if (player.hp == 0){
    console.log("game over !")
  }
}


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  update();
  boss.draw();
  boss.drawBullets();
  player.draw();
  boss.updateBullets(); 
  checkCollisions();
  requestAnimationFrame(gameLoop);
}


let loaded = 0;
[water_dank, playerImg_front1].forEach(img => {
  img.onload = () => {
    loaded++;
    if (loaded === 2) {
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      gameLoop();
    }
  };
});
