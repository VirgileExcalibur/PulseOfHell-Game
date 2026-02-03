const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "../assets/textures/background/tile_floor.png";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawBackground();
}

function drawBackground() {
  const pattern = ctx.createPattern(img, "repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

img.onload = () => {
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
};
