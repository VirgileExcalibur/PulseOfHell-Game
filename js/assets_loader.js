//Functions
export function drawImagePart(ctx, image, sx, sy, sw, sh, dx, dy, width, height) {
  ctx.drawImage(image, sx, sy, sw, sh, dx, dy, width, height); // sx, sy (starting point) ; sw, sh (size of the part we need) ; dx, dy (destination pos)
}

//Background
export const tex_minecraft_Planks = new Image();
tex_minecraft_Planks.src = "../assets/textures/background/wood.png"

//sprites

//sprite sheet player
export const tex_302_baby_cheese = new Image();
tex_302_baby_cheese.src = "../assets/textures/sprites/characters/baby_cheese/302_baby_cheese.png"

export const tex_playerImg_front1 = new Image();
tex_playerImg_front1.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_front1.png";

export const tex_playerImg_left1 = new Image();
tex_playerImg_left1.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_left1.png";

export const tex_playerImg_right1 = new Image();
tex_playerImg_right1.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_right1.png";

export const tex_playerImg_back1 = new Image();
tex_playerImg_back1.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_back1.png";

export const tex_playerImg_front2 = new Image();
tex_playerImg_front2.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_front2.png";

export const tex_playerImg_left2 = new Image();
tex_playerImg_left2.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_left2.png";

export const tex_playerImg_right2 = new Image();
tex_playerImg_right2.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_right2.png";

export const tex_playerImg_back2 = new Image();
tex_playerImg_back2.src = "../assets/textures/sprites/characters/baby_cheese/baby_cheese_back2.png";

//Boss
export const tex_babyplum_front1 = new Image();
tex_babyplum_front1.src = "../assets/textures/sprites/bosses/babyplum/babyplum_front1.png"

//effects
export const tex_tearBalloonBrimstone = new Image();
tex_tearBalloonBrimstone.src = "../assets/textures/effects/tears/tears_balloon_brimstone/tears_balloon_brimstone_8.png"

//UI
//Normal Heart
export const tex_heartFull = new Image();
tex_heartFull.src = "../assets/textures/UI/container_heart/heart_full.png"

export const tex_heartHalf = new Image();
tex_heartHalf.src = "../assets/textures/UI/container_heart/heart_half.png"

//Soul Heart
export const tex_heart_soul_Full = new Image();
tex_heart_soul_Full.src = "../assets/textures/UI/container_heart/heart_soul_full.png"

export const tex_heart_soul_Half = new Image();
tex_heart_soul_Half.src = "../assets/textures/UI/container_heart/heart_soul_half.png"

//Black Heart
export const tex_heart_black_Full = new Image();
tex_heart_black_Full.src = "../assets/textures/UI/container_heart/heart_black_full.png"

export const tex_heart_black_Half = new Image();
tex_heart_black_Half.src = "../assets/textures/UI/container_heart/heart_black_half.png"

export const tex_heartEmpty = new Image();
tex_heartEmpty.src = "../assets/textures/UI/container_heart/heart_empty.png"

//Menus
export const tex_menuoverlay = new Image();
tex_menuoverlay.src = "../assets/textures/UI/menu/menuoverlay.png"

export const tex_seedpaper = new Image();
tex_seedpaper.src = "../assets/textures/UI/menu/seedpaper.png"

// Replace all those separate player textures with this:
export const tex_babyCheeseSheet = new Image();
tex_babyCheeseSheet.src = "../assets/textures/sprites/characters/baby_cheese/302_baby_cheese.png";

