export const tex_mainPlayer = new Image();

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
];

export let charSel = 0;

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


//UI elements for the character selector

export const tex_charactermenu = new Image();
tex_charactermenu.src = "../assets/textures/ui/menu/characterSelectScreen/charactermenu.png"

export const tex_baby_select = new Image();
tex_baby_select.src = "../assets/textures/ui/menu/characterSelectScreen/baby_select.png"

export const thumbPosBabySelect = {
    0: [],
}


//Background
export const tex_minecraft_Planks = new Image();
tex_minecraft_Planks.src = "../assets/textures/background/wood.png"

export const tex_02_lcellarfloor = new Image();
tex_02_lcellarfloor.src = "../assets/textures/background/02_lcellarfloor.png"

//sprites

//sprite sheet player
export const tex_302_baby_cheese = new Image();
tex_302_baby_cheese.src = "../assets/textures/sprites/characters/302_baby_cheese.png"

// export const tex_playerImg_front1 = new Image();
// tex_playerImg_front1.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_front1.png";

// export const tex_playerImg_left1 = new Image();
// tex_playerImg_left1.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_left1.png";

// export const tex_playerImg_right1 = new Image();
// tex_playerImg_right1.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_right1.png";

// export const tex_playerImg_back1 = new Image();
// tex_playerImg_back1.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_back1.png";

// export const tex_playerImg_front2 = new Image();
// tex_playerImg_front2.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_front2.png";

// export const tex_playerImg_left2 = new Image();
// tex_playerImg_left2.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_left2.png";

// export const tex_playerImg_right2 = new Image();
// tex_playerImg_right2.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_right2.png";

// export const tex_playerImg_back2 = new Image();
// tex_playerImg_back2.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_back2.png";

//Boss
export const tex_babyplum = new Image();
tex_babyplum.src = "../assets/textures/sprites/bosses/babyplum/babyplum.png"

// export const tex_babyplum_front1 = new Image();
// tex_babyplum_front1.src = "../assets/textures/sprites/bosses/babyplum/babyplum_front1.png"

//effects
export const tex_tearBalloonBrimstone = new Image();
tex_tearBalloonBrimstone.src = "../assets/textures/effects/tears/tears_balloon_brimstone/tears_balloon_brimstone_8.png"

//UI
//Normal Heart
export const tex_heartFull = new Image();
tex_heartFull.src = "../assets/textures/ui/container_heart/heart_full.png"

export const tex_heartHalf = new Image();
tex_heartHalf.src = "../assets/textures/ui/container_heart/heart_half.png"

//Soul Heart
export const tex_heart_soul_Full = new Image();
tex_heart_soul_Full.src = "../assets/textures/ui/container_heart/heart_soul_full.png"

export const tex_heart_soul_Half = new Image();
tex_heart_soul_Half.src = "../assets/textures/ui/container_heart/heart_soul_half.png"

//Black Heart
export const tex_heart_black_Full = new Image();
tex_heart_black_Full.src = "../assets/textures/ui/container_heart/heart_black_full.png"

export const tex_heart_black_Half = new Image();
tex_heart_black_Half.src = "../assets/textures/ui/container_heart/heart_black_half.png"

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

