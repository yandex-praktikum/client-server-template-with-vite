export const INTERVAL = 20;
export const CANVAS_WIDTH = 1200;
export const CANVAS_HEIGHT = 750;

// bird
export const BIRD = new Image();
BIRD.src = "../../../public/redbird-downflap.png";
export const BIRD_HEIGHT = 50;
export const BIRD_WIDTH = 50;

// ground
export const GROUND = new Image();
GROUND.src = "../../../public/base.png";
export const GROUND_HEIGHT = 59;
export const GROUND_WIDTH = CANVAS_WIDTH;
export const GROUND_Y = CANVAS_HEIGHT - GROUND_HEIGHT;
export const HEIGHT_GROUND = 59;

// pipes
export const PIPE = new Image();
PIPE.src = "../../../public/pipe-green.png";
export const PIPEROTATE = new Image();
PIPEROTATE.src = "../../../public/pipe-green-rotate.png";
export const PIPE_WIDTH = 40;
export const PIPE_HEIGHT = CANVAS_HEIGHT / 2;
export const PIPE_GAP = CANVAS_HEIGHT / 2 - HEIGHT_GROUND - 170;

// clouds
export const CLOUDS = new Image();
CLOUDS.src = "../../../public/clouds.png";
export const CLOUDS_HEIGHT = 280;
export const CLOUDS_WIDTH = 300;
export const CLOUDS_X = 50;
export const CLOUDS_Y = 100;

export const CLOUDSROTATE = new Image();
CLOUDSROTATE.src = "../../../public/cloudsRotate.png";
export const CLOUDS_XROTATE = 400;
export const CLOUDS_YROTATE = 10;

export const CLOUDSTHIRD = new Image();
CLOUDSTHIRD.src = "../../../public/clouds.png";
export const CLOUDS_XTHIRD = 850;
export const CLOUDS_YTHIRD = 100;

// movements
export const JUMP_SPEED = -200;
export const FALL_SPEED = -800;
export const SPEED = 1;
