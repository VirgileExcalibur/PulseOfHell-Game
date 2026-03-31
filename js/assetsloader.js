import * as tunables from './tunables.js';

//choses which heart to load

export const tex_mainPlayer = new Image();
export const tex_heartFull = new Image();
export const tex_heartHalf = new Image();

const characterSprites = [
  "../assets/textures/sprites/characters/302_baby_cheese.png",
  "../assets/textures/sprites/characters/013_baby_shadow.png",
  "../assets/textures/sprites/characters/042_baby_colorful.png",
  "../assets/textures/sprites/characters/051_baby_belial.png",
  "../assets/textures/sprites/characters/076_baby_video.png",
  "../assets/textures/sprites/characters/104_baby_dumb.png",
  "../assets/textures/sprites/characters/432_baby_dragon.png",
  "../assets/textures/sprites/characters/457_baby_pumpkin_guy.png",
  "../assets/textures/sprites/characters/467_baby_burning.png",
  "../assets/textures/sprites/characters/484_baby_bulb.png",
  "../assets/textures/sprites/characters/179_baby_piecea.png",
  "../assets/textures/sprites/characters/180_baby_pieceb.png",
  "../assets/textures/sprites/characters/312_baby_sword.png",
  "../assets/textures/sprites/characters/369_baby_scaredghost.png",
];

export let charSel = 7;

function updateMainPlayerTexture() {
  tex_mainPlayer.src = characterSprites[charSel];
}

export function characterSelectTexLoader() {
  updateMainPlayerTexture();
}

export function setCharSel(index) {
  const len = characterSprites.length;
  charSel = ((index % len) + len) % len;
  updateMainPlayerTexture();
}

export function cycleCharSel(delta) {
  setCharSel(charSel + delta);
}

updateMainPlayerTexture();


//UI
export const tex_logo = new Image();
tex_logo.src = "../assets/textures/ui/logo.png"

export const tex_logo50 = new Image();
tex_logo50.src = "../assets/textures/ui/logo_50.png"

//Heart selection
if (tunables.whichTex == 0){
  tex_heartFull.src = "../assets/textures/ui/container_heart/heart_full.png"
  tex_heartHalf.src = "../assets/textures/ui/container_heart/heart_half.png"
}

if (tunables.whichTex == 1){
  tex_heartFull.src = "../assets/textures/ui/container_heart/heart_soul_full.png"
  tex_heartHalf.src = "../assets/textures/ui/container_heart/heart_soul_half.png"
}

if (tunables.whichTex == 2){
  tex_heartFull.src = "../assets/textures/ui/container_heart/heart_black_full.png"
  tex_heartHalf.src = "../assets/textures/ui/container_heart/heart_black_half.png"
}

//UI elements for the main menu
export const tex_charactermenu = new Image();
tex_charactermenu.src = "../assets/textures/ui/menu/characterSelectScreen/charactermenu.png"

// export const tex_baby_select = new Image();
// tex_baby_select.src = "../assets/textures/ui/menu/characterSelectScreen/baby_select.png"

// UNUSED, couldn't be seen with the current background choice
export const tex_joke = new Image();
tex_joke.src = "../assets/textures/ui/menu/joke.png"


//Background
export const tex_tile_floor = new Image();
tex_tile_floor.src = "../assets/textures/background/tile_floor.png"

export const tex_minecraft_Planks = new Image();
tex_minecraft_Planks.src = "../assets/textures/background/wood.png"

export const tex_02_lcellarfloor = new Image();
tex_02_lcellarfloor.src = "../assets/textures/background/02_lcellarfloor.png"

export const tex_0b_shop_nfloor = new Image();
tex_0b_shop_nfloor.src = "../assets/textures/background/0b_shop_nfloor.png"

export const tex_effect_darkroom = new Image();
tex_effect_darkroom.src = "../assets/textures/background/effect_darkroom.png"


//sprite sheet player
export const tex_302_baby_cheese = new Image();
tex_302_baby_cheese.src = "../assets/textures/sprites/characters/302_baby_cheese.png"

//Boss
export const tex_babyplum = new Image();
tex_babyplum.src = "../assets/textures/sprites/bosses/babyplum/babyplum.png"

//effects
export const tex_tear = new Image();
tex_tear.src = "../assets/textures/effects/tears/tears_balloon_brimstone.png"

export const tex_tearBalloonBrimstone_8 = new Image();
tex_tearBalloonBrimstone_8.src = "../assets/textures/effects/tears/tears_balloon_brimstone/tears_balloon_brimstone_8.png"

export const tex_heartEmpty = new Image();
tex_heartEmpty.src = "../assets/textures/ui/container_heart/heart_empty.png"

//Menus
export const tex_menuoverlay = new Image();
tex_menuoverlay.src = "../assets/textures/ui/menu/menuoverlay.png"

export const tex_seedpaper = new Image();
tex_seedpaper.src = "../assets/textures/ui/menu/seedpaper.png"

// Replace all those separate player textures with this:
export const tex_babyCheeseSheet = new Image();
tex_babyCheeseSheet.src = "../assets/textures/sprites/characters/baby_cheese/302_baby_cheese.png";
